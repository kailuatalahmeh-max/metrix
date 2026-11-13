import { create } from "zustand";
import axios from "axios";
import { toast } from "react-toastify";
import type { Statistics } from "@/types/statistics";
import { handleError } from "@/api/handleError";
import { getTranslation } from "@/store/useLanguageStore";

const urlAPI = import.meta.env.VITE_API_URL;

type StatisticsStore = {
  statistics: Statistics | null;
  getStatistics: () => Promise<void>;
  createPayment: (amount?: number) => Promise<boolean>;
};

export const useStatisticsStore = create<StatisticsStore>((set, get) => ({
  statistics: null,

  getStatistics: async () => {
    try {
      const response = await axios.get(`${urlAPI}/statistics`);
      set({ statistics: response.data.data });
    } catch (error) {
      handleError(error);
    }
  },

  createPayment: async (amount) => {
    try {
      await axios.post(`${urlAPI}/payment`, amount === undefined ? {} : { amount });
      toast.success(getTranslation().messages.paymentRecorded);
      await get().getStatistics();
      return true;
    } catch (error) {
      handleError(error);
      return false;
    }
  },
}));
