import { supabase } from "@/lib/supabase";
import { useState } from "react";

export const useArticles = () => {
  const [articles, setArticles] = useState<any[]>([]);

  const getArticles = async () => {
    const { data: articles, error: articlesError } = await supabase
      .from("articles")
      .select("*,votes(*)");

    if (articles) {
      console.log(articles);
      setArticles(articles);
    }
  };

  const newVote = async (article_id: number, remove: boolean = false) => {
    if (remove) {
      const { data, error } = await supabase
        .from("votes")
        .delete()
        .eq("article_id", article_id);
      return data;
    }
    const { data, error } = await supabase
      .from("votes")
      .insert({ article_id: article_id })
      .select()
      .single();

    if (data) console.log(data);
  };

  return {
    articles,
    getArticles,
    newVote,
  };
};
