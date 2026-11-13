import { create } from "zustand";
import axios from "axios";
import { toast } from "react-toastify";
import type { Workshop, WorkshopForm } from "@/types/workshop";
import { handleError } from "@/api/handleError";
import { getTranslation } from "@/store/useLanguageStore";

const urlAPI = import.meta.env.VITE_API_URL;

type WorkshopStore = {
  workshops: Workshop[];
  createWorkshop: (form: WorkshopForm) => Promise<void>;
  deleteWorkshop: (workshopId: number) => Promise<void>;
  getAllWorkshops: () => Promise<void>;
};
export const useWorkshopStore = create<WorkshopStore>((set) => ({
  workshops: [],

  createWorkshop: async (form) => {
    const metersNumber = Number(form.meters);

    if (form.meters.trim() === "" || !Number.isFinite(metersNumber)) {
      toast.error(getTranslation().messages.invalidMeters);
      return;
    }
    try {
      const response = await axios.post(`${urlAPI}/workshop/create-workshop`, {
        customerName: form.customerName,
        productName: form.productName,
        region: form.region,
        meters: metersNumber,
      });
      toast.success(response.data.message || getTranslation().messages.workshopCreated);
    } catch (error) {
      handleError(error);
      return;
    }
  },

  deleteWorkshop: async (workshopId: number) => {
    try {
      const response = await axios.delete(
        `${urlAPI}/workshop/delete-workshop/${workshopId}`
      );
      toast.success(response.data.message || getTranslation().messages.workshopDeleted);
      set((state) => ({
        workshops: state.workshops.filter(
          (workshop) => workshop.id !== workshopId
        ),
      }));
    } catch (error) {
      handleError(error);
    }
  },
  getAllWorkshops: async () => {
    try {
      const response = await axios.get(`${urlAPI}/workshop/get-all-workshops`);
      set({ workshops: response.data });
      console.log("Fetched workshops:", response.data);
    } catch (error) {
      handleError(error);
    }
  },
}));
