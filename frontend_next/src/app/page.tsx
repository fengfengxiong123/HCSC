'use client'
import Image from "next/image";
import { WalletIcon } from "lucide-react";
import { ConnectButton } from "@suiet/wallet-kit";
import { useRouter } from "next/navigation";

export default function LandingPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-[#0000FF] text-white relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-[-94px] left-[524px] w-[765px] h-[1393px]">
        <div className="absolute right-0 top-0 w-full h-full">
          <Image
            src="/img2.png"
            alt="Decorative blood vessels"
            width={765}
            height={1393}
            className="object-cover opacity-80"
          />
        </div>
      </div>

      {/* Header */}
      <header className="relative z-10 flex justify-between items-center p-6">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
            <span className="text-[#0000FF] font-bold">H</span>
          </div>
          <span className="font-bold text-xl">HCSC</span>
        </div>
        <ConnectButton
          className="bg-white text-[#0000FF] hover:bg-white/90 flex items-center justify-center"
          onConnectSuccess={() => {
            router.push("/detail"); 
          }}
        >
          <WalletIcon className="w-4 h-4 mr-2" />
          Connect Wallet
        </ConnectButton>
      </header>

      {/* Main Content */}
      <main className="relative z-10 px-6 pt-16">
        <div className="max-w-4xl">
          {/* Blood test records indicator */}
          <div className="flex items-center gap-2 mb-8">
            <div className="w-6 h-6 text-white">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M22 12h-4l-3 9L9 3l-3 9H2"
                />
              </svg>
            </div>
            <span className="text-sm">Blood test records</span>
          </div>

          {/* Main heading */}
          <h1 className="text-6xl font-bold leading-tight tracking-wider mb-8" style={{
            fontFamily: "'Space Mono', monospace",
            letterSpacing: '0.1em'
          }}>
            HEALTH CHAIN
            <br />
            SMART CLOUD
          </h1>

          {/* Subtitle */}
          <div className="flex items-center gap-4">
            <div className="w-12 h-[2px] bg-white"></div>
            <p className="text-xl">On-chain Management of Value Data</p>
          </div>
        </div>
      </main>
    </div>
  )
}

