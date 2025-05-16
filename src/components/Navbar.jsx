"use client";

import React, { useState, useRef, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useRouter, usePathname } from "next/navigation";
import { useWallet } from "./SolflareProvider";
import SwapWidget from "./SwapWidget";

const shortenAddress = (address) => {
  return address ? `${address.slice(0, 6)}...${address.slice(-4)}` : "";
};

const Navbar = () => {
  const {
    publicKey,
    isConnected,
    disconnectWallet,
    balance,
    connectWallet,
    isLoading,
  } = useWallet();
  const router = useRouter();
  const pathname = usePathname();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => setDropdownOpen((prev) => !prev);

  const copyToClipboard = async () => {
    try {
      if (publicKey) {
        await navigator.clipboard.writeText(publicKey);
        toast.success("Wallet address copied!");
        setDropdownOpen(false);
      }
    } catch (err) {
      toast.error("Failed to copy address.");
    }
  };

  const handleLogout = async () => {
    await disconnectWallet();
    if (pathname !== "/") {
      router.push("/");
    }
    toast.success("Logged out successfully");
    setDropdownOpen(false);
  };

  const handleConnect = async () => {
    try {
      await connectWallet();
    } catch (err) {
      // Errors handled inside connectWallet with toast
    }
  };

  // Close dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="fixed w-full top-0 right-0 bg-[#191c21] text-white shadow-md border-gray-700 p-3 z-50">
      <Toaster position="top-center" reverseOrder={false} />
      <div className="flex items-center justify-end max-w-7xl mx-auto px-4 py-4 gap-4">
        {isConnected ? (
          <div className="flex items-center gap-4">
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={toggleDropdown}
                className="cursor-pointer px-4 py-2 border-2 bg-orange-500 text-white text-sm font-medium rounded-lg hover:bg-orange-600 transition"
                aria-haspopup="true"
                aria-expanded={dropdownOpen}
              >
                {shortenAddress(publicKey)}
              </button>

              {/* <p>Balance: {balance ?? "Loading..."} SOL</p> */}

              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-[#292d32] rounded-md shadow-lg z-50 border border-gray-700">
                  <button
                    onClick={copyToClipboard}
                    className="block w-full text-left px-4 py-2 text-white hover:bg-orange-600 transition"
                  >
                    Copy Wallet Address
                  </button>
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 text-white hover:bg-red-600 transition"
                  >
                    Disconnect
                  </button>
                </div>
              )}
            </div>

            <SwapWidget />
          </div>
        ) : (
          <button
            onClick={handleConnect}
            disabled={isLoading}
            className="px-4 py-2 bg-orange-600 rounded-md text-white hover:bg-orange-700 transition disabled:opacity-50"
          >
            {isLoading ? "Connecting..." : "Connect Wallet"}
          </button>
        )}
      </div>
    </header>
  );
};

export default Navbar;
