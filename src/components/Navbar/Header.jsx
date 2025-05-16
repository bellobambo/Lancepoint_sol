"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useWallet } from "../SolflareProvider";
import SolflareConnectButton from "../ConnectWallet";

const useIsMobile = (breakpoint = 768) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia(`(max-width: ${breakpoint}px)`);

    const handleChange = (e) => setIsMobile(e.matches);

    setIsMobile(mediaQuery.matches);

    mediaQuery.addEventListener("change", handleChange);

    return () => mediaQuery.removeEventListener("change", handleChange);
  }, [breakpoint]);

  return isMobile;
};

const Header = () => {
  const router = useRouter();
  const { isConnected } = useWallet();
  const isMobile = useIsMobile();

  useEffect(() => {
    if (isConnected) {
      router.replace("/dashboard");
    }
  }, [isConnected, router]);

  // Your existing header JSX below
  return (
    <header className="py-4 px-4 sm:px-6 md:px-12 lg:px-20">
      <div className="flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center">
          <Image
            src="/icons/logo.svg"
            alt="Lancepoint Logo"
            width={32}
            height={32}
            className="h-6 w-6 sm:h-8 sm:w-8"
          />
          <a
            href="/"
            className="ml-2 plus-jakarta-sans-myf font-bold text-3xl sm:text-lg text-black"
            style={{ fontSize: "30px" }}
          >
            Lancepoint
          </a>
        </div>

        {!isMobile && <SolflareConnectButton />}

        <div className="md:hidden ml-auto">
          {/* mobile menu toggle button, etc */}
        </div>
      </div>

      {/* mobile menu if open */}
    </header>
  );
};

export default Header;
