import { create } from "zustand";
import { axiosInstance } from "../../../lib/axios";
import { showErrorToast } from "../../../middleware/error.middleware";
import { type TChatState } from "../chat.state";

export const useChatStore = create<TChatState>((set) => ({
  messages: [],
  users: [],
  selectedUser: [],
  isUsersLoading: false,
  isMessagesLoading: false,

  getUsers: async () => {
    set({ isUsersLoading: true });
    try {
      const res = await axiosInstance.get("/messages/users");
      set({ users: res.data });
    } catch (err) {
      showErrorToast(err, "Something Went Wrong");
    } finally {
      set({ isUsersLoading: false });
    }
  },

  getMessages: async (userId: string) => {
    set({ isMessagesLoading: true });
    try {
      const res = await axiosInstance.get(`/messages/${userId}`);
      set({ messages: res.data });
    } catch (err) {
      showErrorToast(err, "Something Went Wrong");
    } finally {
      set({ isMessagesLoading: false });
    }
  },
}));
