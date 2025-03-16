import { LoginFormData, User } from "@/types/user-types";

const API_URL = "http://localhost:8081/api/users";

// Create a new user
export const createUser = async (userData: Omit<User, "_id">) => {
  const response = await fetch(`${API_URL}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(userData),
  });
  return response.json();
};

// Login user
export const loginUser = async (formData: LoginFormData) => {
  const response = await fetch(`${API_URL}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(formData),
  });
  return response.json();
};

// Get all users
export const getAllUsers = async (): Promise<User[]> => {
  const response = await fetch(`${API_URL}`, {
    credentials: "include",
  });
  return response.json();
};

// Get a user by ID
export const getUserById = async (userId: string): Promise<User> => {
  const response = await fetch(`${API_URL}/${userId}`, {
    credentials: "include",
  });
  return response.json();
};

// Update a user
export const updateUser = async (userId: string, userData: Partial<User>) => {
  const response = await fetch(`${API_URL}/${userId}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(userData),
  });
  return response.json();
};

// Delete a user
export const deleteUser = async (userId: string) => {
  const response = await fetch(`${API_URL}/${userId}`, {
    method: "DELETE",
    credentials: "include",
  });
  return response.json();
};
