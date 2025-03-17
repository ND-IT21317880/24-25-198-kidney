from flask import Flask, request, jsonify
import pickle
from flask_cors import CORS
import pandas as pd
from scipy.stats import mannwhitneyu
from cliffs_delta import cliffs_delta
from scipy.stats import chi2_contingency, kruskal
from scikit_posthocs import posthoc_dunn
import matplotlib.pyplot as plt
import seaborn as sns
import io
import base64

app = Flask(__name__)
CORS(app)

# Load your dataset
df = pd.read_csv('env_models/env_data.csv')

def prediction(features):
    filename = 'env_models/predictor.pickle'
    with open(filename, 'rb') as file:
        model = pickle.load(file)
    pred_value = model.predict([features])
    return pred_value.tolist()

@app.route('/predict', methods=['POST'])
def predict():
    try:
        data = request.json
        features = [
            float(data['temp']), float(data['precip']),
            float(data['Na+']), float(data['Ca2+']),
            float(data['Mg2+']), float(data['F-']),
            float(data['depth']), float(data['alkalinity']),
            float(data['Na_Cl']), float(data['SO42-']),
            float(data['K+']), float(data['PO43-'])
        ]
        
        pred = prediction(features)
        return jsonify({'prediction': pred[0]})
    
    except Exception as e:
        return jsonify({'error': str(e)}), 400

@app.route('/mannwhitneyu', methods=['GET'])
def mann_whitney_u():
    try:
        variables = ['PH', 'EC(ÂµS/cm)', 'Total Alkalinity(mg/l CaCo3)', 'Na+(mg/L)', 'K+(mg/L)', 'Ca2+(mg/L)', 'Mg2+(mg/L)', 'N03- (mg/L)',
                     'F- (mg/L)', 'Cl- (mg/L)', 'SO42- (mg/L)', 'PO43- (mg/L)','Depth Of Water Column(m)', 'Sample Depth(mgl)']
        
        results = {'large': [], 'medium': [], 'small': []}
        
        for var in variables:
            # Check if the column exists in the dataset
            if var not in df.columns:
                print(f"Column '{var}' not found in the dataset.")
                continue
            
            # Drop rows with NaN values for the current variable
            risk_data = df[df['Risk'] == 1][var].dropna()
            non_risk_data = df[df['Risk'] == 0][var].dropna()
            
            # Check if there are enough samples to perform the test
            if len(risk_data) == 0 or len(non_risk_data) == 0:
                print(f"Skipping '{var}' due to insufficient data.")
                continue
            
            # Perform Mann-Whitney U test
            stat, p = mannwhitneyu(risk_data, non_risk_data)
            d, res = cliffs_delta(risk_data, non_risk_data)
            
            result = {
                'variable': var,
                'p_value': f"{p:.4f}",
                'cliffs_delta': d,
                'interpretation': res
            }
            
            # Categorize results by effect size
            if abs(d) >= 0.474:
                results['large'].append(result)
            elif abs(d) >= 0.33:
                results['medium'].append(result)
            else:
                results['small'].append(result)
        
        return jsonify(results)
    
    except Exception as e:
        print(f"Error: {str(e)}")
        return jsonify({'error': str(e)}), 400
    
@app.route('/water_source_analysis', methods=['GET'])
def water_source_analysis():
    try:
        # Calculate Na+/Cl⁻ ratio dynamically
        df['Na_Cl_Ratio'] = df['Na+(mg/L)'] / (df['Cl- (mg/L)'] + 1e-6)  # Avoid division by zero

        # Chi-square Test
        contingency_table = pd.crosstab(df['Type'], df['Risk'])
        chi2, p_chi2, dof, expected = chi2_contingency(contingency_table)
        chi2_results = {
            'chi2_statistic': chi2,
            'p_value': p_chi2,
            'association': "Yes" if p_chi2 < 0.05 else "No"  # Convert boolean to string
        }

        # Kruskal-Wallis and Dunn’s Tests
        key_elements = ['Mg2+(mg/L)', 'Ca2+(mg/L)', 'Na+(mg/L)', 'PH', 'F- (mg/L)', 'Depth Of Water Column(m)', 
                        'Total Alkalinity(mg/l CaCo3)', 'Na_Cl_Ratio', 'N03- (mg/L)', 'SO42- (mg/L)', 
                        'K+(mg/L)', 'PO43- (mg/L)']
        
        results = {}
        plots = {}

        for element in key_elements:
            if element not in df.columns:
                print(f"Column '{element}' not found in the dataset.")
                continue

            # Kruskal-Wallis Test
            groups = [df[df['Type'] == source][element].dropna() for source in df['Type'].unique()]
            if len(groups) >= 2:
                stat, p_kruskal = kruskal(*groups)
                if p_kruskal < 0.05:  # Only proceed if significant
                    # Dunn’s Test
                    dunn_result = posthoc_dunn(df, val_col=element, group_col='Type', p_adjust='bonferroni')
                    
                    # Find significant pairs
                    significant_pairs = []
                    for source1 in dunn_result.index:
                        for source2 in dunn_result.columns:
                            if source1 != source2 and dunn_result.loc[source1, source2] < 0.05:
                                significant_pairs.append(f"{source1} vs {source2}")

                    # Find the source with the highest median value
                    median_values = df.groupby('Type')[element].median()
                    highest_source = median_values.idxmax()

                    # Generate distribution chart
                    plt.figure(figsize=(10, 6))
                    sns.boxplot(data=df, x='Type', y=element, hue='Risk')
                    plt.title(f'Distribution of {element} by Water Source')
                    plt.xticks(rotation=45)
                    plt.xlabel('Water Source')
                    plt.ylabel(element)

                    # Save plot to base64
                    buf = io.BytesIO()
                    plt.savefig(buf, format='png', bbox_inches='tight')
                    buf.seek(0)
                    plots[element] = base64.b64encode(buf.read()).decode('utf-8')
                    plt.close()

                    # Store results
                    results[element] = {
                        'significant_pairs': significant_pairs,
                        'highest_source': highest_source
                    }

        return jsonify({
            'chi2_results': chi2_results,
            'element_results': results,
            'plots': plots
        })
    
    except Exception as e:
        print(f"Error in water source analysis: {str(e)}")
        return jsonify({'error': str(e)}), 400
    

if __name__ == '__main__':
    app.run(debug=True)