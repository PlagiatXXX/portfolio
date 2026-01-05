import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import './NotFound.scss';

export const NotFound = () => {
  const navigate = useNavigate();

  return (
    <section className="not-found section">
      <div className="container">
        <motion.div
          className="not-found__content"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <motion.h1
            className="error-code"
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            404
          </motion.h1>

          <h2>Страница не найдена</h2>
          <p>Похоже, эта страница испарилась</p>

          <motion.div
            className="not-found__actions"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <button className="btn btn-primary" onClick={() => navigate('/')}>
              На главную
            </button>
            <button className="btn btn-secondary" onClick={() => navigate(-1)}>
              Вернуться назад
            </button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
