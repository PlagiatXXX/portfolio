import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ROUTES } from "../../router/routeTypes";
import { NavLink } from "./NavLink";
import "./Header.scss";

const getInitialTheme = (): "light" | "dark" => {
  const savedTheme = localStorage.getItem("theme") as "light" | "dark" | null;
  return savedTheme || "dark";
};

export const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [theme, setTheme] = useState<"light" | "dark">(getInitialTheme);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Применить тему при загрузке
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMobileMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const navItems = [
    { path: ROUTES.HOME.path, label: "Главная" },
    { path: ROUTES.ABOUT.path, label: "Обо мне" },
    { path: ROUTES.PROJECTS.path, label: "Проекты" },
    { path: ROUTES.BLOG.path, label: "Блог" },
    { path: ROUTES.CONTACT.path, label: "Контакт" },
  ];

  // Контейнер анимации для навигации
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.1,
      } as const,
    },
  };

  // Мобильное меню анимация
  const mobileMenuVariants = {
    hidden: {
      opacity: 0,
      y: -20,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3,
        ease: [0.34, 1.56, 0.64, 1] as const,
      },
    },
    exit: {
      opacity: 0,
      y: -20,
      transition: {
        duration: 0.2,
      },
    },
  };

  return (
    <>
      <motion.header
        className={`header ${scrolled ? "scrolled" : ""}`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: [0.34, 1.56, 0.64, 1] }}
      >
        <div className="container header__content">
          {/* Логотип */}
          <motion.div
            className="header__logo"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate(ROUTES.HOME.path)}
          >
            <motion.span
              className="gradient-text"
              animate={{
                backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: [0.5, 0, 0.5, 1],
              }}
            >
              ЯСайт
            </motion.span>
          </motion.div>

          {/* Десктопная навигация */}
          <motion.nav
            className="header__nav desktop-nav"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {navItems.map((item) => (
              <NavLink key={item.path} path={item.path} label={item.label} />
            ))}
          </motion.nav>

          {/* Кнопки действий */}
          <div className="header__actions">
            <motion.button
              className="theme-toggle"
              onClick={toggleTheme}
              whileHover={{ rotate: 180, scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              transition={{ duration: 0.3 }}
              aria-label="Toggle theme"
            >
              {theme === "dark" ? (
                <span className="theme-icon">☀️</span>
              ) : (
                <span className="theme-icon">🌙</span>
              )}
            </motion.button>

            {/* Мобильное меню */}
            <motion.button
              className="mobile-menu-btn"
              onClick={toggleMobileMenu}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              aria-label="Toggle menu"
            >
              <motion.div
                className="hamburger"
                animate={mobileMenuOpen ? "open" : "closed"}
              >
                <motion.span
                  className="hamburger__line"
                  variants={{
                    closed: { rotate: 0, y: 0 },
                    open: { rotate: 45, y: 8 },
                  }}
                />
                <motion.span
                  className="hamburger__line"
                  variants={{
                    closed: { opacity: 1 },
                    open: { opacity: 0 },
                  }}
                />
                <motion.span
                  className="hamburger__line"
                  variants={{
                    closed: { rotate: 0, y: 0 },
                    open: { rotate: -45, y: -8 },
                  }}
                />
              </motion.div>
            </motion.button>
          </div>
        </div>

        {/* Мобильная навигация */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              className="header__mobile-nav"
              variants={mobileMenuVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <nav className="mobile-nav">
                {navItems.map((item, index) => (
                  <motion.div
                    key={item.path}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <NavLink
                      path={item.path}
                      label={item.label}
                      onClick={() => setMobileMenuOpen(false)}
                    />
                  </motion.div>
                ))}
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      {/* Оверлей для закрытия меню */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            className="mobile-menu-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setMobileMenuOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Фиксированный отступ для скролла */}
      <div className="header-spacer" />
    </>
  );
};
