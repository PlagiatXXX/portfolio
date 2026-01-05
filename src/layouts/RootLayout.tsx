import { Outlet, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { Header } from "../pages/Header/Header";
import Footer from "../pages/Footer";
import "./RootLayout.scss";

export const RootLayout = () => {
  const location = useLocation();

  return (
    <div className="root-layout">
      <Header />
      <motion.main
        className="root-layout__content"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        transition={{ duration: 0.3 }}
        key={location.pathname}
      >
        <Outlet />
      </motion.main>
      <Footer />
    </div>
  );
};

