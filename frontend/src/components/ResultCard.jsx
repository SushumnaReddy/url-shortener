import QRCode from "react-qr-code";
import { FiCopy } from "react-icons/fi";

function ResultCard({ shortUrl, onCopy }) {
  if (!shortUrl) return null;

  return (
    <div className="result">
      <h3>✅ Short URL Created</h3>

      <a href={shortUrl} target="_blank" rel="noreferrer">
        {shortUrl}
      </a>

      <button onClick={onCopy}>
        <FiCopy style={{ marginRight: "8px" }} />
        Copy URL
      </button>

      <div className="qr-box">
        <h4>📱 Scan QR Code</h4>

        <QRCode value={shortUrl} size={160} />
      </div>
    </div>
  );
}

export default ResultCard;