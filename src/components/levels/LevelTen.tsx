import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft, Unlock, AlertCircle, FileText, Video } from "lucide-react";
import { toast } from "sonner";

interface LevelTenProps {
  onComplete: () => void;
  onBack: () => void;
}

export const LevelTen = ({ onComplete, onBack }: LevelTenProps) => {
  const [password, setPassword] = useState("");
  const [showHint, setShowHint] = useState(false);
  const [selectedFile, setSelectedFile] = useState<string>("clue.mp4");
  const [hasTriedWrongAnswers, setHasTriedWrongAnswers] = useState(false);

  const handleSubmit = () => {
    if (password.toLowerCase() === "readme") {
      toast.success("🎉 Congratulations! You've completed the VAULT!");
      setTimeout(() => {
        // Rick Roll effect
        toast("Well well well... You actually made it! 🎵", {
          description: "You've been... educated! 😄",
          duration: 5000,
        });
      }, 2000);
      onComplete();
    } else {
      setHasTriedWrongAnswers(true);
      toast.error("Incorrect password. The truth has been with you all along...");
    }
  };

  const files = {
    "clue.mp4": {
      type: "video",
      content: `🎬 Video File (0:30)
      
[Black screen with synthesized voice]

"You don't need to decode anything. 
You've already seen it — you just didn't read it.

The final answer lies in the last place you'd look:
Exactly where you were told the least.

Sometimes the truth isn't in the message… 
it IS the message."`
    },

    "password.docx": {
      type: "document", 
      content: `THE ULTIMATE CIPHER OF ETERNAL MYSTERIES

"In the beginning was the Word, and the Word was with God, and the Word was God."

THE SACRED GEOMETRY OF HIDDEN TRUTHS REVEALS ITSELF TO THOSE WHO SEEK WITH PURE INTENTION AND UNWAVERING DETERMINATION THROUGH THE LABYRINTHINE PATHWAYS OF DIGITAL CONSCIOUSNESS WHERE BINARY DREAMS MEET QUANTUM REALITIES IN AN ENDLESS DANCE OF ZEROS AND ONES THAT WHISPER ANCIENT SECRETS...

[Document continues with philosophical gibberish for pages...]`
    },

    "data.csv": {
      type: "data",
      content: `ID,LAT,LONG,TIMESTAMP,VALUE
001,40.7128,-74.0060,1642680000,42.7
002,34.0522,-118.2437,1642683600,38.9
003,41.8781,-87.6298,1642687200,35.2
004,29.7604,-95.3698,1642690800,41.1
005,39.9526,-75.1652,1642694400,37.8

[Continues with hundreds of random GPS coordinates and values...]`
    },

    "readme.txt": {
      type: "text",
      content: `The final answer lies in the last place you'd look:
Exactly where you were told the least.

Sometimes the truth isn't in the message… it *is* the message.

You've been looking at files, analyzing content, decoding puzzles...
But what if the answer was never IN the files?
What if it WAS the file?

The truth you seek is not hidden within...
It's written on the outside.`
    }
  };

  const getFileIcon = (filename: string) => {
    if (filename.includes('.mp4')) return <Video className="w-4 h-4" />;
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
                Level 10: The Final Truth
              </h1>
              <p className="text-muted-foreground terminal-text">
                Everything you need has been with you all along.
              </p>
            </div>
          </div>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* File Explorer */}
          <Card className="cyber-border p-6">
            <div className="flex items-center gap-2 mb-4">
              <Unlock className="w-5 h-5 text-accent" />
              <h3 className="font-bold terminal-text text-accent">10_this_will_be_not_easy.txt</h3>
            </div>
            
            <div className="space-y-4">
              <div className="p-4 rounded border border-primary/30 bg-primary/10">
                <p className="terminal-text text-primary text-sm text-center">
                  "The answer is exactly where you were told the least."
                </p>
              </div>

              {/* File List */}
              <div className="space-y-2">
                {Object.keys(files).map((filename) => (
                  <Button
                    key={filename}
                    variant={selectedFile === filename ? "default" : "outline"}
                    onClick={() => setSelectedFile(filename)}
                    className="w-full justify-start text-left"
                  >
                    {getFileIcon(filename)}
                    <span className="ml-2">{filename}</span>
                  </Button>
                ))}
              </div>

              {/* File Content */}
              <div className="p-4 rounded border border-border bg-input max-h-80 overflow-y-auto">
                <div className="text-sm font-bold terminal-text mb-2 flex items-center gap-2">
                  {getFileIcon(selectedFile)}
                  {selectedFile}
                </div>
                <div className="text-sm terminal-text text-foreground whitespace-pre-line">
                  {selectedFile === "clue.mp4" && (
                    <div className="w-full h-32 bg-black rounded flex items-center justify-center mb-4">
                      <div className="text-white text-xs">▶ Video Player (Click to play)</div>
                    </div>
                  )}
                  {files[selectedFile as keyof typeof files].content}
                </div>
              </div>

              {/* Archive Info */}
              <div className="p-3 rounded border border-accent/30 bg-accent/10">
                <p className="text-xs terminal-text text-accent">
                  📁 Source Archive: <span className="font-bold">readme.zip</span> • Extracted: 4 files
                </p>
              </div>
            </div>
          </Card>

          {/* Password Input */}
          <Card className="cyber-border vault-glow p-6">
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-bold terminal-text text-primary mb-2">
                  The Final Password
                </h3>
                <p className="text-sm text-muted-foreground terminal-text">
                  You've analyzed all the files. You've heard the final clue. 
                  The answer has been with you from the very beginning.
                </p>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="text-sm terminal-text text-muted-foreground">
                    Final Password
                  </label>
                  <Input
                    type="text"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="What is the source?"
                    className="mt-1 bg-input border-border terminal-text"
                    onKeyPress={(e) => e.key === 'Enter' && handleSubmit()}
                  />
                </div>

                <Button 
                  onClick={handleSubmit}
                  className="w-full bg-primary hover:bg-primary/80 text-primary-foreground vault-glow"
                >
                  Submit Final Answer
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
                      💡 The clue says "the truth isn't IN the message, it IS the message."
                      You've been looking inside files for answers, but what if the answer
                      is the name of the source itself? Check where these files came from...
                    </p>
                  </div>
                )}
              </div>

              {/* Wrong Answer Guidance */}
              {hasTriedWrongAnswers && (
                <div className="p-3 rounded border border-destructive/30 bg-destructive/10">
                  <p className="text-xs terminal-text text-destructive">
                    🚨 Think simpler. You're overthinking this. 
                    The video says "you've already seen it" - what did you see when you first got these files?
                    What was the name of the archive that contained everything?
                  </p>
                </div>
              )}

              {/* Level Info */}
              <div className="text-xs text-muted-foreground terminal-text space-y-1 pt-4 border-t border-border">
                <p>Difficulty: Expert</p>
                <p>Type: Meta-puzzle</p>
                <p>Tools Required: Outside-the-box Thinking</p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};