import { apiClient } from "../lib/apiClient";
import type { User } from "../types";

export const authApi = {
  signup: (username: string, password: string) =>
    apiClient.post<{ message: string }>("/signup", { username, password }),

  signin: (username: string, password: string) =>
    apiClient.post<{ message: string }>("/signin", { username, password }),

  logout: () => apiClient.post<{ message: string }>("/logout"),

  me: () => apiClient.get<User>("/me"),
};