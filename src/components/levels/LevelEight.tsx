import { useState, useRef } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft, Volume2, AlertCircle, Play, Pause, RotateCcw } from "lucide-react";
import { toast } from "sonner";

interface LevelEightProps {
  onComplete: () => void;
  onBack: () => void;
}

export const LevelEight = ({ onComplete, onBack }: LevelEightProps) => {
  const [password, setPassword] = useState("");
  const [showHint, setShowHint] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isReversed, setIsReversed] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const handleSubmit = () => {
    if (password.toLowerCase() === "reverse") {
      toast.success("Correct! Level 8 completed!");
      onComplete();
    } else {
      toast.error("Incorrect password. Try reversing your approach...");
    }
  };

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleReverse = () => {
    setIsReversed(!isReversed);
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      setIsPlaying(false);
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
                Level 8: Reverse Psychology
              </h1>
              <p className="text-muted-foreground terminal-text">
                Sometimes you need to go backwards to move forward.
              </p>
            </div>
          </div>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Audio Player */}
          <Card className="cyber-border p-6">
            <div className="flex items-center gap-2 mb-4">
              <Volume2 className="w-5 h-5 text-accent" />
              <h3 className="font-bold terminal-text text-accent">08_listen.txt</h3>
            </div>
            
            <div className="space-y-6">
              <div className="p-4 rounded border border-primary/30 bg-primary/10">
                <p className="terminal-text text-primary text-sm text-center">
                  "Noise has memory.<br/>
                  The past may speak more clearly than the present."
                </p>
              </div>

              {/* Audio Controls */}
              <div className="space-y-4">
                <div className="p-6 rounded border border-border bg-input">
                  <div className="flex items-center justify-center gap-4 mb-4">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={togglePlay}
                      className="border-accent/50 text-accent hover:bg-accent/10"
                    >
                      {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                    </Button>
                    
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={toggleReverse}
                      className={`border-primary/50 text-primary hover:bg-primary/10 ${
                        isReversed ? 'bg-primary/20' : ''
                      }`}
                    >
                      <RotateCcw className="w-4 h-4 mr-2" />
                      {isReversed ? 'Reversed' : 'Normal'}
                    </Button>
                  </div>

                  {/* Audio Visualization */}
                  <div className="h-16 bg-background rounded border border-border flex items-center justify-center relative overflow-hidden">
                    {isPlaying && (
                      <div className="flex items-center gap-1">
                        {Array.from({ length: 20 }).map((_, i) => (
                          <div
                            key={i}
                            className="w-1 bg-accent rounded-full animate-pulse"
                            style={{
                              height: `${Math.random() * 40 + 10}px`,
                              animationDelay: `${i * 0.1}s`,
                            }}
                          />
                        ))}
                      </div>
                    )}
                    {!isPlaying && (
                      <div className="text-muted-foreground text-sm terminal-text">
                        {isReversed ? "Audio: Reversed Mode" : "Audio: Static Noise"}
                      </div>
                    )}
                  </div>

                  {/* Hidden Audio Element */}
                  <audio
                    ref={audioRef}
                    onEnded={() => setIsPlaying(false)}
                    onPlay={() => setIsPlaying(true)}
                    onPause={() => setIsPlaying(false)}
                  >
                    {/* In a real implementation, you'd have actual audio files here */}
                    <source src={isReversed ? "/audio/reversed.mp3" : "/audio/static.mp3"} type="audio/mpeg" />
                  </audio>
                </div>

                {/* Audio Message */}
                <div className="p-3 rounded border border-accent/30 bg-accent/10">
                  <p className="text-xs terminal-text text-accent">
                    {isReversed ? (
                      <>🎵 <strong>Clear voice:</strong> "The password is REVERSE. You found the truth by going backwards."</>
                    ) : (
                      "🔇 Static noise and interference. The message is unclear."
                    )}
                  </p>
                </div>
              </div>

              <div className="text-xs text-muted-foreground terminal-text text-center">
                Audio File: 08_listen.wav • Duration: 0:15 • Quality: Distorted
              </div>
            </div>
          </Card>

          {/* Password Input */}
          <Card className="cyber-border vault-glow p-6">
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-bold terminal-text text-primary mb-2">
                  Listen Carefully
                </h3>
                <p className="text-sm text-muted-foreground terminal-text">
                  The audio contains a hidden message. You might need special tools to hear it clearly.
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
                    placeholder="What do you hear?"
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
                      💡 The audio file sounds like static when played normally. 
                      The clue mentions "the past may speak more clearly" - try reversing the audio to hear the hidden message.
                    </p>
                  </div>
                )}
              </div>

              {/* Level Info */}
              <div className="text-xs text-muted-foreground terminal-text space-y-1 pt-4 border-t border-border">
                <p>Difficulty: Hard</p>
                <p>Type: Audio Analysis</p>
                <p>Tools Required: Audio Reversal</p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};