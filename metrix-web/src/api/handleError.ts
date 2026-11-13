import axios from "axios";
import { toast } from "react-toastify";
import { getTranslation } from "@/store/useLanguageStore";

export function handleError(error: unknown) {
  const t = getTranslation();

  if (axios.isAxiosError(error)) {
    toast.error(error.response?.data?.message || t.messages.error);
  } else {
    toast.error(t.messages.unexpectedError);
  }
}
