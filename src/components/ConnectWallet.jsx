"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Solflare from "@solflare-wallet/sdk";
import toast, { Toaster } from "react-hot-toast";

const SolflareConnectButton = () => {
  const router = useRouter();
  const [wallet, setWallet] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const [publicKey, setPublicKey] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isRedirecting, setIsRedirecting] = useState(false);

  useEffect(() => {
    const solflare = new Solflare();

    const handleConnect = async () => {
      const pubKey = solflare.publicKey?.toString() || null;
      console.log("Connected with publicKey:", pubKey);
      setIsConnected(true);
      setPublicKey(pubKey);
      setIsLoading(false);

      if (pubKey) {
        localStorage.setItem("fullAddress", pubKey);
        localStorage.setItem("shortWalletAddress", pubKey.slice(0, 10));
      }

      toast.success("Wallet connected successfully!");
      setIsRedirecting(true); // Start redirect loader
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Fake wait
      router.push("/dashboard");
    };

    const handleDisconnect = async () => {
      if (!wallet) return;

      try {
        console.log("Attempting to disconnect wallet...");
        await wallet.disconnect();
        localStorage.removeItem("fullAddress");
        localStorage.removeItem("shortWalletAddress");
        setIsConnected(false);
        setPublicKey(null);
        toast.error("Wallet disconnected");
      } catch (error) {
        console.error("Disconnection error:", error);
        toast.error(`Disconnection failed: ${error.message}`);
      }
    };

    setWallet(solflare);
    solflare.on("connect", handleConnect);
    solflare.on("disconnect", handleDisconnect);

    if (solflare.connected && solflare.publicKey) {
      handleConnect();
    }

    return () => {
      solflare.off("connect", handleConnect);
      solflare.off("disconnect", handleDisconnect);
    };
  }, [router]);

  const handleConnect = async () => {
    if (!wallet || isLoading) return;
    try {
      setIsLoading(true);
      toast.loading("Connecting wallet...");
      await wallet.connect();
      toast.dismiss();
    } catch (error) {
      console.error("Connection error:", error);
      setIsLoading(false);
      toast.dismiss();
      toast.error(`Connection failed: ${error.message}`);
    }
  };

  const handleDisconnect = async () => {
    if (!wallet) return;
    try {
      await wallet.disconnect(); // Triggers the onDisconnect handler
    } catch (error) {
      console.error("Disconnection error:", error);
      toast.error(`Disconnection failed: ${error.message}`);
    }
  };

  const truncatePublicKey = (pubKey) => {
    if (!pubKey) return "";
    return `${pubKey.slice(0, 4)}...${pubKey.slice(-4)}`;
  };

  const copyToClipboard = () => {
    if (!publicKey) return;
    navigator.clipboard.writeText(publicKey);
    toast.success("Wallet address copied to clipboard!");
  };

  return (
    <>
      <Toaster />
      {!isConnected ? (
        <button
          onClick={handleConnect}
          disabled={isLoading}
          className={`
            px-6 py-3 cursor-pointer rounded-lg font-bold transition-colors duration-300
            focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-opacity-50
            ${
              isLoading
                ? "bg-orange-400 text-white opacity-70 cursor-not-allowed"
                : "bg-orange-500 hover:bg-orange-600 text-white"
            }
          `}
        >
          {isLoading ? (
            <span className="flex items-center justify-center">
              <svg
                className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Connecting...
            </span>
          ) : (
            "Connect Solflare Wallet"
          )}
        </button>
      ) : (
        <div className="flex items-center space-x-4">
          <div
            onClick={copyToClipboard}
            className="cursor-pointer px-4 py-2 border-2 border-orange-500 bg-gray-100 text-black text-sm font-medium rounded-lg hover:bg-gray-200 transition"
            title="Click to copy wallet address"
          >
            {isRedirecting ? (
              <span className="flex items-center">
                <svg
                  className="animate-spin -ml-1 mr-2 h-4 w-4 text-orange-500"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Redirecting...
              </span>
            ) : (
              truncatePublicKey(publicKey)
            )}
          </div>
          <button
            onClick={handleDisconnect}
            className="px-4 py-2 bg-red-500 text-white text-sm rounded hover:bg-red-600 transition"
          >
            Disconnect
          </button>
        </div>
      )}
    </>
  );
};

export default SolflareConnectButton;
