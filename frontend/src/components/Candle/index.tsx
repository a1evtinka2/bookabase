import './index.css'
export function Candle() {
  return (
    <div
      className="candle-scene"
      role="img"
      aria-label="candle silhouette"
    >
      <div className="candle-flame">
        <div className="candle-flame-core" />
      </div>
      <div className="candle-wick" />
      <div className="candle-wax">
        <span className="candle-drip" />
      </div>
      <div className="candle-stem" />
      <div className="candle-holder" />
    </div>
  );
}
