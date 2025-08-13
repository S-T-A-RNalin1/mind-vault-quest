import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft, FileText, AlertCircle, Info } from "lucide-react";
import { toast } from "sonner";

interface LevelTwoProps {
  onComplete: () => void;
  onBack: () => void;
}

export const LevelTwo = ({ onComplete, onBack }: LevelTwoProps) => {
  const [password, setPassword] = useState("");
  const [showHint, setShowHint] = useState(false);
  const [showMetadata, setShowMetadata] = useState(false);

  const handleSubmit = () => {
    if (password.toLowerCase() === "metadata") {
      toast.success("Correct! You found it in the metadata!");
      onComplete();
    } else {
      toast.error("Incorrect password. Think outside the box...");
    }
  };

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
                Level 2: Beyond the Surface
              </h1>
              <p className="text-muted-foreground terminal-text">
                Not everything is what it appears to be...
              </p>
            </div>
          </div>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* File Content */}
          <Card className="cyber-border p-6">
            <div className="flex items-center gap-2 mb-4">
              <FileText className="w-5 h-5 text-accent" />
              <h3 className="font-bold terminal-text text-accent">02_OhLookAClue.txt</h3>
            </div>
            
            <div className="bg-input rounded p-4 h-64 overflow-y-auto text-sm font-mono border border-border">
              <div className="text-foreground terminal-text">
                No clue here. But are you sure this is the clue file?
              </div>
            </div>

            {/* File Properties */}
            <div className="mt-4 space-y-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowMetadata(!showMetadata)}
                className="w-full border-accent/50 text-accent hover:bg-accent/10"
              >
                <Info className="w-4 h-4 mr-2" />
                {showMetadata ? 'Hide File Properties' : 'View File Properties'}
              </Button>

              {showMetadata && (
                <div className="p-4 rounded border border-accent/30 bg-accent/10 space-y-2">
                  <div className="text-xs terminal-text text-accent space-y-1">
                    <p><strong>File Name:</strong> 02_OhLookAClue.txt</p>
                    <p><strong>Size:</strong> 54 bytes</p>
                    <p><strong>Created:</strong> 2024-01-15 14:30:22</p>
                    <p><strong>Modified:</strong> 2024-01-15 14:30:22</p>
                    <p><strong>Author:</strong> VaultMaster</p>
                    <p><strong>Comments:</strong> The password is: metadata</p>
                    <p><strong>Keywords:</strong> puzzle, hidden, vault</p>
                    <p><strong>Subject:</strong> Level 2 Challenge</p>
                  </div>
                </div>
              )}
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
                  The file says there's no clue, but are you sure?
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
                      💡 Files contain more than just their visible content. 
                      Think about what information is stored about the file itself.
                      What details does the system keep track of?
                    </p>
                  </div>
                )}
              </div>

              {/* Level Info */}
              <div className="text-xs text-muted-foreground terminal-text space-y-1 pt-4 border-t border-border">
                <p>Difficulty: Easy</p>
                <p>Type: Metadata Analysis</p>
                <p>Tools Required: File Properties</p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};