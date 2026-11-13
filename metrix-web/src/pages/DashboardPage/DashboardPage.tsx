import { useEffect, useState } from "react";
import { Link } from "react-router";
import { toast } from "react-toastify";
import { useStatisticsStore } from "@/store/useStatisticsStore";
import { useWorkshopStore } from "@/store/useWorkshopStore";
import { useTranslation } from "@/i18n/useTranslation";
import styles from "./DashboardPage.module.css";

const RECENT_COUNT = 5;

function formatDate(value: string, locale: string) {
  return new Date(value).toLocaleString(locale, {
    dateStyle: "medium",
    timeStyle: "short",
  });
}

function formatDay(value: string, locale: string) {
  return new Date(value).toLocaleDateString(locale, {
    month: "short",
    day: "numeric",
  });
}

function formatYearAndTime(value: string, locale: string) {
  const date = new Date(value);
  const year = date.getFullYear();
  const time = date.toLocaleTimeString(locale, {
    hour: "numeric",
    minute: "2-digit",
  });
  return `${year} · ${time}`;
}

function formatDaysAgo(value: string, locale: string) {
  const day = new Date(value);
  day.setHours(0, 0, 0, 0);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const days = Math.round((today.getTime() - day.getTime()) / 86_400_000);
  return new Intl.RelativeTimeFormat(locale, { numeric: "auto" }).format(
    -days,
    "day",
  );
}

function formatMeters(value: number, locale: string) {
  return value.toLocaleString(locale, { maximumFractionDigits: 2 });
}

export default function DashboardPage() {
  const { t, locale } = useTranslation();
  const statistics = useStatisticsStore((s) => s.statistics);
  const getStatistics = useStatisticsStore((s) => s.getStatistics);
  const createPayment = useStatisticsStore((s) => s.createPayment);
  const workshops = useWorkshopStore((s) => s.workshops);
  const getAllWorkshops = useWorkshopStore((s) => s.getAllWorkshops);

  const [amount, setAmount] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    getStatistics();
    getAllWorkshops();
  }, [getStatistics, getAllWorkshops]);

  async function handlePayment(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();

    const trimmed = amount.trim();
    const amountNumber = Number(trimmed);
    if (trimmed !== "" && (!Number.isFinite(amountNumber) || amountNumber <= 0)) {
      toast.error(t.dashboard.invalidAmount);
      return;
    }

    if (!confirm(t.dashboard.confirmPayment)) {
      return;
    }

    setIsSaving(true);
    const saved = await createPayment(trimmed === "" ? undefined : amountNumber);
    setIsSaving(false);
    if (saved) setAmount("");
  }

  const recentWorkshops = workshops.slice(0, RECENT_COUNT);
  const lastPayment = statistics?.lastPayment ?? null;

  return (
    <section className={styles.page}>
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>{t.dashboard.title}</h1>
          <p className={styles.subtitle}>
            {statistics === null
              ? t.dashboard.loading
              : lastPayment
                ? t.dashboard.sinceLastPayment(formatDate(lastPayment, locale))
                : t.dashboard.noPayments}
          </p>
        </div>
        <Link to="/workshops/new" className={styles.primaryButton}>
          {t.dashboard.addWorkshop}
        </Link>
      </div>

      <div className={styles.stats}>
        <div className={`${styles.statCard} ${styles.statHighlight}`}>
          <p className={styles.statLabel}>{t.dashboard.metersSincePayment}</p>
          <p className={styles.statValue}>
            {statistics ? formatMeters(statistics.totalMeters, locale) : "—"}
            <span className={styles.statUnit}>{t.common.meterUnit}</span>
          </p>
        </div>
        <div className={styles.statCard}>
          <p className={styles.statLabel}>{t.dashboard.workshopsSincePayment}</p>
          <p className={styles.statValue}>
            {statistics ? statistics.workshopCount : "—"}
          </p>
        </div>
        <div className={styles.statCard}>
          <p className={styles.statLabel}>{t.dashboard.lastPayment}</p>
          <p className={styles.statValue}>
            {statistics === null ? "—" : lastPayment ? formatDay(lastPayment, locale) : t.dashboard.never}
          </p>
          {statistics !== null && (
            <p className={styles.statSub}>
              {lastPayment ? (
                <>
                  <span className={styles.badge}>{formatDaysAgo(lastPayment, locale)}</span>
                  {formatYearAndTime(lastPayment, locale)}
                </>
              ) : (
                t.dashboard.recordPaymentHint
              )}
            </p>
          )}
        </div>
      </div>

      <div className={styles.columns}>
        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <h2 className={styles.cardTitle}>{t.dashboard.recentWorkshops}</h2>
            <Link to="/workshops" className={styles.textLink}>
              {t.dashboard.viewAll}
            </Link>
          </div>

          {recentWorkshops.length === 0 ? (
            <p className={styles.empty}>
              {t.dashboard.noWorkshops}{" "}
              <Link to="/workshops/new" className={styles.textLink}>
                {t.dashboard.addFirst}
              </Link>
            </p>
          ) : (
            <ul className={styles.recentList}>
              {recentWorkshops.map((workshop) => (
                <li key={workshop.id} className={styles.recentItem}>
                  <div>
                    <p className={styles.recentCustomer}>{workshop.customerName}</p>
                    <p className={styles.recentMeta}>
                      {workshop.productName} · {workshop.region} ·{" "}
                      {formatDate(workshop.createdAt, locale)}
                    </p>
                  </div>
                  <p className={styles.recentMeters}>
                    {formatMeters(Number(workshop.meters), locale)} {t.common.meterUnit}
                  </p>
                </li>
              ))}
            </ul>
          )}
        </div>

        <form className={styles.card} onSubmit={handlePayment}>
          <h2 className={styles.cardTitle}>{t.dashboard.recordPayment}</h2>
          <p className={styles.cardText}>
            {t.dashboard.recordPaymentText}
          </p>
          <label className={styles.field}>
            {t.dashboard.amountLabel}
            <input
              type="text"
              inputMode="decimal"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder={t.dashboard.amountPlaceholder}
              className={styles.input}
            />
          </label>
          <button type="submit" className={styles.payButton} disabled={isSaving}>
            {isSaving ? t.dashboard.saving : t.dashboard.recordPayment}
          </button>
        </form>
      </div>
    </section>
  );
}
