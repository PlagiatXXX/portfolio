import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import "./BlogPost.scss";

export const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();

  interface Post {
    slug: string;
    title: string;
    excerpt: string;
    date: string;
    readTime: number;
    tags: string[];
    content: string;
  }

  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch("/posts.json");
        if (!response.ok) throw new Error("Ошибка загрузки данных");
        const posts: Post[] = await response.json();
        const foundPost = posts.find((p) => p.slug === slug);
        if (!foundPost) throw new Error("Статья не найдена");
        setPost(foundPost);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    if (slug) fetchPost();
  }, [slug]);

  if (loading) {
    return (
      <div className="loading">
        <h1>Загрузка...</h1>
      </div>
    );
  }

  if (error) {
    return (
      <div className="not-found">
        <h1>{error}</h1>
        <button className="btn btn-primary" onClick={() => navigate("/blog")}>
          Вернуться в блог
        </button>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="not-found">
        <h1>Статья не найдена</h1>
        <button className="btn btn-primary" onClick={() => navigate("/blog")}>
          Вернуться в блог
        </button>
      </div>
    );
  }

  return (
    <article className="blog-post">
      <motion.div
        className="blog-post__header"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <button className="back-btn" onClick={() => navigate("/blog")}>
          ← Вернуться в блог
        </button>
        <h1>{post.title}</h1>
        <div className="post-meta">
          <span>{new Date(post.date).toLocaleDateString("ru-RU")}</span>
          <span>~{post.readTime} мин чтения</span>
        </div>
        <div className="post-tags">
          {post.tags.map((tag) => (
            <span key={tag}>{tag}</span>
          ))}
        </div>
      </motion.div>

      <motion.div
        className="blog-post__content"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        dangerouslySetInnerHTML={{ __html: post.content }}
      />
    </article>
  );
};
