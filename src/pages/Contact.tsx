import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { useState } from "react";
import "./Contact.scss";

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
  [key: string]: string; // Индексная сигнатура для динамических ключей[]
}

export const Contact = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"success" | "error" | null>(
    null
  );

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);

    try {
      const token = import.meta.env.VITE_TELEGRAM_BOT_TOKEN;
      const chatId = import.meta.env.VITE_TELEGRAM_CHAT_ID;

      if (!token || !chatId) {
        throw new Error("Токен бота или ID чата не настроены");
      }

      const message = `Сообщение с сайта портфолио:\n Имя: ${data.name}\nEmail: ${data.email}\nТема: ${data.subject}\nСообщение: ${data.message}`;

      const response = await fetch(
        `https://api.telegram.org/bot${token}/sendMessage`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            chat_id: chatId,
            text: message,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Ошибка отправки сообщения");
      }

      setSubmitStatus("success");
      reset();
    } catch {
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
      setTimeout(() => {
  reset();
  setSubmitStatus(null);
}, 4000);
    }
  };

  return (
    <section className="contact-page section">
      <div className="container">
        <motion.h1
          className="page-title"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Свяжитесь со <span className="gradient-text">мной</span>
        </motion.h1>

        <motion.p
          className="page-subtitle"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
        >
          У вас есть интересное предложение? Давайте обсудим его!
        </motion.p>

        <div className="contact-content">
          <motion.div
            className="contact-info"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="info-card">
              <h3>📧 Email</h3>
              <a href="mailto:fedorpasyada@gmail.com">fedorpasyada@gmail.com</a>
            </div>

            <div className="info-card">
              <h3>📱 Телефон</h3>
              <a href="tel:+79281837919">+7 (928) 183-79-19</a>
            </div>

            <div className="info-card">
              <h3>🔗 Социальные сети</h3>
              <div className="socials">
                <a
                  href="https://github.com/PlagiatXXX"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  GitHub
                </a>
                <a
                  href="https://hh.ru/resume/25d415f7ff0fd074b40039ed1f56317a456370"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  hh.ru
                </a>
                <a
                  href="https://t.me/+79281837919"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Telegram
                </a>
              </div>
            </div>
          </motion.div>

          <motion.form
            className="contact__form"
            onSubmit={handleSubmit(onSubmit)}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <div className="form-group">
              <input
                type="text"
                placeholder="Ваше имя"
                {...register("name", { required: "Имя обязательно" })}
              />
              {errors.name && (
                <span className="error">{errors.name.message}</span>
              )}
            </div>

            <div className="form-group">
              <input
                type="email"
                placeholder="Email"
                {...register("email", {
                  required: "Email обязателен",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Неверный формат email",
                  },
                })}
              />
              {errors.email && (
                <span className="error">{errors.email.message}</span>
              )}
            </div>

            <div className="form-group">
              <input
                type="text"
                placeholder="Тема сообщения"
                {...register("subject", { required: "Тема обязательна" })}
              />
              {errors.subject && (
                <span className="error">{errors.subject.message}</span>
              )}
            </div>

            <div className="form-group">
              <textarea
                placeholder="Сообщение"
                rows={5}
                {...register("message", { required: "Сообщение обязательно" })}
              />
              {errors.message && (
                <span className="error">{errors.message.message}</span>
              )}
            </div>

            <motion.button
              type="submit"
              className="btn btn-primary"
              disabled={isSubmitting}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {isSubmitting ? "Отправка..." : "Отправить"}
            </motion.button>

            {submitStatus === "success" && (
              <p className="success-message">Сообщение успешно отправлено!</p>
            )}
            {submitStatus === "error" && (
              <p className="error-message">
                Ошибка отправки. Попробуйте позже.
              </p>
            )}
          </motion.form>
        </div>
      </div>
    </section>
  );
};
