import { create } from "zustand";
import { axiosInstance } from "../../../lib/axios";
import type { TAuthState } from "./auth.state";
import toast from "react-hot-toast";
import { showErrorToast } from "../../../middleware/error.middleware";
export const useAuthStore = create<TAuthState>((set) => ({
  authUser: null,
  isSigningUp: false,
  isLoggingIn: false,
  isUpdatingProfile: false,
  isCheckingAuth: true,
  checkAuth: async () => {
    try {
      const res = await axiosInstance.get("/auth/check");
      set({ authUser: res.data });
    } catch (err) {
      set({ authUser: null });
    } finally {
      set({ isCheckingAuth: false });
    }
  },
  register: async (data) => {
    set({ isSigningUp: true });
    try {
      const res = await axiosInstance.post("/auth/register", data);
      set({ authUser: res.data });
      toast.success("Account created successfully");
    } catch (err) {
      showErrorToast(err, "Registration Failed");
    } finally {
      set({ isSigningUp: false });
    }
  },

  login: async (data) => {
    set({ isLoggingIn: true });
    try {
      const res = await axiosInstance.post("/auth/login", data);
      set({ authUser: res.data });
      toast.success("Logged in successfully");
    } catch (err) {
      showErrorToast(err, "Login Failed");
    } finally {
      set({ isLoggingIn: false });
    }
  },

  logout: async () => {
    try {
      await axiosInstance.delete("/auth/logout");
      set({ authUser: null });
      toast.success("Logged out successfully");
    } catch (err) {
      showErrorToast(err, "Logout Failed");
    }
  },
}));
