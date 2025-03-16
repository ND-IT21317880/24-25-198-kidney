import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { Card } from "./ui/card";
import { formSchema } from "@/types/types";
import { useNavigate } from "react-router-dom";

const CalculateCkduStage = () => {
  const navigate = useNavigate();
  // Initialize the form
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      age: 0,
      scr: 0,
      eGFR: 0,
    },
  });

  // Handle form submission
  const onSubmit = (values: z.infer<typeof formSchema>) => {
    const { eGFR } = values;

    // Determine the CKDu stage based on eGFR
    if (eGFR >= 90) {
      localStorage.setItem("stage", "Stage 1");
    } else if (eGFR >= 60 && eGFR <= 89) {
      localStorage.setItem("stage", "Stage 2");
    } else if (eGFR >= 45 && eGFR <= 59) {
      localStorage.setItem("stage", "Stage 3a");
    } else if (eGFR >= 30 && eGFR <= 44) {
      localStorage.setItem("stage", "Stage 3b");
    } else if (eGFR >= 15 && eGFR <= 29) {
      localStorage.setItem("stage", "Stage 4");
    } else if (eGFR < 15) {
      localStorage.setItem("stage", "Stage 5");
    }

    navigate("/current-ckdu-page");
  };

  return (
    <div className="w-full h-full p-8 bg-gray-50 flex flex-col items-center justify-center">
      <Card className="w-[50vw] px-16">
        <h1 className="text-3xl font-bold mb-6">Calculate CKDu Stage</h1>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Name Field */}
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Age Field */}
            <FormField
              control={form.control}
              name="age"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Age</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Enter your age"
                      {...field}
                      onChange={(e) => field.onChange(Number(e.target.value))}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Serum Creatinine Field */}
            <FormField
              control={form.control}
              name="scr"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Serum Creatinine (SCR)</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Enter SCR value"
                      {...field}
                      onChange={(e) => field.onChange(Number(e.target.value))}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* eGFR Field */}
            <FormField
              control={form.control}
              name="eGFR"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>eGFR</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Enter eGFR value"
                      {...field}
                      onChange={(e) => field.onChange(Number(e.target.value))}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Submit Button */}
            <Button type="submit">Calculate CKDu Stage</Button>
          </form>
        </Form>
      </Card>
    </div>
  );
};

export default CalculateCkduStage;
