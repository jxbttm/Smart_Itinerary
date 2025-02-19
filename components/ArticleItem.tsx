"use client";

import { useArticles } from "@/hooks/useArticles";
import { useVotes } from "@/hooks/useVotes";
import { ArrowUpCircleIcon } from "@heroicons/react/24/outline";

export type Article = {
  id: number;
  created_at: string;
  title: string;
  votes?: any[];
};

export default function ArticleItem({
  article: { id, title, votes },
}: {
  article: Article;
}) {
  const { newVote } = useArticles();
  let article_votes = 0;
  if (votes && votes[0]) {
    article_votes = votes[0].vote_count;
  }
  return (
    <div className="border flex items-center justify-between px-4 py-3 cursor-pointer hover:bg-gray-900">
      <h2>{title}</h2>
      <div className="grid text-center ">
        <span onClick={() => newVote(id)} className="flex justify-center">
          <ArrowUpCircleIcon className="w-10 h-10 hover:text-blue-400" />
        </span>

        <span>{article_votes} votes</span>
        <span onClick={() => newVote(id, true)} className="flex justify-center">
          <ArrowUpCircleIcon className="rotate-180 w-10 h-10 hover:text-blue-400" />
        </span>
      </div>
    </div>
  );
}
