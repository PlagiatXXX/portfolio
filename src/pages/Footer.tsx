import React, { useState, useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import "./Footer.scss";

interface SocialLink {
  icon: string;
  label: string;
  url: string;
  color: string;
}

const socialLinks: SocialLink[] = [
  {
    icon: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>`,
    label: "GitHub",
    url: "https://github.com/PlagiatXXX",
    color: "#ff8c00",
  },
  {
    icon: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M20 7h-3V6a2 2 0 0 0-2-2H9a2 2 0 0 0-2 2v1H4a1 1 0 0 0-1 1v11a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1V8a1 1 0 0 0-1-1zM10 6h4v1h-4V6z"/></svg>`,
    label: "HH.ru",
    url: "https://hh.ru/resume/9f1a100eff09d4f9a70039ed1f55453463396d",
    color: "#ff8c00",
  },
  {
    icon: `<svg width="20" height="20" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
    <path d="M1.108 7.617C5.4 5.768 8.262 4.55 9.694 3.961c4.088-1.682 4.938-1.974 5.492-1.984.68-.011.86.551.804 1.137-.221 2.302-1.18 7.887-1.668 10.465-.43 2.277-1.958 1.292-3.338.397-1.296-.84-2.028-1.362-3.286-2.182-1.453-.947-.511-1.467.317-2.318.217-.223 3.984-3.61 4.057-3.918.06-.256-.167-.333-.373-.286-.13.029-2.2 1.382-6.21 4.058-.588.399-1.12.593-1.597.583-.66-.014-2.26-.583-3.88-1.492-.097-.277.399-.53 1.096-.804z" fill="currentColor"></path>
</svg>`,
    label: "Telegram",
    url: "https://t.me/PasFedor",
    color: "#ff8c00",
  },
  {
    icon: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>`,
    label: "Email",
    url: "mailto:fedorpasyada@gmail.com",
    color: "#ff8c00",
  },
];

const SantaHat = () => (
  <svg
    className="santa-hat-svg"
    viewBox="0 0 512 512"
    role="img"
    aria-label="Новогодняя шапка Деда Мороза"
  >
    <path
      d="M15 70C15 70 20 85 50 85C80 85 85 70 85 70C85 70 80 75 50 75C20 75 15 70 15 70Z"
      fill="#F8F8FF"
    />
    <path
      d="M50 75L20 75C10 40 40 10 60 20C70 25 75 30 80 40C82 50 80 60 85 70"
      fill="#D32F2F"
      stroke="#B71C1C"
      strokeWidth={2}
      strokeLinejoin="round"
    />

    <circle
      cx="82"
      cy="38"
      r="8"
      fill="#F8F8FF"
      stroke="#E0E0E0"
      strokeWidth={1}
    />

    <circle cx="79" cy="35" r="2" fill="white" opacity="0.6" />

    <path
      d="M17 72C17 72 25 78 50 78C75 78 83 72 83 72L82 68C82 68 75 74 50 74C25 74 18 68 18 68L17 72Z"
      fill="#F8F8FF"
    />
  </svg>
);

const Footer: React.FC = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.8 });
  const [isHovering, setIsHovering] = useState(false);
  const [snowflakes, setSnowflakes] = useState<
    { id: number; x: number; y: number; size: number; speed: number }[]
  >([]);
  const [selectedTech, setSelectedTech] = useState<{
    name: string;
    description: string;
  } | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Создание снежинок при загрузке компонента
  useEffect(() => {
    const createSnowflakes = () => {
      const newSnowflakes = [];
      for (let i = 0; i < 50; i++) {
        const snowflake = {
          id: Date.now() + i,
          x: Math.random() * window.innerWidth,
          y: Math.random() * window.innerHeight,
          size: Math.random() * 3 + 1,
          speed: Math.random() * 2 + 1,
        };
        newSnowflakes.push(snowflake);
      }
      setSnowflakes(newSnowflakes);

      // Анимация падения снега
      const interval = setInterval(() => {
        setSnowflakes((prev) => {
          const updatedSnowflakes = prev
            .map((s) => ({
              ...s,
              y: s.y + s.speed,
              x: s.x + Math.sin(s.y * 0.01) * 0.5, // легкое покачивание
            }))
            .filter((s) => s.y < window.innerHeight + 50); // удаляем снежинки, которые упали ниже экрана

          // Добавляем новые снежинки сверху
          if (updatedSnowflakes.length < 50) {
            updatedSnowflakes.push({
              id: Date.now() + Math.random(),
              x: Math.random() * window.innerWidth,
              y: -10,
              size: Math.random() * 3 + 1,
              speed: Math.random() * 2 + 1,
            });
          }

          return updatedSnowflakes;
        });
      }, 50);

      return () => clearInterval(interval);
    };

    createSnowflakes();
  }, []);

  // Анимация появления элементов
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  const currentYear = new Date().getFullYear();

  const techStack = [
    {
      name: "Любовь к коду",
      description: "Делать, то что любишь и любить то, что делаешь",
    },
    {
      name: "AI",
      description:
        "xAI: Grok Code Fast 1, z.ai(GLM-4.6), perplexity.ai(GPT-5.2), GitHub Copilot",
    },
    {
      name: "React",
      description:
        "Библиотека для веб- и нативных пользовательских интерфейсов",
    },
    {
      name: "TypeScript",
      description:
        "Строго типизированный язык программирования, основанный на JavaScript",
    },
    { name: "SCSS", description: "CSS со сверхспособностями" },
    {
      name: "Vite",
      description:
        "Инструмент сборки, созданный для обеспечения быстрого и бережливого процесса разработки современных веб-проектов.",
    },
    { name: "Node.js", description: "Backend/runtime" },
    { name: "Git", description: "Система контроля версий" },
  ];

  const openModal = (tech: { name: string; description: string }) => {
    setSelectedTech(tech);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedTech(null);
  };

  return (
    <footer className="footer">
      {/* Падающий снег */}
      {snowflakes.map((snowflake) => (
        <div
          key={snowflake.id}
          className="snowflake"
          style={
            {
              left: `${snowflake.x}px`,
              top: `${snowflake.y}px`,
              width: `${snowflake.size}px`,
              height: `${snowflake.size}px`,
              fontSize: `${snowflake.size * 2}px`,
            } as React.CSSProperties
          }
        >
          ❄
        </div>
      ))}

      <div className={`footer-content ${isVisible ? "fade-in" : ""}`}>
        <div className="footer-info">
          <div className="footer-title-wrapper" ref={ref}>
            <h3 className="footer-title">Портфолио</h3>
            <motion.div
              className="santa-hat-container"
              initial={{ y: -200, rotate: -20, opacity: 0 }}
              animate={
                isInView
                  ? {
                      y: -35,
                      rotate: -15,
                      opacity: 1,
                    }
                  : {}
              }
              transition={{
                type: "spring",
                stiffness: 100,
                damping: 5,
                delay: 0.5,
              }}
            >
              <SantaHat />
            </motion.div>
          </div>
          <p className="footer-description">
            Создаю современные веб-приложения с фокусом на UX/UI и
            производительность.
          </p>
        </div>

        <div className="footer-links">
          <div className="footer-social">
            <h4>Социальные сети</h4>
            <ul>
              {socialLinks.map((link, index) => (
                <li
                  key={index}
                  style={
                    { "--delay": `${index * 0.1}s` } as React.CSSProperties
                  }
                  className="stagger-appear"
                >
                  <a
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    onMouseEnter={() => setIsHovering(true)}
                    onMouseLeave={() => setIsHovering(false)}
                    className={isHovering ? "pulse" : ""}
                  >
                    <span
                      dangerouslySetInnerHTML={{ __html: link.icon }}
                    ></span>{" "}
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="footer-navigation">
            <h4>Навигация</h4>
            <ul>
              <li>
                <a href="/">Главная</a>
              </li>
              <li>
                <a href="/about">Обо мне</a>
              </li>
              <li>
                <a href="/projects">Проекты</a>
              </li>
              <li>
                <a href="/contact">Контакты</a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Блок с технологиями под линией */}
      <div className="footer-tech-stack">
        <h4>Made with</h4>
        <div className="tech-buttons">
          {techStack.map((tech, index) => (
            <button
              key={index}
              className="tech-button"
              onClick={() => openModal(tech)}
            >
              {tech.name}
            </button>
          ))}
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; {currentYear} Мое Портфолио. Все права защищены.</p>
        <div className="footer-interactive-element">
          <span className={`circle ${isHovering ? "active" : ""}`}></span>
        </div>
      </div>

      {/* Модальное окно */}
      {isModalOpen && selectedTech && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>{selectedTech.name}</h3>
              <button className="modal-close" onClick={closeModal}>
                ×
              </button>
            </div>
            <div className="modal-body">
              <p>{selectedTech.description}</p>
            </div>
            <div className="modal-footer">
              <button className="modal-btn" onClick={closeModal}>
                Закрыть
              </button>
            </div>
          </div>
        </div>
      )}
    </footer>
  );
};

export default Footer;
