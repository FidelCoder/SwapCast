"use client";

import type { ReactNode } from "react";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState
} from "react";

type EvmProvider = {
  request: (args: {
    method: string;
    params?: readonly unknown[] | object;
  }) => Promise<unknown>;
};

type WalletStatus =
  | "checking"
  | "available"
  | "connecting"
  | "connected"
  | "unavailable"
  | "error";

type FarcasterWalletState = {
  address: string | null;
  error: string | null;
  status: WalletStatus;
  connect: () => Promise<void>;
};

const FarcasterWalletContext = createContext<FarcasterWalletState | null>(null);

function firstAddress(result: unknown) {
  if (!Array.isArray(result)) {
    return null;
  }

  const address = result.find(
    (item): item is string => typeof item === "string" && item.startsWith("0x")
  );

  return address ?? null;
}

export function shortAddress(address: string) {
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
}

export function FarcasterWalletProvider({ children }: { children: ReactNode }) {
  const [provider, setProvider] = useState<EvmProvider | null>(null);
  const [address, setAddress] = useState<string | null>(null);
  const [status, setStatus] = useState<WalletStatus>("checking");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function loadWallet() {
      try {
        const { sdk } = await import("@farcaster/miniapp-sdk");
        const isInMiniApp = await sdk.isInMiniApp();

        if (!isInMiniApp) {
          if (!cancelled) {
            setStatus("unavailable");
          }

          return;
        }

        const ethereumProvider = await sdk.wallet.getEthereumProvider();

        if (!ethereumProvider) {
          if (!cancelled) {
            setStatus("unavailable");
          }

          return;
        }

        const evmProvider = ethereumProvider as EvmProvider;
        const connectedAddress = firstAddress(
          await evmProvider.request({ method: "eth_accounts" })
        );

        if (cancelled) {
          return;
        }

        setProvider(evmProvider);
        setAddress(connectedAddress);
        setStatus(connectedAddress ? "connected" : "available");
      } catch {
        if (!cancelled) {
          setStatus("error");
          setError("Farcaster wallet could not be checked.");
        }
      }
    }

    void loadWallet();

    return () => {
      cancelled = true;
    };
  }, []);

  const connect = useCallback(async () => {
    if (!provider) {
      return;
    }

    setStatus("connecting");
    setError(null);

    try {
      const connectedAddress = firstAddress(
        await provider.request({ method: "eth_requestAccounts" })
      );

      if (!connectedAddress) {
        setStatus("available");
        setError("No Farcaster wallet address was returned.");
        return;
      }

      setAddress(connectedAddress);
      setStatus("connected");
    } catch {
      setStatus("available");
      setError("Farcaster wallet connection was not completed.");
    }
  }, [provider]);

  const value = useMemo(
    () => ({
      address,
      connect,
      error,
      status
    }),
    [address, connect, error, status]
  );

  return (
    <FarcasterWalletContext.Provider value={value}>
      {children}
    </FarcasterWalletContext.Provider>
  );
}

export function useFarcasterWallet() {
  const context = useContext(FarcasterWalletContext);

  if (!context) {
    throw new Error(
      "useFarcasterWallet must be used inside FarcasterWalletProvider."
    );
  }

  return context;
}
