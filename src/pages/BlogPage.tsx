import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { getBlogPostPath } from '../router/routeTypes';
import './BlogPage.scss';
import { posts } from '../data/posts';

interface Post {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: number;
  tags: string[];
  content: string;
}

export const BlogPage = () => {
  const [articles, setArticles] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadArticles = () => {
      try {
        setLoading(true);
        setError(null);
        setArticles(posts);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    loadArticles();
  }, []);

  if (loading) {
    return (
      <section className="blog-page">
        <motion.h1
          className="page-title"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          Блог <span className="gradient-text">статьи</span>
        </motion.h1>
        <div className="loading">
          <h2>Загрузка статей...</h2>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="blog-page">
        <motion.h1
          className="page-title"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          Блог <span className="gradient-text">статьи</span>
        </motion.h1>
        <div className="error">
          <h2>{error}</h2>
        </div>
      </section>
    );
  }

  return (
    <section className="blog-page">
      <motion.h1
        className="page-title"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        Блог <span className="gradient-text">статьи</span>
      </motion.h1>

      <div className="blog-grid">
        {articles.map((article, index) => (
          <motion.article
            key={article.slug}
            className="blog-card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ y: -5 }}
          >
            <Link to={getBlogPostPath(article.slug)}>
              <div className="blog-card__header">
                <h3>{article.title}</h3>
                <p className="excerpt">{article.excerpt}</p>
              </div>

              <div className="blog-card__meta">
                <span className="date">{new Date(article.date).toLocaleDateString('ru-RU')}</span>
                <span className="read-time">~{article.readTime} мин</span>
              </div>

              <div className="blog-card__tags">
                {article.tags.map((tag) => (
                  <span key={tag}>{tag}</span>
                ))}
              </div>
            </Link>
          </motion.article>
        ))}
      </div>
    </section>
  );
};
