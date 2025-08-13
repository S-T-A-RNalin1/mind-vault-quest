import { useState } from "react";
import { VaultEntry } from "@/components/VaultEntry";
import { VaultDashboard } from "@/components/VaultDashboard";

const Index = () => {
  const [hasEnteredVault, setHasEnteredVault] = useState(false);

  if (!hasEnteredVault) {
    return <VaultEntry onEnterVault={() => setHasEnteredVault(true)} />;
  }

  return <VaultDashboard />;
};

export default Index;
