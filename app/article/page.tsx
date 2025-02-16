"use client";
import ArticleItem from "@/components/ArticleItem";
import { useArticles } from "@/hooks/useArticles";
import useRealTimeVotes from "@/hooks/useRealTimeVotes";
import { useEffect } from "react";

export default function Articles() {
  const { articles, getArticles } = useArticles();
  const votes = useRealTimeVotes();
  useEffect(() => {
    getArticles();
  }, [votes]);

  useEffect(() => {
    getArticles();
  }, []);

  return (
    <div className="container mx-auto">
      <ul className="grid gap-4">
        {articles.map((article: any, key: number) => (
          //   <li className="" key={key}>{article.title}</li>
          <ArticleItem key={key} article={article} />
        ))}
      </ul>
    </div>
  );
}
