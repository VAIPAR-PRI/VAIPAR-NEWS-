import React, { useEffect, useState } from "react";

const categories = ["National", "International", "Sports", "Politics"];
const API_KEY = "8fb29c3bb74827edae461d8220e0953f";

export default function App() {
  const [articles, setArticles] = useState({});
  const [selectedCategory, setSelectedCategory] = useState("National");

  useEffect(() => {
    const fetchArticles = async () => {
      const baseURL = "https://gnews.io/api/v4/top-headlines";
      const topics = {
        National: "general",
        International: "world",
        Sports: "sports",
        Politics: "politics"
      };

      const results = {};

      for (let cat of categories) {
        const res = await fetch(`${baseURL}?topic=${topics[cat]}&lang=en&country=in&token=${API_KEY}`);
        const data = await res.json();
        results[cat] = data.articles;
      }

      setArticles(results);
    };

    fetchArticles();
    const interval = setInterval(fetchArticles, 15 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ fontFamily: "sans-serif", padding: 20 }}>
      <h1>Vaipar News 📰</h1>
      <div style={{ display: "flex", gap: 10, margin: "20px 0" }}>
        {categories.map((cat) => (
          <button key={cat} onClick={() => setSelectedCategory(cat)}>{cat}</button>
        ))}
      </div>
      {articles[selectedCategory]?.map((a, i) => (
        <div key={i} style={{ marginBottom: 20, border: "1px solid #ccc", padding: 10 }}>
          <h2>{a.title}</h2>
          <p>{a.description}</p>
          <a href={a.url} target="_blank" rel="noopener noreferrer">Read More</a>
        </div>
      ))}
    </div>
  );
      }
