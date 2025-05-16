"use client";

import React, { useEffect } from "react";
import toast from "react-hot-toast";
import { useWallet } from "./SolflareProvider";
import { useRouter, usePathname } from "next/navigation";
import { registerWithSolAuth } from "@/actions/solAuth";

const SolflareConnectButton = () => {
  const { isConnected, isLoading, publicKey, connectWallet, disconnectWallet } =
    useWallet();
  const router = useRouter();
  const pathname = usePathname();

  const truncatePublicKey = (key) => {
    if (!key) return "";
    return `${key.slice(0, 4)}...${key.slice(-4)}`;
  };

  const copyToClipboard = () => {
    if (!publicKey) return;
    navigator.clipboard.writeText(publicKey);
    toast.success("Wallet address copied to clipboard!");
  };

  useEffect(() => {
    const handleRegistration = async () => {
      if (isConnected && publicKey) {
        try {
          const registrationResult = await registerWithSolAuth(
            publicKey.toString()
          );

          if (registrationResult?.error) {
            console.error("Registration error:", registrationResult.error);
            toast.error(registrationResult.error);
          }

          if (
            pathname === "/" &&
            registrationResult?.success &&
            !registrationResult?.isNewUser
          ) {
            router.push("/dashboard");
          }
        } catch (error) {
          console.error("Error during registration:", error);
          toast.error("Failed to register wallet");
        }
      }
    };

    handleRegistration();
  }, [isConnected, publicKey, router, pathname]);

  if (!isConnected) {
    return (
      <button
        onClick={connectWallet}
        disabled={isLoading}
        className={`px-6 py-3 cursor-pointer rounded-lg font-bold transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-opacity-50 ${
          isLoading
            ? "bg-orange-400 text-white opacity-70 cursor-not-allowed"
            : "bg-orange-500 hover:bg-orange-600 text-white"
        }`}
      >
        {isLoading ? "Connecting..." : "Connect Solflare Wallet"}
      </button>
    );
  }

  return (
    <div className="flex items-center space-x-4">
      <div
        onClick={copyToClipboard}
        className="cursor-pointer px-4 py-2 border-2 border-orange-500 bg-gray-100 text-black text-sm font-medium rounded-lg hover:bg-gray-200 transition"
        title="Click to copy wallet address"
      >
        {truncatePublicKey(publicKey?.toString())}
      </div>
      <button
        onClick={disconnectWallet}
        className="px-4 py-2 bg-red-500 border  text-white text-sm rounded transition cursor-pointer"
      >
        Dashboard
      </button>
    </div>
  );
};

export default SolflareConnectButton;
