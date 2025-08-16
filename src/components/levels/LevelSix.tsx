import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { ArrowLeft, Image, AlertCircle, Sun } from "lucide-react";
import { toast } from "sonner";

interface LevelSixProps {
  onComplete: () => void;
  onBack: () => void;
}

export const LevelSix = ({ onComplete, onBack }: LevelSixProps) => {
  const [password, setPassword] = useState("");
  const [brightness, setBrightness] = useState([100]);
  const [contrast, setContrast] = useState([100]);
  const [showHint, setShowHint] = useState(false);

  const handleSubmit = () => {
    if (password.toLowerCase() === "focus") {
      toast.success("Correct! Level 6 completed!");
      onComplete();
    } else {
      toast.error("Incorrect password. Adjust the image settings...");
    }
  };

  // The password becomes visible when brightness is around 150-200 and contrast is around 200+
  const isPasswordVisible = brightness[0] > 140 && contrast[0] > 180;

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
                Level 6: Background Check
              </h1>
              <p className="text-muted-foreground terminal-text">
                You've been looking at me this whole time.
              </p>
            </div>
          </div>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Image and Controls */}
          <Card className="cyber-border p-6">
            <div className="flex items-center gap-2 mb-4">
              <Image className="w-5 h-5 text-accent" />
              <h3 className="font-bold terminal-text text-accent">06_focus.txt</h3>
            </div>
            
            <div className="space-y-6">
              <div className="p-4 rounded border border-primary/30 bg-primary/10">
                <p className="terminal-text text-primary text-sm text-center">
                  "Some answers fade into the background.<br/>
                  Adjust your vision to see what's hidden."
                </p>
              </div>

              {/* Hidden Image */}
              <div className="relative">
                <div 
                  className="w-full h-64 rounded border border-border bg-gradient-to-br from-muted/20 via-muted/40 to-muted/60 flex items-center justify-center relative overflow-hidden"
                  style={{
                    filter: `brightness(${brightness[0]}%) contrast(${contrast[0]}%)`,
                  }}
                >
                  {/* Background pattern */}
                  <div className="absolute inset-0 opacity-30">
                    <div className="w-full h-full bg-gradient-to-r from-transparent via-muted/20 to-transparent"></div>
                  </div>
                  
                  {/* Hidden text that becomes visible with right settings */}
                  <div 
                    className={`text-6xl font-bold transition-all duration-500 ${
                      isPasswordVisible 
                        ? 'text-primary opacity-80' 
                        : 'text-muted/5 opacity-10'
                    }`}
                    style={{
                      textShadow: isPasswordVisible ? '2px 2px 4px rgba(0,0,0,0.5)' : 'none',
                    }}
                  >
                    FOCUS
                  </div>
                </div>
              </div>

              {/* Image Controls */}
              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Sun className="w-4 h-4 text-muted-foreground" />
                    <label className="text-sm terminal-text text-muted-foreground">
                      Brightness: {brightness[0]}%
                    </label>
                  </div>
                  <Slider
                    value={brightness}
                    onValueChange={setBrightness}
                    min={50}
                    max={300}
                    step={10}
                    className="w-full"
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Sun className="w-4 h-4 text-muted-foreground" />
                    <label className="text-sm terminal-text text-muted-foreground">
                      Contrast: {contrast[0]}%
                    </label>
                  </div>
                  <Slider
                    value={contrast}
                    onValueChange={setContrast}
                    min={50}
                    max={300}
                    step={10}
                    className="w-full"
                  />
                </div>
              </div>
            </div>
          </Card>

          {/* Password Input */}
          <Card className="cyber-border vault-glow p-6">
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-bold terminal-text text-primary mb-2">
                  Adjust Your Vision
                </h3>
                <p className="text-sm text-muted-foreground terminal-text">
                  Sometimes the answer is right in front of you, but you need to adjust how you see it.
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
                    placeholder="What do you see?"
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
                      💡 The image contains hidden text that becomes visible when you adjust the brightness and contrast.
                      Try increasing both values until you can see what's written in the background.
                    </p>
                  </div>
                )}
              </div>

              {/* Level Info */}
              <div className="text-xs text-muted-foreground terminal-text space-y-1 pt-4 border-t border-border">
                <p>Difficulty: Hard</p>
                <p>Type: Image Manipulation</p>
                <p>Tools Required: Visual Adjustment</p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};