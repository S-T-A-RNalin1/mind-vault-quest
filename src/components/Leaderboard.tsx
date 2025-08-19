import { useEffect, useMemo, useState } from "react";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { supabase } from "@/integrations/supabase/client";

interface LeaderboardProps {
  levelId: number;
}

interface Entry {
  id: string;
  player_name: string;
  completion_time: number; // seconds
  completed_at: string;
}

const formatTime = (seconds: number) => {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
};

export const Leaderboard = ({ levelId }: LeaderboardProps) => {
  const [entries, setEntries] = useState<Entry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    (async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from("leaderboard")
        .select("id, player_name, completion_time, completed_at")
        .eq("level_id", levelId)
        .order("completion_time", { ascending: true })
        .order("completed_at", { ascending: true })
        .limit(10);
      if (!isMounted) return;
      if (error) {
        console.error("Failed to load leaderboard", error);
        setEntries([]);
      } else {
        setEntries(data as Entry[]);
      }
      setLoading(false);
    })();
    return () => { isMounted = false; };
  }, [levelId]);

  const content = useMemo(() => {
    if (loading) {
      return (
        <div className="space-y-2">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="h-6 bg-muted/40 rounded animate-pulse" />
          ))}
        </div>
      );
    }
    if (entries.length === 0) {
      return <div className="text-sm text-muted-foreground">No times recorded yet. Be the first!</div>;
    }
    return (
      <ol className="space-y-2 list-decimal pl-5">
        {entries.map((e, idx) => (
          <li key={e.id} className="flex items-center justify-between text-sm">
            <span className="truncate max-w-[60%]">{e.player_name}</span>
            <span className="font-mono">{formatTime(e.completion_time)}</span>
          </li>
        ))}
      </ol>
    );
  }, [entries, loading]);

  return (
    <Card className="cyber-border p-4">
      <div className="flex items-center justify-between mb-2">
        <h4 className="font-semibold terminal-text">Level {levelId} Leaderboard</h4>
      </div>
      <Separator className="my-2" />
      {content}
    </Card>
  );
};
