import { useEffect } from "react";
import { Link } from "react-router";
import { useWorkshopStore } from "@/store/useWorkshopStore";
import { useTranslation } from "@/i18n/useTranslation";
import styles from "./WorkshopsPage.module.css";

export default function WorkshopsPage() {
  const { t, locale } = useTranslation();
  const workshops = useWorkshopStore((s) => s.workshops);
  const getAllWorkshops = useWorkshopStore((s) => s.getAllWorkshops);

  useEffect(() => {
    getAllWorkshops();
  }, [getAllWorkshops]);

  const handleDeleteWorkshop = async (workshopId: number) => {
    if (
      window.confirm(
        "Are you sure you want to delete this workshop? This action cannot be undone.",
      )
    ) {
      const deleteWorkshop = useWorkshopStore.getState().deleteWorkshop;
      await deleteWorkshop(workshopId);
    }
  };

  return (
    <section className={styles.page}>
      <div className={styles.header}>
        <h1 className={styles.title}>{t.workshops.title}</h1>
        <Link to="/workshops/new" className={styles.addButton}>
          {t.workshops.addWorkshop}
        </Link>
      </div>

      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>{t.workshops.customer}</th>
              <th>{t.workshops.product}</th>
              <th>{t.workshops.region}</th>
              <th className={styles.number}>{t.workshops.meters}</th>
              <th>{t.workshops.date}</th>
              <th className={styles.actions}>{t.workshops.actions}</th>
            </tr>
          </thead>
          <tbody>
            {workshops.length === 0 ? (
              <tr>
                <td colSpan={6} className={styles.empty}>
                  {t.workshops.empty}
                </td>
              </tr>
            ) : (
              workshops.map((workshop) => (
                <tr key={workshop.id}>
                  <td>{workshop.customerName}</td>
                  <td>{workshop.productName}</td>
                  <td>{workshop.region}</td>
                  <td className={styles.number}>{workshop.meters}</td>
                  <td>{new Date(workshop.createdAt).toLocaleString(locale)}</td>
                  <td className={styles.actions}>
                    {/* TODO: add onClick to delete this workshop */}
                    <button
                      type="button"
                      className={styles.deleteButton}
                      aria-label={t.workshops.deleteLabel(
                        workshop.customerName,
                      )}
                      onClick={() => handleDeleteWorkshop(workshop.id)}
                    >
                      {t.workshops.delete}
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}
