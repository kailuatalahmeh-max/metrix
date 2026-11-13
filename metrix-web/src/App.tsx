import { ToastContainer } from "react-toastify";
import { Route, Routes } from "react-router";
import Layout from "@/components/Layout/Layout";
import DashboardPage from "@/pages/DashboardPage/DashboardPage";
import WorkshopsPage from "@/pages/WorkshopsPage/WorkshopsPage";
import AddWorkshopPage from "@/pages/AddWorkshopPage/AddWorkshopPage";
import NotFoundPage from "@/pages/NotFoundPage/NotFoundPage";
import { useTranslation } from "@/i18n/useTranslation";

export default function App() {
  const { dir } = useTranslation();
  const isRtl = dir === "rtl";

  return (
    <>
      <ToastContainer
        position={isRtl ? "top-left" : "top-right"}
        autoClose={3000}
        theme="light"
        rtl={isRtl}
      />
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<DashboardPage />} />
          <Route path="workshops" element={<WorkshopsPage />} />
          <Route path="workshops/new" element={<AddWorkshopPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </>
  );
}
