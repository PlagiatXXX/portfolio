import { motion } from 'framer-motion';
import { useLocation, useNavigate } from 'react-router-dom';
import './NavLink.scss';

interface NavLinkProps {
  path: string;
  label: string;
  onClick?: () => void;
}

export const NavLink = ({ path, label, onClick }: NavLinkProps) => {
  const location = useLocation();
  const navigate = useNavigate();
  const isActive = location.pathname === path;

  const handleClick = () => {
    navigate(path);
    onClick?.();
  };

  return (
    <motion.button
      className={`nav-link ${isActive ? 'active' : ''}`}
      onClick={handleClick}
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.98 }}
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <span className="nav-link__text">{label}</span>
      
      {/* Анимированное подчеркивание */}
      <motion.div
        className="nav-link__underline"
        initial={{ scaleX: 0, originX: 0.5 }}
        animate={{ scaleX: isActive ? 1 : 0 }}
        whileHover={{ scaleX: 1 }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
        layoutId={`underline-${path}`}
      />
    </motion.button>
  );
};
