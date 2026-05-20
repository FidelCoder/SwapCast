import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { TokenPreset } from "@/lib/tokens";

type TokenCardProps = {
  token: TokenPreset;
};

export function TokenCard({ token }: TokenCardProps) {
  return (
    <Link className="token-card" href={`/token/${token.symbol.toLowerCase()}`}>
      <span
        className="token-badge"
        style={{ backgroundColor: token.background, color: token.accent }}
      >
        {token.symbol.slice(0, 4)}
      </span>
      <span>
        <p className="token-name">{token.name}</p>
        <p className="token-tagline">{token.tagline}</p>
      </span>
      <ArrowRight aria-hidden="true" size={18} />
    </Link>
  );
}

