import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import './About.scss';

export const About = () => {
  const navigate = useNavigate();

  const skills = [
    'React',
    'TypeScript',
    'TailwindCSS',
    'Vite',
    'Git',
    'Node.js',
    'PostgreSQL',
    'SCSS/SASS',
    'REST API',
    'Docker',
  ];

  return (
    <section className="about section">
      <div className="container">
        <motion.h1
          className="section-title"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Обо <span className="gradient-text">мне</span>
        </motion.h1>

        <div className="about__content">
          <motion.div
            className="about__text"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p>
              Привет! Меня зовут Федор и я начинающий Full Stack разработчик с опытом создания современных веб-приложений.
              Начал своё путешествие в веб-разработке с фронтенда, но быстро понял важность
              глубокого понимания полного стека.
            </p>

            <p>
              Сейчас я специализируюсь на создании масштабируемых приложений с использованием
              React, TypeScript для фронтенда и Node.js для бэкенда. Я постоянно учусь новым
              технологиям и лучшим практикам разработки при этом активно использую ИИ в каждом проекте.
            </p>

            <p>
              Люблю решать сложные задачи и создавать интуитивно понятные интерфейсы.
              Я увлечён оптимизацией производительности и созданием
              пользовательских интерфейсов, которые доставляют максимальный комфорт при использовании.
            </p>
          </motion.div>

          <motion.div
            className="about__skills"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3>Основные навыки</h3>
            <div className="skills-grid">
              {skills.map((skill, index) => (
                <motion.div
                  key={skill}
                  className="skill-badge"
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  whileHover={{ scale: 1.1, y: -5 }}
                >
                  {skill}
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        <motion.div
          className="about__cta"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          <button className="btn btn-primary" onClick={() => navigate('/blog')}>
            Читать блог
          </button>
          <button className="btn btn-secondary" onClick={() => navigate('/contact')}>
            Давайте поговорим
          </button>
        </motion.div>
      </div>
    </section>
  );
};
