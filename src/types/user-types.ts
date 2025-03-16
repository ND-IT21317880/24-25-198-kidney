export interface User {
  _id: string;
  username: string;
  email: string;
  name: string;
  age: number;
  contactNumber: string;
  gender: string;
}

export interface LoginFormData {
  username: string;
  password: string;
}
export interface RegisterFormData {
  username: string;
  email: string;
  password: string;
  name: string;
  age: number;
  contactNumber: string;
  gender: string;
}
export interface UpdateUserFormData {
  username?: string;
  email?: string;
  name?: string;
  age?: number;
  contactNumber?: string;
  gender?: string;
}
