import { MdAnalytics } from "react-icons/md";

function StatsCard({
  statsCode,
  setStatsCode,
  stats,
  onSearch,
}) {
  return (
    <div className="result">

      <h3>
        <MdAnalytics /> 📊 Analytics Dashboard
      </h3>

      <input
        type="text"
        placeholder="Enter Short Code"
        value={statsCode}
        onChange={(e) => setStatsCode(e.target.value)}
      />

      <button onClick={onSearch}>
        Get Statistics
      </button>

      {stats && (
        <div style={{ marginTop: "20px" }}>

          <p>
            <strong>Original URL:</strong>
          </p>

          <p>{stats.original_url}</p>

          <hr />

          <p>
            <strong>Short Code:</strong>
          </p>

          <p>{stats.short_code}</p>

          <hr />

          <p>
            <strong>Total Clicks:</strong>
          </p>

          <h2>{stats.clicks}</h2>

          <hr />

          <p>
            <strong>Expires:</strong>
          </p>

          <p>
            {stats.expires_at
              ? new Date(stats.expires_at).toLocaleString()
              : "Never"}
          </p>

        </div>
      )}

    </div>
  );
}

export default StatsCard;