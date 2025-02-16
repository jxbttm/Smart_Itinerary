import { supabase } from "@/lib/supabase";
import { useState } from "react";

export const useArticles = () => {
  const [articles, setArticles] = useState<any[]>([]);

  const getArticles = async () => {
    const { data, error } = await supabase
      .from("articles")
      .select(`*, votes(vote_count)`);
    if (data) {
      setArticles(data);
    }
  };

  const newVote = async (article_id: number, remove: boolean = false) => {
    try {
      const { data: existingArticle, error: fetchError } = await supabase
        .from("votes")
        .select("*")
        .eq("article_id", article_id)
        .single();

      if (remove && !existingArticle) {
        const { data, error } = await supabase
          .from("votes")
          .insert([{ article_id, vote_count: 0 }]);
        return data;
      } else if (remove && existingArticle) {
        const updated_count =
          existingArticle.vote_count == 0 ? 0 : existingArticle.vote_count - 1;
        const { data, error } = await supabase
          .from("votes")
          .update({
            vote_count: updated_count,
          })
          .eq("id", existingArticle.id);
        return data;
      }

      if (!existingArticle) {
        const { data, error } = await supabase
          .from("votes")
          .insert([{ article_id, vote_count: 1 }]);
      } else {
        const voteCount = existingArticle.vote_count + 1;

        const { data, error } = await supabase
          .from("votes")
          .update({
            vote_count: voteCount,
          })
          .eq("id", existingArticle.id)
          .select();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return {
    articles,
    getArticles,
    newVote,
  };
};
