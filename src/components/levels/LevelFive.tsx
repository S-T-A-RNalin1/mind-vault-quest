import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft, Clock, AlertCircle, FileText } from "lucide-react";
import { toast } from "sonner";

interface LevelFiveProps {
  onComplete: () => void;
  onBack: () => void;
}

export const LevelFive = ({ onComplete, onBack }: LevelFiveProps) => {
  const [password, setPassword] = useState("");
  const [showHint, setShowHint] = useState(false);

  const handleSubmit = () => {
    if (password.toLowerCase() === "house") {
      toast.success("Correct! Level 5 completed!");
      onComplete();
    } else {
      toast.error("Incorrect password. Check the chronological order...");
    }
  };

  const files = [
    { name: "hello.txt", created: "2024-01-15 01:00:00", size: "0 KB" },
    { name: "ent.txt", created: "2024-01-15 05:00:00", size: "0 KB" },
    { name: "snake.txt", created: "2024-01-15 04:00:00", size: "0 KB" },
    { name: "oracle.txt", created: "2024-01-15 02:00:00", size: "0 KB" },
    { name: "upward.txt", created: "2024-01-15 03:00:00", size: "0 KB" }
  ];

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <Card className="cyber-border vault-glow p-6">
          <div className="flex items-center gap-4">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={onBack}
              className="vault-glow"
            >
              <ArrowLeft className="w-4 h-4" />
            </Button>
            <div>
              <h1 className="text-2xl font-bold terminal-text text-primary">
                Level 5: Time Traveler
              </h1>
              <p className="text-muted-foreground terminal-text">
                When files were born tells a story.
              </p>
            </div>
          </div>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* File Directory */}
          <Card className="cyber-border p-6">
            <div className="flex items-center gap-2 mb-4">
              <Clock className="w-5 h-5 text-accent" />
              <h3 className="font-bold terminal-text text-accent">05_time_of_birth.txt Directory</h3>
            </div>
            
            <div className="space-y-4">
              <div className="p-4 rounded border border-primary/30 bg-primary/10">
                <p className="terminal-text text-primary text-sm text-center">
                  "Order reveals truth. Birth order tells the story."
                </p>
              </div>

              {/* File List */}
              <div className="space-y-2">
                {files.map((file) => (
                  <div 
                    key={file.name}
                    className="flex items-center gap-3 p-3 rounded border border-border bg-input hover:bg-input/80 transition-colors"
                  >
                    <FileText className="w-4 h-4 text-muted-foreground" />
                    <div className="flex-1">
                      <div className="font-mono text-sm terminal-text text-foreground">
                        {file.name}
                      </div>
                      <div className="text-xs text-muted-foreground terminal-text">
                        Created: {file.created} • Size: {file.size}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="p-3 rounded border border-accent/30 bg-accent/10">
                <p className="text-xs terminal-text text-accent">
                  💡 All files are empty, but their metadata holds the key.
                  The first letter of each filename, arranged by creation time, spells the password.
                </p>
              </div>
            </div>
          </Card>

          {/* Password Input */}
          <Card className="cyber-border vault-glow p-6">
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-bold terminal-text text-primary mb-2">
                  Chronological Order
                </h3>
                <p className="text-sm text-muted-foreground terminal-text">
                  Arrange the files by their creation time and take the first letter of each filename.
                </p>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="text-sm terminal-text text-muted-foreground">
                    Password
                  </label>
                  <Input
                    type="text"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Spell it out..."
                    className="mt-1 bg-input border-border terminal-text"
                    onKeyPress={(e) => e.key === 'Enter' && handleSubmit()}
                  />
                </div>

                <Button 
                  onClick={handleSubmit}
                  className="w-full bg-primary hover:bg-primary/80 text-primary-foreground vault-glow"
                >
                  Submit Password
                </Button>
              </div>

              {/* Hint Section */}
              <div className="space-y-3">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowHint(!showHint)}
                  className="w-full border-accent/50 text-accent hover:bg-accent/10"
                >
                  <AlertCircle className="w-4 h-4 mr-2" />
                  {showHint ? 'Hide Hint' : 'Show Hint'}
                </Button>

                {showHint && (
                  <div className="p-3 rounded border border-accent/30 bg-accent/10">
                    <p className="text-xs terminal-text text-accent">
                      💡 Sort the files by creation time (earliest first):
                      01:00 → 02:00 → 03:00 → 04:00 → 05:00
                      Then take the first letter of each filename in that order.
                    </p>
                  </div>
                )}
              </div>

              {/* Level Info */}
              <div className="text-xs text-muted-foreground terminal-text space-y-1 pt-4 border-t border-border">
                <p>Difficulty: Medium</p>
                <p>Type: Timestamp Analysis</p>
                <p>Tools Required: File Metadata</p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};