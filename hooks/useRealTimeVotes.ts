import { supabase } from "@/lib/supabase";
import { useEffect, useState } from "react";

const useRealTimeVotes = () => {
  const [votes, setVotes] = useState<any[]>([]);

  const fetchVotes = async () => {
    const { data, error } = await supabase.from("votes").select("*");
    if (error) console.error("Error fetching votes:", error);
    else setVotes(data || []);
  };

  useEffect(() => {
    fetchVotes(); // Fetch initial data

    // Subscribe to real-time updates for INSERT, UPDATE, DELETE
    const channel = supabase
      .channel("votes-realtime")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "votes" },
        (payload) => {
          console.log("Real-time update:", payload);
          setVotes((prevVotes: any[]) => {
            if (payload.eventType === "INSERT") {
              // Add new vote to the list
              return [...prevVotes, payload.new];
            }
            if (payload.eventType === "DELETE") {
              // Remove vote from the list
              return prevVotes.filter(
                (vote: any) => vote.id !== payload.old.id
              );
            }
            if (payload.eventType === "UPDATE") {
              // Update the existing vote in the list
              return prevVotes.map((vote: any) =>
                vote.id === payload.new.id ? { ...vote, ...payload.new } : vote
              );
            }
            return prevVotes;
          });
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  return votes;
};

export default useRealTimeVotes;
