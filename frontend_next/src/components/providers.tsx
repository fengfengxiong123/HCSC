"use client";

import { WalletProvider } from "@suiet/wallet-kit";
import { SuiTestnetChain } from "@suiet/wallet-kit";

import type { Chain } from "@suiet/wallet-kit";

interface ProvidersProps {
  children: React.ReactNode;
}

const SupportedChains: Chain[] = [SuiTestnetChain];

export function Providers({ children }: ProvidersProps) {
  return <WalletProvider chains={SupportedChains}>{children}</WalletProvider>;
}
