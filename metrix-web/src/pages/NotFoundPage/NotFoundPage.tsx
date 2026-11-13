import { Link } from "react-router";
import { useTranslation } from "@/i18n/useTranslation";
import styles from "./NotFoundPage.module.css";

export default function NotFoundPage() {
  const { t } = useTranslation();

  return (
    <section className={styles.page}>
      <p className={styles.code}>404</p>
      <h1 className={styles.title}>{t.notFound.title}</h1>
      <Link to="/" className={styles.link}>
        {t.notFound.back}
      </Link>
    </section>
  );
}
