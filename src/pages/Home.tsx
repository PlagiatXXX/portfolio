import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import './Home.scss';

export const Home = () => {
  const navigate = useNavigate();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 },
    },
  };

  return (
    <section id="hero" className="home section">
      <div className="container">
        <motion.div
          className="hero__content"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.p variants={itemVariants} className="hero__greeting">
            👋 Привет, я начинающий
            
          </motion.p>

          <motion.h1 variants={itemVariants} className="hero__title">
            <span className="gradient-text">Full Stack</span> 
            <img src="/images/arrow2.svg" alt="Декоративная стрелка" className='decoration'/>
            Разработчик
            <img src="/images/code.svg" alt="Декоративный значок кода" className='decoration'/>
          </motion.h1>

          <motion.p variants={itemVariants} className="hero__subtitle">
            Создаю современные веб-приложения с React, TypeScript и Node.js
          </motion.p>

          <motion.div variants={itemVariants} className="hero__cta">
            <motion.button
              className="btn btn-primary"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/projects')}
            >
              Смотреть проекты
            </motion.button>

            <motion.button
              className="btn btn-secondary"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/contact')}
            >
              Связаться
            </motion.button>
          </motion.div>

          <motion.div variants={itemVariants} className="hero__socials">
            <a href="https://github.com/PlagiatXXX" target="_blank" rel="noopener noreferrer">
              <motion.div whileHover={{ y: -5 }}>GitHub</motion.div>
            </a>
            <a href="https://hh.ru/resume/9f1a100eff09d4f9a70039ed1f55453463396d" target="_blank" rel="noopener noreferrer">
              <motion.div whileHover={{ y: -5 }}>HH.ru</motion.div>
            </a>
            <a href="https://t.me/PasFedor" target="_blank" rel="noopener noreferrer">
              <motion.div whileHover={{ y: -5 }}>Telegram</motion.div>
            </a>
          </motion.div>
        </motion.div>

        <motion.div
          className="hero__visual"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
            <img
              src="/images/Fedor.webp"
              alt="Профиль разработчика"
              className="profile-image"
            />
            
            <div className="hero__caption">
            <img src="/images/arrow.svg"
              alt="Стрелка"
              className='arrow-image'
            />
          <p>Это я!</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
