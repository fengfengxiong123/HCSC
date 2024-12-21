import "~/styles/globals.css";
import "@suiet/wallet-kit/style.css";
import { GeistSans } from "geist/font/sans";
import { type Metadata } from "next";
import { Providers } from "~/components/providers";
import { Header } from "~/components/header";

export const metadata: Metadata = {
  title: "Health Chain Smart Cloud",
  description: "On-chain Management of Value Data",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: Readonly<RootLayoutProps>) {
  return (
    <html lang="en" className={GeistSans.variable}>
      <body>
        <Providers>
          <div className="flex min-h-screen flex-col">
            <Header />
            <main className="flex-grow">{children}</main>
          </div>
        </Providers>
      </body>
    </html>
  );
}

