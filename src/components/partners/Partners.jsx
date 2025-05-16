import React from "react";
import Image from "next/image";

const Partners = () => {
  return (
    <div className="py-5 sm:py-9">
      <div className="font-bold text-3xl mb-10 text-center">
        Trusted by Top Brands
      </div>
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-12 md:gap-24 place-items-center">
          {/* BASE */}

          <div className="flex items-center gap-3 grayscale hover:grayscale-0 transition duration-300">
            <div className="relative  flex items-center gap-2">
              <Image
                src="/superteam.png"
                alt="Super Team"
                width={35}
                height={35}
              />
              <span className="font-bold uppercase text-purple-600">
                {" "}
                Super Team
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3 grayscale hover:grayscale-0 transition duration-300">
            {/* Uncomment and replace src when ready */}
            <div className="relative  flex items-center gap-2">
              <Image src="/Solana1.png" width={120} height={120} alt="Solana" />
            </div>
          </div>

          {/* BASED AFRICA */}

          {/* ENB */}
          <div className="flex items-center gap-3 grayscale hover:grayscale-0 transition duration-300">
            {/* Uncomment and replace src when ready */}
            <div className="relative  flex items-center gap-2">
              <Image
                src="/wormhole.png"
                width={35}
                height={35}
                alt="Wormhole"
              />
              <span className="font-bold uppercase text-purple-600">
                {" "}
                Wormhole
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Partners;
