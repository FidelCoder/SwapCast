import { ArrowDownUp } from "lucide-react";

export function SwapVisual() {
  return (
    <div className="swap-visual" aria-hidden="true">
      <div className="swap-visual-inner">
        <div className="asset-lane">
          <span
            className="asset-dot"
            style={{
              background:
                "linear-gradient(135deg, #1f8fff 0%, #37d6b3 100%)"
            }}
          >
            TON
          </span>
          <span>
            <p className="asset-label">Discover</p>
            <p className="asset-symbol">TON assets</p>
          </span>
        </div>
        <div className="route-line">
          <ArrowDownUp size={18} />
          <span>STON.fi Omniston</span>
        </div>
        <div className="asset-lane">
          <span
            className="asset-dot"
            style={{
              background:
                "linear-gradient(135deg, #ff6f61 0%, #1f8fff 100%)"
            }}
          >
            FAR
          </span>
          <span>
            <p className="asset-label">Share</p>
            <p className="asset-symbol">Back to Farcaster</p>
          </span>
        </div>
      </div>
    </div>
  );
}

