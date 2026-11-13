import { NavLink, Outlet } from "react-router";
import { useTranslation } from "@/i18n/useTranslation";
import { useLanguageStore } from "@/store/useLanguageStore";
import styles from "./Layout.module.css";

export default function Layout() {
  const { t, language } = useTranslation();
  const toggleLanguage = useLanguageStore((s) => s.toggleLanguage);

  const links = [
    { to: "/", label: t.nav.dashboard, end: true },
    { to: "/workshops", label: t.nav.workshops, end: true },
    { to: "/workshops/new", label: t.nav.addWorkshop, end: true },
  ];

  return (
    <div className={styles.layout}>
      <nav className={styles.nav} aria-label={t.nav.label}>
        <NavLink to="/" className={styles.brand}>
          Metrix
        </NavLink>
        <ul className={styles.links}>
          {links.map((link) => (
            <li key={link.to}>
              <NavLink
                to={link.to}
                end={link.end}
                className={({ isActive }) =>
                  isActive ? `${styles.link} ${styles.active}` : styles.link
                }
              >
                {link.label}
              </NavLink>
            </li>
          ))}
        </ul>
        <button
          type="button"
          className={styles.langButton}
          onClick={toggleLanguage}
          aria-label={t.nav.switchLanguageLabel}
          lang={language === "ar" ? "en" : "ar"}
        >
          {t.nav.switchLanguage}
        </button>
      </nav>
      <main className={styles.content}>
        <Outlet />
      </main>
    </div>
  );
}
