import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Lock, Key, Shield, AlertTriangle } from "lucide-react";

interface VaultEntryProps {
  onEnterVault: () => void;
}

export const VaultEntry = ({ onEnterVault }: VaultEntryProps) => {
  const [showAccessCode, setShowAccessCode] = useState(false);
  const [accessCode, setAccessCode] = useState("");
  const [isValidating, setIsValidating] = useState(false);

  const handleEnterVault = () => {
    if (!showAccessCode) {
      setShowAccessCode(true);
      return;
    }

    if (accessCode.toLowerCase() === "enter" || accessCode.toLowerCase() === "vault") {
      setIsValidating(true);
      setTimeout(() => {
        onEnterVault();
      }, 2000);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Matrix Rain Background Effect */}
      <div className="absolute inset-0 opacity-20">
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className="matrix-rain absolute w-px h-32 bg-gradient-to-b from-transparent via-primary to-transparent"
            style={{
              left: `${i * 5}%`,
              animationDelay: `${i * 0.2}s`,
            }}
          />
        ))}
      </div>

      <Card className="cyber-border vault-glow w-full max-w-md mx-4 p-8 text-center relative z-10">
        <div className="space-y-6">
          {/* Vault Logo */}
          <div className="relative">
            <div className="w-24 h-24 mx-auto bg-gradient-to-br from-primary/20 to-accent/20 rounded-full flex items-center justify-center vault-glow">
              <Shield className="w-12 h-12 text-primary" />
            </div>
            <div className="absolute -top-2 -right-2 w-8 h-8 bg-destructive/20 rounded-full flex items-center justify-center">
              <Lock className="w-4 h-4 text-destructive" />
            </div>
          </div>

          {/* Title */}
          <div className="space-y-2">
            <h1 className="text-4xl font-bold terminal-text text-primary glitch-text">
              VAULT
            </h1>
            <p className="text-muted-foreground terminal-text">
              10 Levels of Digital Mysteries
            </p>
          </div>

          {/* Warning */}
          <div className="flex items-center gap-2 p-3 rounded border border-destructive/30 bg-destructive/10">
            <AlertTriangle className="w-5 h-5 text-destructive" />
            <span className="text-sm terminal-text text-destructive">
              Authorized Access Only
            </span>
          </div>

          {/* Access Control */}
          <div className="space-y-4">
            {!showAccessCode ? (
              <Button 
                onClick={handleEnterVault}
                className="w-full bg-primary hover:bg-primary/80 text-primary-foreground vault-glow"
                size="lg"
              >
                <Key className="w-4 h-4 mr-2" />
                Request Access
              </Button>
            ) : (
              <div className="space-y-3">
                <div className="text-left">
                  <label className="text-sm terminal-text text-muted-foreground">
                    Access Code
                  </label>
                  <Input
                    type="password"
                    value={accessCode}
                    onChange={(e) => setAccessCode(e.target.value)}
                    placeholder="Enter access code..."
                    className="mt-1 bg-input border-border terminal-text"
                    onKeyPress={(e) => e.key === 'Enter' && handleEnterVault()}
                  />
                  <p className="text-xs text-muted-foreground mt-1 terminal-text">
                    Hint: What are you trying to do?
                  </p>
                </div>
                
                <Button 
                  onClick={handleEnterVault}
                  disabled={isValidating}
                  className="w-full bg-primary hover:bg-primary/80 text-primary-foreground vault-glow"
                  size="lg"
                >
                  {isValidating ? (
                    <>
                      <div className="w-4 h-4 mr-2 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin" />
                      Validating...
                    </>
                  ) : (
                    <>
                      <Lock className="w-4 h-4 mr-2" />
                      Enter Vault
                    </>
                  )}
                </Button>
              </div>
            )}
          </div>

          {/* Footer Info */}
          <div className="text-xs text-muted-foreground terminal-text space-y-1">
            <p>System Status: ONLINE</p>
            <p>Security Level: MAXIMUM</p>
            <p>Attempts Remaining: ∞</p>
          </div>
        </div>
      </Card>
    </div>
  );
};