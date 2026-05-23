"use client";

import { LoaderCircle, Wallet } from "lucide-react";
import {
  shortAddress,
  useFarcasterWallet
} from "@/components/FarcasterWalletProvider";

export function FarcasterWalletButton() {
  const { address, connect, status } = useFarcasterWallet();

  if (status === "checking") {
    return (
      <span className="wallet-chip muted">
        <LoaderCircle aria-hidden="true" className="spin" size={15} />
        <span>Wallet</span>
      </span>
    );
  }

  if (status === "connected" && address) {
    return (
      <span className="wallet-chip connected" title={address}>
        <Wallet aria-hidden="true" size={15} />
        <span>{shortAddress(address)}</span>
      </span>
    );
  }

  if (status === "available" || status === "connecting") {
    return (
      <button
        className="wallet-chip action"
        disabled={status === "connecting"}
        onClick={() => void connect()}
        title="Connect Farcaster wallet"
      >
        {status === "connecting" ? (
          <LoaderCircle aria-hidden="true" className="spin" size={15} />
        ) : (
          <Wallet aria-hidden="true" size={15} />
        )}
        <span>{status === "connecting" ? "Connecting" : "Connect"}</span>
      </button>
    );
  }

  return null;
}
