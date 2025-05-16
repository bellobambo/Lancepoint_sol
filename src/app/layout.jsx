import BaseNoAuth from "@/components/base/withoutauth";
import { Toaster } from "react-hot-toast";
import "./globals.css";
import { WalletProvider } from "@/components/SolflareProvider";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="flex min-h-screen bg-gray-50">
        <WalletProvider>
          <BaseNoAuth>{children}</BaseNoAuth>
        </WalletProvider>
        <Toaster position="top-center" reverseOrder={false} />
      </body>
    </html>
  );
}
