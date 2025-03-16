import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { useState, useEffect } from "react";
import { getUserById, updateUser, deleteUser } from "@/services/userService";
import { useNavigate } from "react-router-dom";
import EgfrForthPage from "./EgfrForthPage";

// Zod schema for form validation
const updateUserSchema = z.object({
  username: z.string().min(1, "Username is required").optional(),
  email: z.string().email("Invalid email address").optional(),
  name: z.string().min(1, "Name is required").optional(),
  age: z.number().min(1, "Age must be at least 1").optional(),
  contactNumber: z.string().min(1, "Contact number is required").optional(),
  gender: z.string().min(1, "Gender is required").optional(),
});

type UpdateUserFormData = z.infer<typeof updateUserSchema>;

const ProfilePage = () => {
  const userId = localStorage.getItem("id");
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<UpdateUserFormData>({
    resolver: zodResolver(updateUserSchema),
  });

  // Fetch user data on component mount
  useEffect(() => {
    const fetchUser = async () => {
      if (userId) {
        try {
          const userData = await getUserById(userId);
          setUser(userData);
          reset(userData); // Populate form with user data
        } catch (error) {
          toast.error("Failed to fetch user data.");
          console.error("Fetch user error:", error);
        }
      }
    };
    fetchUser();
  }, [userId, reset]);

  // Handle form submission for updating user
  const onSubmit = async (data: UpdateUserFormData) => {
    if (!userId) return;
    setIsLoading(true);
    try {
      const updatedUser = await updateUser(userId, data);
      setUser(updatedUser);
      toast.success("Profile updated successfully!");
    } catch (error) {
      toast.error("Failed to update profile.");
      console.error("Update error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle account deletion
  const handleDeleteAccount = async () => {
    if (!userId) return;
    setIsLoading(true);
    try {
      await deleteUser(userId);
      toast.success("Account deleted successfully!");
      localStorage.removeItem("id"); // Clear user ID from localStorage
      navigate("/login"); // Redirect to login page
    } catch (error) {
      toast.error("Failed to delete account.");
      console.error("Delete error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem("id"); // Clear user ID from localStorage
    navigate("/login"); // Redirect to login page
    toast.success("Logged out successfully!");
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-32">
      <Card className="flex-1">
        <CardHeader>
          <CardTitle className="text-center">Profile</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                {...register("username")}
                defaultValue={user.username}
                placeholder="Enter your username"
              />
              {errors.username && (
                <p className="text-sm text-red-500">
                  {errors.username.message}
                </p>
              )}
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                {...register("email")}
                defaultValue={user.email}
                placeholder="Enter your email"
              />
              {errors.email && (
                <p className="text-sm text-red-500">{errors.email.message}</p>
              )}
            </div>
            <div>
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                {...register("name")}
                defaultValue={user.name}
                placeholder="Enter your name"
              />
              {errors.name && (
                <p className="text-sm text-red-500">{errors.name.message}</p>
              )}
            </div>
            <div>
              <Label htmlFor="age">Age</Label>
              <Input
                id="age"
                type="number"
                {...register("age", { valueAsNumber: true })}
                defaultValue={user.age}
                placeholder="Enter your age"
              />
              {errors.age && (
                <p className="text-sm text-red-500">{errors.age.message}</p>
              )}
            </div>
            <div>
              <Label htmlFor="contactNumber">Contact Number</Label>
              <Input
                id="contactNumber"
                {...register("contactNumber")}
                defaultValue={user.contactNumber}
                placeholder="Enter your contact number"
              />
              {errors.contactNumber && (
                <p className="text-sm text-red-500">
                  {errors.contactNumber.message}
                </p>
              )}
            </div>
            <div>
              <Label htmlFor="gender">Gender</Label>
              <Input
                id="gender"
                {...register("gender")}
                defaultValue={user.gender}
                placeholder="Enter your gender"
              />
              {errors.gender && (
                <p className="text-sm text-red-500">{errors.gender.message}</p>
              )}
            </div>
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Updating..." : "Update Profile"}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col space-y-2">
          <Button
            onClick={handleDeleteAccount}
            className="w-full bg-red-500 hover:bg-red-600"
            disabled={isLoading}
          >
            {isLoading ? "Deleting..." : "Delete Account"}
          </Button>
          <Button
            onClick={handleLogout}
            className="w-full bg-gray-500 hover:bg-gray-600"
          >
            Logout
          </Button>
        </CardFooter>
      </Card>
      <EgfrForthPage />
    </div>
  );
};

export default ProfilePage;
