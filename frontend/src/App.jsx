import { useState } from "react";
import "./App.css";

import URLForm from "./components/URLForm";
import ResultCard from "./components/ResultCard";
import StatsCard from "./components/StatsCard";
import { shortenUrl, getUrlStats, API_BASE_URL } from "./services/api";
import toast from "react-hot-toast";
import { FaLink } from "react-icons/fa";
import { motion } from "framer-motion";

function App() {
  const [url, setUrl] = useState("");
  const [customAlias, setCustomAlias] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const [statsCode, setStatsCode] = useState("");
  const [stats, setStats] = useState(null);
  const [expiryDays, setExpiryDays] = useState("");
  async function handleShorten() {
    setError("");
    setShortUrl("");

    if (!url) {
      toast.error("Please enter a URL.");
      return;
    }

    try {
      setLoading(true);
      const data = await shortenUrl(
    url,
    customAlias,
    expiryDays
);

      if (data.detail) {
        toast.error(data.detail);
        return;
      }

      setShortUrl(`${API_BASE_URL}/${data.short_code}`);

toast.success("Short URL created successfully!");
    } catch {
      toast.error("Backend server is not reachable.");
    } finally {
      setLoading(false);
    }
  }

  async function handleStats() {
    setError("");
    setStats(null);

    if (!statsCode) {
      toast.error("Please enter a short code.");
      return;
    }

    try {
      const data = await getUrlStats(statsCode);

      if (data.detail) {
        toast.error(data.detail);
        return;
      }

      toast.success("Statistics loaded!");
    } catch {
      toast.error("Backend server is not reachable.");
    }
  }

  function copyToClipboard() {
  navigator.clipboard.writeText(shortUrl);

  toast.success("Copied to clipboard!");
}

  return (
    <div className="page">
  <motion.div
    className="card"
    initial={{ opacity: 0, y: 40 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
  >
        <h1>
  <FaLink /> URL Shortener
</h1>

<p className="subtitle">
  Create secure, shareable, and trackable short links instantly.
</p>
        

        <URLForm
  url={url}
  setUrl={setUrl}
  customAlias={customAlias}
  setCustomAlias={setCustomAlias}
  expiryDays={expiryDays}
  setExpiryDays={setExpiryDays}
  loading={loading}
  onSubmit={handleShorten}
/>

        

        <ResultCard shortUrl={shortUrl} onCopy={copyToClipboard} />

        <StatsCard
          statsCode={statsCode}
          setStatsCode={setStatsCode}
          stats={stats}
          onSearch={handleStats}
        />
        <div className="features">
  <div className="feature">
    ⚡ Fast URL Shortening
  </div>

  <div className="feature">
    📊 Click Analytics
  </div>

  <div className="feature">
    📱 QR Code Sharing
  </div>

  <div className="feature">
    ⏳ Expiring Links
  </div>
</div>
        <footer>
  Built with React • FastAPI • PostgreSQL
  <br />
  <a
    href="https://github.com/SushumnaReddy"
    target="_blank"
    rel="noreferrer"
  >
    View Source on GitHub
  </a>
</footer>
      </motion.div>
    </div>
  );
}

export default App;