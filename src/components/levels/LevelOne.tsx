import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft, Eye, AlertCircle } from "lucide-react";
import { toast } from "sonner";

interface LevelOneProps {
  onComplete: () => void;
  onBack: () => void;
}

export const LevelOne = ({ onComplete, onBack }: LevelOneProps) => {
  const [password, setPassword] = useState("");
  const [showHint, setShowHint] = useState(false);

  const handleSubmit = () => {
    if (password.toLowerCase() === "shadow") {
      toast.success("Correct! Level 1 completed!");
      onComplete();
    } else {
      toast.error("Incorrect password. Look more carefully...");
    }
  };

  // Create the hidden content with the password buried in empty lines
  const hiddenContent = Array.from({ length: 500 }, (_, i) => {
    if (i === 247) {
      return (
        <div key={i} className="text-[6px] opacity-30 text-primary font-mono">
          SHADOW
        </div>
      );
    }
    return <div key={i} className="h-1"></div>;
  });

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
                Level 1: Hidden in Plain Sight
              </h1>
              <p className="text-muted-foreground terminal-text">
                Sometimes the answer is where you least expect it...
              </p>
            </div>
          </div>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* File Content */}
          <Card className="cyber-border p-6">
            <div className="flex items-center gap-2 mb-4">
              <Eye className="w-5 h-5 text-accent" />
              <h3 className="font-bold terminal-text text-accent">01_intro.txt</h3>
            </div>
            
            <div 
              className="bg-input rounded p-4 h-96 overflow-y-auto text-xs font-mono border border-border"
              style={{ fontFamily: 'Courier New, monospace' }}
            >
              {hiddenContent}
            </div>
            
            <div className="mt-4 p-3 rounded border border-accent/30 bg-accent/10">
              <p className="text-xs terminal-text text-accent">
                File Info: 500+ lines • Created: 2024-01-15 • Modified: 2024-01-15
              </p>
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
                  Find the password hidden in the file content.
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
                      💡 This file has 500+ empty lines, but something is hidden among them. 
                      Try scrolling through the entire file content carefully. 
                      The password might be in very small text...
                    </p>
                  </div>
                )}
              </div>

              {/* Level Info */}
              <div className="text-xs text-muted-foreground terminal-text space-y-1 pt-4 border-t border-border">
                <p>Difficulty: Easy</p>
                <p>Type: Hidden Content</p>
                <p>Tools Required: Keen Eyes</p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};