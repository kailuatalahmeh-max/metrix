import { useState } from "react";
import { useWorkshopStore } from "@/store/useWorkshopStore";
import { useTranslation } from "@/i18n/useTranslation";

export default function AddWorkshopPage() {
  const { t } = useTranslation();
  const [workshopData, setWorkshopData] = useState({
    customerName: "",
    productName: "",
    region: "",
    meters: "",
  });

  const createWorkshop = useWorkshopStore((state) => state.createWorkshop);

  function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    createWorkshop(workshopData);
    setWorkshopData({
      customerName: "",
      productName: "",
      region: "",
      meters: "",
    });
  }

  return (
    <>
      <header>
        <h1 className="pageTitle-EntryData">{t.addWorkshop.title}</h1>
      </header>
      <div className="mainPart">
        <form onSubmit={handleSubmit} className="formPart">
          <p className="formTitle">{t.addWorkshop.formTitle}</p>

          <label>
            {t.addWorkshop.customerName}
            <input
              className="customerNameInput"
              type="text"
              value={workshopData.customerName}
              onChange={(e) =>
                setWorkshopData((p) => ({ ...p, customerName: e.target.value }))
              }
              placeholder={t.addWorkshop.customerNamePlaceholder}
            />
          </label>
          <label>
            {t.addWorkshop.productName}
            <input
              className="productNameInput"
              type="text"
              value={workshopData.productName}
              onChange={(e) =>
                setWorkshopData((p) => ({ ...p, productName: e.target.value }))
              }
              placeholder={t.addWorkshop.productNamePlaceholder}
            />
          </label>
          <label>
            {t.addWorkshop.region}
            <input
              className="regionInput"
              type="text"
              value={workshopData.region}
              onChange={(e) =>
                setWorkshopData((p) => ({ ...p, region: e.target.value }))
              }
              placeholder={t.addWorkshop.regionPlaceholder}
            />
          </label>
          <label>
            {t.addWorkshop.meters}
            <input
              className="metersInput"
              type="text"
              value={workshopData.meters}
              inputMode="decimal"
              onChange={(e) => {
                setWorkshopData((p) => ({
                  ...p,
                  meters: e.target.value,
                }));
              }}
              placeholder={t.addWorkshop.metersPlaceholder}
            />
          </label>
          <button type="submit" className="btnSubmitForm">
            {t.addWorkshop.submit}
          </button>
        </form>
      </div>
    </>
  );
}
