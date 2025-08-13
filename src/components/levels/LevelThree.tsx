import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft, Zap, AlertCircle, Users } from "lucide-react";
import { toast } from "sonner";

interface LevelThreeProps {
  onComplete: () => void;
  onBack: () => void;
}

export const LevelThree = ({ onComplete, onBack }: LevelThreeProps) => {
  const [password, setPassword] = useState("");
  const [showHint, setShowHint] = useState(false);
  const [selectedStatement, setSelectedStatement] = useState<string | null>(null);

  const handleSubmit = () => {
    if (password.toLowerCase() === "candle") {
      toast.success("Correct! You solved the logic puzzle!");
      onComplete();
    } else {
      toast.error("Incorrect password. Think logically...");
    }
  };

  const statements = [
    { person: 'A', text: 'The password is Mirror.', id: 'a' },
    { person: 'B', text: 'The password is not Mirror.', id: 'b' },
    { person: 'C', text: "It's definitely not Flame.", id: 'c' },
    { person: 'D', text: 'The password is Candle.', id: 'd' }
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
                Level 3: Logic Gates
              </h1>
              <p className="text-muted-foreground terminal-text">
                Truth and lies intertwined in statements...
              </p>
            </div>
          </div>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Logic Puzzle */}
          <Card className="cyber-border p-6">
            <div className="flex items-center gap-2 mb-4">
              <Zap className="w-5 h-5 text-accent" />
              <h3 className="font-bold terminal-text text-accent">03_statements.txt</h3>
            </div>
            
            <div className="bg-input rounded p-4 border border-border">
              <div className="text-foreground terminal-text text-sm mb-4">
                <strong>WHO'S TELLING THE TRUTH?</strong>
              </div>
              <div className="text-destructive terminal-text text-sm mb-6">
                Only ONE of the following people is telling the truth:
              </div>
              
              <div className="space-y-4">
                {statements.map((statement) => (
                  <div 
                    key={statement.id}
                    className={`p-3 rounded border cursor-pointer transition-all duration-200 ${
                      selectedStatement === statement.id 
                        ? 'border-primary bg-primary/10' 
                        : 'border-border hover:border-accent/50'
                    }`}
                    onClick={() => setSelectedStatement(statement.id)}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center">
                        <Users className="w-4 h-4 text-accent" />
                      </div>
                      <div>
                        <div className="font-bold terminal-text text-accent">
                          Person {statement.person}
                        </div>
                        <div className="text-sm terminal-text text-foreground">
                          "{statement.text}"
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Card>

          {/* Password Input */}
          <Card className="cyber-border vault-glow p-6">
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-bold terminal-text text-primary mb-2">
                  Enter Password
                </h3>
                <p className="text-sm text-muted-foreground terminal-text">
                  Figure out who's telling the truth and what the password is.
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
                    placeholder="Enter password..."
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

              {/* Logic Helper */}
              <div className="p-3 rounded border border-secondary/30 bg-secondary/10">
                <h4 className="text-sm font-bold terminal-text text-secondary mb-2">
                  Logic Analysis:
                </h4>
                <div className="text-xs terminal-text text-secondary space-y-1">
                  <p>• Only ONE person tells the truth</p>
                  <p>• All others must be lying</p>
                  <p>• Find the consistent scenario</p>
                  <p>• The truth-teller reveals the password</p>
                </div>
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
                      💡 Test each person being the truth-teller. If A tells the truth, 
                      then the password is "Mirror". But if that's true, then B is lying 
                      (which works). Check if C and D's statements are consistent...
                    </p>
                  </div>
                )}
              </div>

              {/* Level Info */}
              <div className="text-xs text-muted-foreground terminal-text space-y-1 pt-4 border-t border-border">
                <p>Difficulty: Medium</p>
                <p>Type: Logic Puzzle</p>
                <p>Tools Required: Logical Reasoning</p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};