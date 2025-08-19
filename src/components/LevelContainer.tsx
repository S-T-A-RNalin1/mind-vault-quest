import { cloneElement, ReactElement, useEffect, useMemo, useState } from "react";
import { useTimer } from "@/hooks/useTimer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Leaderboard } from "@/components/Leaderboard";
import { supabase } from "@/integrations/supabase/client";
import { Trophy, Timer, ListOrdered } from "lucide-react";
import { toast } from "sonner";

interface LevelContainerProps {
  levelId: number;
  onComplete: () => void;
  onBack: () => void;
  children: ReactElement<{ onComplete: () => void; onBack: () => void }>;
}

export const LevelContainer = ({ levelId, onComplete, onBack, children }: LevelContainerProps) => {
  const { start, stop, formatted, elapsedSeconds } = useTimer();
  const [nameDialogOpen, setNameDialogOpen] = useState(false);
  const [leaderboardOpen, setLeaderboardOpen] = useState(false);
  const [playerName, setPlayerName] = useState("");

  useEffect(() => {
    start();
    return () => stop();
  }, [start, stop]);

  const handleChildComplete = async () => {
    stop();
    setNameDialogOpen(true);
  };

  const saveScore = async () => {
    const name = playerName.trim() || "Anonymous";
    const { error } = await supabase.from("leaderboard").insert({
      player_name: name,
      level_id: levelId,
      completion_time: Math.max(0, elapsedSeconds),
    });
    if (error) {
      console.error(error);
      toast.error("Failed to submit time. Please try again.");
      return;
    }
    toast.success("Time submitted! 🎉");
    setNameDialogOpen(false);
    setLeaderboardOpen(true);
    onComplete();
  };

  const childWithInjectedHandlers = useMemo(() => {
    return cloneElement(children, {
      onComplete: handleChildComplete,
      onBack,
    });
  }, [children, onBack]);

  return (
    <div className="relative">
      {/* Floating Timer */}
      <div className="fixed top-4 right-4 z-50">
        <Card className="px-3 py-2 flex items-center gap-2 shadow">
          <Timer className="w-4 h-4 text-accent" />
          <span className="font-mono text-sm">{formatted}</span>
          <Button variant="outline" size="sm" onClick={() => setLeaderboardOpen(true)} className="ml-2">
            <ListOrdered className="w-4 h-4 mr-1" /> Top
          </Button>
        </Card>
      </div>

      {/* Render Level */}
      {childWithInjectedHandlers}

      {/* Name Capture Dialog */}
      <Dialog open={nameDialogOpen} onOpenChange={setNameDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2"><Trophy className="w-5 h-5 text-primary" /> Submit your time</DialogTitle>
          </DialogHeader>
          <div className="space-y-3">
            <div className="text-sm text-muted-foreground">Your time: <span className="font-mono">{formatted}</span></div>
            <div>
              <label className="text-sm text-muted-foreground">Name (optional)</label>
              <Input value={playerName} onChange={(e) => setPlayerName(e.target.value)} placeholder="Enter your display name" />
            </div>
          </div>
          <DialogFooter>
            <Button onClick={saveScore} className="w-full">Save to Leaderboard</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Leaderboard Dialog */}
      <Dialog open={leaderboardOpen} onOpenChange={setLeaderboardOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Level {levelId} Leaderboard</DialogTitle>
          </DialogHeader>
          <Leaderboard levelId={levelId} />
        </DialogContent>
      </Dialog>
    </div>
  );
};
