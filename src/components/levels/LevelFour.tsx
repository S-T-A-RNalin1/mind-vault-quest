import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft, Zap, AlertCircle } from "lucide-react";
import { toast } from "sonner";

interface LevelFourProps {
  onComplete: () => void;
  onBack: () => void;
}

export const LevelFour = ({ onComplete, onBack }: LevelFourProps) => {
  const [password, setPassword] = useState("");
  const [showHint, setShowHint] = useState(false);

  const handleSubmit = () => {
    if (password.toLowerCase() === "shadow") {
      toast.success("Correct! Level 4 completed!");
      onComplete();
    } else {
      toast.error("Incorrect password. Think about the riddle...");
    }
  };

  const grid = [
    ['A', 'S', 'H', 'A', 'D', 'O', 'W'],
    ['T', 'H', 'O', 'R', 'N', 'S', 'T'],
    ['S', 'K', 'Y', 'R', 'E', 'I', 'N'],
    ['L', 'I', 'G', 'H', 'T', 'E', 'N'],
    ['M', 'I', 'R', 'R', 'O', 'R', 'S'],
    ['F', 'R', 'O', 'S', 'T', 'Y', 'X'],
    ['P', 'A', 'S', 'S', 'W', 'O', 'R']
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
                Level 4: The Grid
              </h1>
              <p className="text-muted-foreground terminal-text">
                Words hide in shadows and light.
              </p>
            </div>
          </div>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Riddle and Grid */}
          <Card className="cyber-border p-6">
            <div className="flex items-center gap-2 mb-4">
              <Zap className="w-5 h-5 text-accent" />
              <h3 className="font-bold terminal-text text-accent">04_codegrid.txt</h3>
            </div>
            
            <div className="space-y-6">
              {/* Riddle */}
              <div className="p-4 rounded border border-primary/30 bg-primary/10">
                <p className="terminal-text text-primary text-center italic">
                  "I dance but cast no step.<br/>
                  I move but leave no trail.<br/>
                  I vanish when the lights arrive.<br/>
                  What am I?"
                </p>
              </div>

              {/* Letter Grid */}
              <div className="flex justify-center">
                <div className="grid grid-cols-7 gap-1 p-4 bg-input rounded border border-border">
                  {grid.map((row, rowIndex) => 
                    row.map((letter, colIndex) => (
                      <div
                        key={`${rowIndex}-${colIndex}`}
                        className={`w-8 h-8 flex items-center justify-center border border-border bg-background terminal-text font-mono text-sm
                          ${rowIndex === 0 ? 'text-primary font-bold' : 'text-muted-foreground'}
                        `}
                      >
                        {letter}
                      </div>
                    ))
                  )}
                </div>
              </div>

              <div className="text-xs text-muted-foreground terminal-text text-center">
                7x7 Character Grid • Look for patterns in the arrangement
              </div>
            </div>
          </Card>

          {/* Password Input */}
          <Card className="cyber-border vault-glow p-6">
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-bold terminal-text text-primary mb-2">
                  Solve the Riddle
                </h3>
                <p className="text-sm text-muted-foreground terminal-text">
                  The answer to the riddle is hidden in the grid above.
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
                    placeholder="What am I?"
                    className="mt-1 bg-input border-border terminal-text"
                    onKeyPress={(e) => e.key === 'Enter' && handleSubmit()}
                  />
                </div>

                <Button 
                  onClick={handleSubmit}
                  className="w-full bg-primary hover:bg-primary/80 text-primary-foreground vault-glow"
                >
                  Submit Answer
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
                      💡 Think about what dances without steps, moves without trails, and disappears when light comes. 
                      The answer might be right there in the first row of the grid...
                    </p>
                  </div>
                )}
              </div>

              {/* Level Info */}
              <div className="text-xs text-muted-foreground terminal-text space-y-1 pt-4 border-t border-border">
                <p>Difficulty: Medium</p>
                <p>Type: Word Grid + Riddle</p>
                <p>Tools Required: Pattern Recognition</p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};