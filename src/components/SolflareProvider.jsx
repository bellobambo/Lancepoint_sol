"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import Solflare from "@solflare-wallet/sdk";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { Connection, clusterApiUrl } from "@solana/web3.js";

const WalletContext = createContext(null);

export const WalletProvider = ({ children }) => {
  const [wallet, setWallet] = useState(null);
  const [publicKey, setPublicKey] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [balance, setBalance] = useState(null);

  const router = useRouter();

  const connection = new Connection(clusterApiUrl("devnet"));

  useEffect(() => {
    const solflare = new Solflare();

    const fetchBalance = async () => {
      try {
        const lamports = await connection.getBalance(solflare.publicKey);
        const sol = lamports / 1e9;
        setBalance(sol);
        console.log("Wallet balance:", sol, "SOL");
      } catch (err) {
        console.error("Error fetching balance:", err);
        toast.error("Error fetching wallet balance.");
      }
    };

    const handleConnect = () => {
      const pubKey = solflare.publicKey?.toString() || null;

      console.log("Connected to wallet:", solflare);

      setIsConnected(true);
      setPublicKey(pubKey);
      setIsLoading(false);

      localStorage.setItem("fullAddress", pubKey || "");
      localStorage.setItem(
        "shortWalletAddress",
        pubKey ? pubKey.slice(0, 10) : ""
      );

      fetchBalance(pubKey);
      toast.success("Wallet connected successfully!");
    };

    const handleDisconnect = () => {
      setIsConnected(false);
      setPublicKey(null);
      setBalance(null);

      localStorage.removeItem("fullAddress");
      localStorage.removeItem("shortWalletAddress");
      router.push("/");
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
  }, []);

  const connectWallet = async () => {
    if (!wallet || isLoading) return;
    try {
      setIsLoading(true);
      await wallet.connect();
      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
      toast.error(`Connection failed: ${err.message}`);
    }
  };

  const disconnectWallet = async () => {
    if (!wallet) return;
    try {
      await wallet.disconnect();
    } catch (err) {
      toast.error(`Disconnection failed: ${err.message}`);
    }
  };

  return (
    <WalletContext.Provider
      value={{
        wallet,
        publicKey,
        isConnected,
        isLoading,
        balance,
        connectWallet,
        disconnectWallet,
      }}
    >
      {children}
    </WalletContext.Provider>
  );
};

export const useWallet = () => useContext(WalletContext);
