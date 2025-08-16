import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft, Eye, AlertCircle, FileText, Image } from "lucide-react";
import { toast } from "sonner";

interface LevelNineProps {
  onComplete: () => void;
  onBack: () => void;
}

export const LevelNine = ({ onComplete, onBack }: LevelNineProps) => {
  const [password, setPassword] = useState("");
  const [showHint, setShowHint] = useState(false);
  const [selectedFile, setSelectedFile] = useState<string>("README.txt");

  const handleSubmit = () => {
    if (password.toLowerCase() === "fine") {
      toast.success("Correct! Level 9 completed!");
      onComplete();
    } else {
      toast.error("Incorrect password. Maybe you should ignore the obvious...");
    }
  };

  const files = {
    "README.txt": `Not everything here matters.
But something does.
The password is hiding in plain sight —
You just chose not to see it.`,

    "notes.txt": `I've been searching for the answer everywhere.
Looked inside files, photos, code, even tried asking ChatGPT.
But nothing worked.

It's like it was here all along.
Maybe it was right in front of me.`,

    "hint.jpg": "[Abstract image with swirling patterns and geometric shapes]",

    "ignoreme.txt": `Nothing here. Ignore this file.


.
.
.

Are you still scrolling?




Seriously, stop.




Ok fine, here's your password: fine`
  };

  const getFileIcon = (filename: string) => {
    if (filename.includes('.jpg')) return <Image className="w-4 h-4" />;
    return <FileText className="w-4 h-4" />;
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
                Level 9: Ignore the Obvious
              </h1>
              <p className="text-muted-foreground terminal-text">
                The answer is in the last place you'd look.
              </p>
            </div>
          </div>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* File Explorer */}
          <Card className="cyber-border p-6">
            <div className="flex items-center gap-2 mb-4">
              <Eye className="w-5 h-5 text-accent" />
              <h3 className="font-bold terminal-text text-accent">09_hint.txt Directory</h3>
            </div>
            
            <div className="space-y-4">
              <div className="p-4 rounded border border-primary/30 bg-primary/10">
                <p className="terminal-text text-primary text-sm text-center">
                  "Sometimes the truth isn't in the message… it IS the message."
                </p>
              </div>

              {/* File List */}
              <div className="space-y-2">
                {Object.keys(files).map((filename) => (
                  <Button
                    key={filename}
                    variant={selectedFile === filename ? "default" : "outline"}
                    onClick={() => setSelectedFile(filename)}
                    className={`w-full justify-start text-left ${
                      filename === "ignoreme.txt" 
                        ? "opacity-50 text-muted-foreground" 
                        : ""
                    }`}
                  >
                    {getFileIcon(filename)}
                    <span className="ml-2">{filename}</span>
                    {filename === "ignoreme.txt" && (
                      <span className="ml-auto text-xs">(ignore this)</span>
                    )}
                  </Button>
                ))}
              </div>

              {/* File Content */}
              <div className="p-4 rounded border border-border bg-input max-h-64 overflow-y-auto">
                <div className="text-sm font-bold terminal-text mb-2">
                  {selectedFile}
                </div>
                <div className="text-sm terminal-text text-foreground whitespace-pre-line">
                  {selectedFile === "hint.jpg" ? (
                    <div className="w-full h-32 bg-gradient-to-br from-purple-400 via-pink-500 to-red-500 rounded flex items-center justify-center">
                      <div className="text-white text-xs opacity-70">Abstract Art Pattern</div>
                    </div>
                  ) : (
                    files[selectedFile as keyof typeof files]
                  )}
                </div>
              </div>
            </div>
          </Card>

          {/* Password Input */}
          <Card className="cyber-border vault-glow p-6">
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-bold terminal-text text-primary mb-2">
                  Don't Ignore the Ignored
                </h3>
                <p className="text-sm text-muted-foreground terminal-text">
                  Everyone tells you to ignore certain things. But what if that's exactly what you shouldn't do?
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
                    placeholder="What did you find?"
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
                      💡 There's a file that literally tells you to ignore it. 
                      But reverse psychology suggests you should do the opposite of what you're told.
                      Scroll through that "ignored" file completely...
                    </p>
                  </div>
                )}
              </div>

              {/* File Analysis */}
              <div className="space-y-2 text-xs text-muted-foreground terminal-text">
                <div className="p-3 rounded border border-border bg-input/50">
                  <div className="font-semibold mb-1">File Analysis:</div>
                  <div>README.txt: Philosophical hints</div>
                  <div>notes.txt: Search documentation</div>
                  <div>hint.jpg: Visual distraction</div>
                  <div className="text-destructive">ignoreme.txt: ⚠️ Explicitly tells you to ignore it</div>
                </div>
              </div>

              {/* Level Info */}
              <div className="text-xs text-muted-foreground terminal-text space-y-1 pt-4 border-t border-border">
                <p>Difficulty: Expert</p>
                <p>Type: Reverse Psychology</p>
                <p>Tools Required: Contrarian Thinking</p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};