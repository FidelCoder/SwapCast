"use client";

import { CircleCheck, LoaderCircle, Wallet } from "lucide-react";
import {
  shortAddress,
  useFarcasterWallet
} from "@/components/FarcasterWalletProvider";

export function FarcasterWalletStatus() {
  const { address, connect, error, status } = useFarcasterWallet();

  if (status === "unavailable") {
    return null;
  }

  return (
    <section className="wallet-status" aria-live="polite">
      <div className="wallet-status-copy">
        <span className="wallet-status-icon">
          {status === "connected" ? (
            <CircleCheck aria-hidden="true" size={18} />
          ) : status === "checking" || status === "connecting" ? (
            <LoaderCircle aria-hidden="true" className="spin" size={18} />
          ) : (
            <Wallet aria-hidden="true" size={18} />
          )}
        </span>
        <div>
          <p className="wallet-status-title">
            {status === "connected" && address
              ? `Farcaster wallet ${shortAddress(address)} connected`
              : "Connect Farcaster wallet"}
          </p>
          <p className="wallet-status-note">
            STON.fi still asks for a TON wallet inside the swap widget.
          </p>
          {error ? <p className="wallet-status-error">{error}</p> : null}
        </div>
      </div>

      {status === "available" || status === "connecting" ? (
        <button
          className="icon-button secondary-action wallet-status-action"
          disabled={status === "connecting"}
          onClick={() => void connect()}
        >
          <Wallet aria-hidden="true" size={17} />
          <span>{status === "connecting" ? "Connecting" : "Connect"}</span>
        </button>
      ) : null}
    </section>
  );
}
