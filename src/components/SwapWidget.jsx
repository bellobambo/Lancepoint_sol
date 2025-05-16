import React, { useState } from "react";
import WormholeConnect, {
  WormholeConnectConfig,
} from "@wormhole-foundation/wormhole-connect";

const config = {
  env: "mainnet",
  networks: ["solana", "ethereum"],
  tokens: ["SOL", "ETH"],
  rpcs: {
    solana: "https://rpc.ankr.com/solana",
    ethereum: "https://rpc.ankr.com/eth",
  },
  menu: "simple",
};

const SwapModal = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <button
        onClick={() => setIsOpen(true)}
        className="px-4 py-2 bg-[#8784AD] text-black font-medium rounded-lg shadow-md transition-colors duration-200 cursor-pointer"
      >
        Wormhole Swap
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
          <div
            className="relative bg-white/95 rounded-lg shadow-2xl border-2 border-black overflow-hidden w-full max-w-md"
            style={{ height: "fit-content", maxHeight: "80vh" }}
          >
            <div className="flex items-center justify-between p-4 border-b-2 border-black">
              <h3 className="text-xl font-semibold text-gray-800">
                Cross-Chain Swap
              </h3>
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-500 hover:text-gray-700 text-2xl transition-colors cursor-pointer"
              >
                &times;
              </button>
            </div>

            <div
              className="p-4"
              style={{ height: "calc(80vh - 120px)", overflow: "hidden" }}
            >
              <WormholeConnect config={config} />
            </div>

            <div className="p-4 border-t-2 border-black text-center text-sm text-gray-500">
              Powered by{" "}
              <span className="font-medium text-purple-600">Wormhole</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SwapModal;
