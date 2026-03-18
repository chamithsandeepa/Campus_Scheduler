import { create } from "zustand";
import axios from "axios";

const API_URL =
  import.meta.env.MODE === "development"
    ? "http://localhost:5000/api/auth"
    : "/api/auth";

axios.defaults.withCredentials = true;

export const useAuthStore = create((set) => ({
  user: null,
  isAuthenticated: false,
  error: null,
  isLoading: false,
  isCheckingAuth: true,
  message: null,

  // Sign Up
  signup: async (emailOrPayload, password, name) => {
    set({ isLoading: true, error: null });
    try {
      // Support both (email, password, name) and (payloadObject) signatures
      const payload =
        typeof emailOrPayload === "object"
          ? emailOrPayload
          : { email: emailOrPayload, password, name };

      const response = await axios.post(`${API_URL}/signup`, payload);
      set({ user: response.data.user, isAuthenticated: true, isLoading: false });
      return response.data.user;
    } catch (error) {
      set({ error: error.response?.data?.message || "Error signing up", isLoading: false });
      throw error;
    }
  },

  // Login
  login: async (email, password) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.post(`${API_URL}/login`, { email, password });

      const adminPassword = "Admin123@";
      const lecturerPassword = "Lecturer123@";
      const inferredRole =
        password === adminPassword ? "admin" : password === lecturerPassword ? "lecturer" : "student";

      const user = {
        ...response.data.user,
        role: response.data.user?.role || inferredRole,
      };

      set({ isAuthenticated: true, user, error: null, isLoading: false });
      return user;
    } catch (error) {
      set({ error: error.response?.data?.message || "Error logging in", isLoading: false });
      throw error;
    }
  },

  // Logout
  logout: async () => {
    set({ isLoading: true, error: null });
    try {
      await axios.post(`${API_URL}/logout`);
      set({ user: null, isAuthenticated: false, error: null, isLoading: false });
    } catch (error) {
      set({ error: "Error logging out", isLoading: false });
      throw error;
    }
  },

  // Check Authentication Status
  checkAuth: async () => {
    set({ isCheckingAuth: true, error: null });
    try {
      const response = await axios.get(`${API_URL}/check-auth`);
      set({ user: response.data.user, isAuthenticated: true, isCheckingAuth: false });
    } catch (error) {
      set({ error: null, isCheckingAuth: false, isAuthenticated: false });
    }
  },

  // Update User Profile
  updateUser: async (updatedData) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.put(`${API_URL}/update-profile`, updatedData);
      set({ user: response.data.user, isLoading: false, error: null });
    } catch (error) {
      set({ error: error.response?.data?.message || "Error updating profile", isLoading: false });
      throw error;
    }
  },

  // Delete User Account
  deleteUser: async () => {
    set({ isLoading: true, error: null });
    try {
      await axios.delete(`${API_URL}/delete-profile`);
      set({ user: null, isAuthenticated: false, error: null, isLoading: false });
    } catch (error) {
      set({ error: error.response?.data?.message || "Error deleting profile", isLoading: false });
      throw error;
    }
  },
}));
