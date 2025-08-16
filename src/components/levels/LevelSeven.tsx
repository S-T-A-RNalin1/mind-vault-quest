import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft, FileText, AlertCircle, Trash2 } from "lucide-react";
import { toast } from "sonner";

interface LevelSevenProps {
  onComplete: () => void;
  onBack: () => void;
}

export const LevelSeven = ({ onComplete, onBack }: LevelSevenProps) => {
  const [password, setPassword] = useState("");
  const [showHint, setShowHint] = useState(false);
  const [selectedFile, setSelectedFile] = useState<string | null>(null);
  const [showRecycleBin, setShowRecycleBin] = useState(false);

  const handleSubmit = () => {
    if (password.toLowerCase() === "abandoned") {
      toast.success("Correct! Level 7 completed!");
      onComplete();
    } else {
      toast.error("Incorrect password. Check the recycle bin...");
    }
  };

  // Generate 100 dummy files
  const files = Array.from({ length: 100 }, (_, i) => ({
    id: i + 1,
    name: `x${i + 1}.txt`,
    content: i % 3 === 0 ? "This file is empty" : i % 3 === 1 ? "Nope" : "/x@!!_"
  }));

  const recycleBinFile = {
    name: "deleted_clue.txt",
    content: "Vanished, but not lost.\nShadows cling to what you abandon.\n\nPassword: ABANDONED"
  };

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-6xl mx-auto space-y-6">
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
            <div className="flex-1">
              <h1 className="text-2xl font-bold terminal-text text-primary">
                Level 7: Needle in Haystack
              </h1>
              <p className="text-muted-foreground terminal-text">
                100 files, but only one matters.
              </p>
            </div>
            <Button
              variant="outline"
              onClick={() => setShowRecycleBin(!showRecycleBin)}
              className="border-destructive/50 text-destructive hover:bg-destructive/10"
            >
              <Trash2 className="w-4 h-4 mr-2" />
              Recycle Bin
            </Button>
          </div>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* File Explorer */}
          <Card className="cyber-border p-6 lg:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <FileText className="w-5 h-5 text-accent" />
              <h3 className="font-bold terminal-text text-accent">07_multiple/ Directory</h3>
            </div>
            
            <div className="space-y-4">
              <div className="p-4 rounded border border-primary/30 bg-primary/10">
                <p className="terminal-text text-primary text-sm text-center">
                  "Among the chaos, truth hides in the discarded."
                </p>
              </div>

              {/* File Grid */}
              <div className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-2 max-h-96 overflow-y-auto p-2">
                {files.map((file) => (
                  <Button
                    key={file.id}
                    variant="outline"
                    size="sm"
                    onClick={() => setSelectedFile(file.name)}
                    className={`text-xs p-2 h-auto flex flex-col items-center gap-1 ${
                      selectedFile === file.name ? 'bg-accent/20 border-accent' : ''
                    }`}
                  >
                    <FileText className="w-3 h-3" />
                    {file.name}
                  </Button>
                ))}
              </div>

              {/* File Content */}
              {selectedFile && (
                <div className="p-4 rounded border border-border bg-input">
                  <div className="text-sm font-bold terminal-text mb-2">
                    Content of {selectedFile}:
                  </div>
                  <div className="text-sm terminal-text text-muted-foreground">
                    {files.find(f => f.name === selectedFile)?.content}
                  </div>
                </div>
              )}
            </div>
          </Card>

          {/* Recycle Bin & Password Input */}
          <Card className="cyber-border vault-glow p-6">
            <div className="space-y-6">
              {showRecycleBin ? (
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <Trash2 className="w-5 h-5 text-destructive" />
                    <h3 className="font-bold terminal-text text-destructive">Recycle Bin</h3>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="p-3 rounded border border-destructive/30 bg-destructive/10">
                      <div className="flex items-center gap-2 mb-2">
                        <FileText className="w-4 h-4 text-destructive" />
                        <span className="text-sm font-bold terminal-text text-destructive">
                          {recycleBinFile.name}
                        </span>
                      </div>
                      <div className="text-xs terminal-text text-destructive whitespace-pre-line">
                        {recycleBinFile.content}
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div>
                  <h3 className="text-lg font-bold terminal-text text-primary mb-2">
                    Find the Needle
                  </h3>
                  <p className="text-sm text-muted-foreground terminal-text">
                    Search through all 100 files. The real clue might not be where you expect...
                  </p>
                </div>
              )}

              <div className="space-y-4">
                <div>
                  <label className="text-sm terminal-text text-muted-foreground">
                    Password
                  </label>
                  <Input
                    type="text"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="What was abandoned?"
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
                      💡 All 100 files contain useless information. But what about files that were deleted? 
                      Sometimes the most important things end up in the trash...
                    </p>
                  </div>
                )}
              </div>

              {/* Level Info */}
              <div className="text-xs text-muted-foreground terminal-text space-y-1 pt-4 border-t border-border">
                <p>Difficulty: Hard</p>
                <p>Type: File System Navigation</p>
                <p>Tools Required: Persistence & System Knowledge</p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};