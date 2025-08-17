import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Lock, Unlock, Eye, FileText, Volume2, Image, Clock, Zap } from "lucide-react";
import { LevelOne } from "./levels/LevelOne";
import { LevelTwo } from "./levels/LevelTwo";
import { LevelThree } from "./levels/LevelThree";
import { LevelFour } from "./levels/LevelFour";
import { LevelFive } from "./levels/LevelFive";
import { LevelSix } from "./levels/LevelSix";
import { LevelSeven } from "./levels/LevelSeven";
import { LevelEight } from "./levels/LevelEight";
import { LevelNine } from "./levels/LevelNine";
import { LevelTen } from "./levels/LevelTen";

interface Level {
  id: number;
  title: string;
  description: string;
  icon: any;
  completed: boolean;
  unlocked: boolean;
  difficulty: "Easy" | "Medium" | "Hard" | "Expert";
}

export const VaultDashboard = () => {
  const [currentLevel, setCurrentLevel] = useState<number | null>(null);
  const [levels, setLevels] = useState<Level[]>([
    {
      id: 1,
      title: "Hidden in Plain Sight",
      description: "Sometimes the answer is where you least expect it...",
      icon: Eye,
      completed: false,
      unlocked: true,
      difficulty: "Easy"
    },
    {
      id: 2,
      title: "Beyond the Surface",
      description: "Not everything is what it appears to be.",
      icon: FileText,
      completed: false,
      unlocked: false,
      difficulty: "Easy"
    },
    {
      id: 3,
      title: "Logic Gates",
      description: "Truth and lies intertwined in statements.",
      icon: Zap,
      completed: false,
      unlocked: false,
      difficulty: "Medium"
    },
    {
      id: 4,
      title: "The Grid",
      description: "Words hide in shadows and light.",
      icon: Lock,
      completed: false,
      unlocked: false,
      difficulty: "Medium"
    },
    {
      id: 5,
      title: "Time Traveler",
      description: "When files were born tells a story.",
      icon: Clock,
      completed: false,
      unlocked: false,
      difficulty: "Medium"
    },
    {
      id: 6,
      title: "Background Check",
      description: "You've been looking at me this whole time.",
      icon: Image,
      completed: false,
      unlocked: false,
      difficulty: "Hard"
    },
    {
      id: 7,
      title: "Needle in Haystack",
      description: "100 files, but only one matters.",
      icon: FileText,
      completed: false,
      unlocked: false,
      difficulty: "Hard"
    },
    {
      id: 8,
      title: "Reverse Psychology",
      description: "Sometimes you need to go backwards to move forward.",
      icon: Volume2,
      completed: false,
      unlocked: false,
      difficulty: "Hard"
    },
    {
      id: 9,
      title: "Ignore the Obvious",
      description: "The answer is in the last place you'd look.",
      icon: Eye,
      completed: false,
      unlocked: false,
      difficulty: "Expert"
    },
    {
      id: 10,
      title: "The Final Truth",
      description: "Everything you need has been with you all along.",
      icon: Unlock,
      completed: false,
      unlocked: false,
      difficulty: "Expert"
    }
  ]);

  const handleLevelComplete = (levelId: number) => {
    setLevels(prev => prev.map(level => {
      if (level.id === levelId) {
        return { ...level, completed: true };
      }
      if (level.id === levelId + 1) {
        return { ...level, unlocked: true };
      }
      return level;
    }));
    setCurrentLevel(null);
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Easy": return "bg-primary/20 text-primary";
      case "Medium": return "bg-accent/20 text-accent";
      case "Hard": return "bg-destructive/20 text-destructive";
      case "Expert": return "bg-secondary/20 text-secondary";
      default: return "bg-muted/20 text-muted-foreground";
    }
  };

  const completedLevels = levels.filter(level => level.completed).length;
  const progressPercentage = (completedLevels / levels.length) * 100;

  if (currentLevel !== null) {
    const level = levels.find(l => l.id === currentLevel);
    if (!level) return null;

    switch (currentLevel) {
      case 1:
        return <LevelOne onComplete={() => handleLevelComplete(1)} onBack={() => setCurrentLevel(null)} />;
      case 2:
        return <LevelTwo onComplete={() => handleLevelComplete(2)} onBack={() => setCurrentLevel(null)} />;
      case 3:
        return <LevelThree onComplete={() => handleLevelComplete(3)} onBack={() => setCurrentLevel(null)} />;
      case 4:
        return <LevelFour onComplete={() => handleLevelComplete(4)} onBack={() => setCurrentLevel(null)} />;
      case 5:
        return <LevelFive onComplete={() => handleLevelComplete(5)} onBack={() => setCurrentLevel(null)} />;
      case 6:
        return <LevelSix onComplete={() => handleLevelComplete(6)} onBack={() => setCurrentLevel(null)} />;
      case 7:
        return <LevelSeven onComplete={() => handleLevelComplete(7)} onBack={() => setCurrentLevel(null)} />;
      case 8:
        return <LevelEight onComplete={() => handleLevelComplete(8)} onBack={() => setCurrentLevel(null)} />;
      case 9:
        return <LevelNine onComplete={() => handleLevelComplete(9)} onBack={() => setCurrentLevel(null)} />;
      case 10:
        return <LevelTen onComplete={() => handleLevelComplete(10)} onBack={() => setCurrentLevel(null)} />;
      default:
        return (
          <div className="min-h-screen flex items-center justify-center">
            <Card className="cyber-border vault-glow p-8 text-center">
              <h2 className="text-2xl font-bold terminal-text text-primary mb-4">
                Level {currentLevel} - Coming Soon
              </h2>
              <p className="text-muted-foreground mb-4">This level is still being constructed...</p>
              <button 
                onClick={() => setCurrentLevel(null)}
                className="bg-primary hover:bg-primary/80 text-primary-foreground px-4 py-2 rounded vault-glow"
              >
                Back to Dashboard
              </button>
            </Card>
          </div>
        );
    }
  }

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <Card className="cyber-border vault-glow p-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold terminal-text text-primary">
                VAULT Dashboard
              </h1>
              <p className="text-muted-foreground terminal-text">
                Progress: {completedLevels}/{levels.length} levels completed
              </p>
            </div>
            <div className="text-right space-y-2">
              <div className="text-2xl font-bold terminal-text text-accent">
                {progressPercentage.toFixed(0)}%
              </div>
              <Progress value={progressPercentage} className="w-32" />
            </div>
          </div>
        </Card>

        {/* Levels Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {levels.map((level) => {
            const IconComponent = level.icon;
            
            return (
              <Card 
                key={level.id}
                className={`cyber-border p-4 transition-all duration-300 cursor-pointer
                  ${level.completed ? 'vault-glow bg-primary/5' : ''}
                  ${level.unlocked ? 'hover:vault-glow hover:scale-105' : 'opacity-50 cursor-not-allowed'}
                `}
                onClick={() => level.unlocked && setCurrentLevel(level.id)}
              >
                <div className="space-y-3">
                  {/* Level Header */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center
                        ${level.completed ? 'bg-primary/20' : level.unlocked ? 'bg-accent/20' : 'bg-muted/20'}
                      `}>
                        {level.completed ? (
                          <Unlock className="w-4 h-4 text-primary" />
                        ) : level.unlocked ? (
                          <IconComponent className="w-4 h-4 text-accent" />
                        ) : (
                          <Lock className="w-4 h-4 text-muted-foreground" />
                        )}
                      </div>
                      <span className="font-bold terminal-text text-sm">
                        Level {level.id}
                      </span>
                    </div>
                    <Badge className={getDifficultyColor(level.difficulty)}>
                      {level.difficulty}
                    </Badge>
                  </div>

                  {/* Level Info */}
                  <div className="space-y-2">
                    <h3 className="font-semibold terminal-text text-foreground">
                      {level.title}
                    </h3>
                    <p className="text-xs text-muted-foreground terminal-text">
                      {level.description}
                    </p>
                  </div>

                  {/* Status */}
                  <div className="flex items-center gap-2">
                    {level.completed && (
                      <Badge className="bg-primary/20 text-primary text-xs">
                        Completed
                      </Badge>
                    )}
                    {!level.unlocked && (
                      <Badge className="bg-muted/20 text-muted-foreground text-xs">
                        Locked
                      </Badge>
                    )}
                    {level.unlocked && !level.completed && (
                      <Badge className="bg-accent/20 text-accent text-xs">
                        Available
                      </Badge>
                    )}
                  </div>
                </div>
              </Card>
            );
          })}
        </div>

        {/* Help Section */}
        <Card className="cyber-border p-6">
          <h3 className="text-lg font-bold terminal-text text-primary mb-4">
            Vault Guidelines
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm terminal-text text-muted-foreground">
            <div>
              <h4 className="text-foreground font-semibold mb-2">Rules:</h4>
              <ul className="space-y-1">
                <li>• Complete levels in sequence</li>
                <li>• Think outside the box</li>
                <li>• Every detail might matter</li>
                <li>• Use all your tools and knowledge</li>
              </ul>
            </div>
            <div>
              <h4 className="text-foreground font-semibold mb-2">Tips:</h4>
              <ul className="space-y-1">
                <li>• Read everything carefully</li>
                <li>• Sometimes answers are hidden in metadata</li>
                <li>• Audio puzzles may need special tools</li>
                <li>• The obvious answer might be wrong</li>
              </ul>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};