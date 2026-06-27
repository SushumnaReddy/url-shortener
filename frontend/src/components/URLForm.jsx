import { FaBolt } from "react-icons/fa";

function URLForm({
  url,
  setUrl,
  customAlias,
  setCustomAlias,
  expiryDays,
  setExpiryDays,
  loading,
  onSubmit,
}) {
  return (
    <>
      <input
        type="text"
        placeholder="🔗 Enter Long URL"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
      />

      <input
        type="text"
        placeholder="🏷 Custom Alias (Optional)"
        value={customAlias}
        onChange={(e) => setCustomAlias(e.target.value)}
      />

      <select
        value={expiryDays}
        onChange={(e) => setExpiryDays(e.target.value)}
      >
        <option value="">📅 Never Expires</option>
        <option value="1">1 Day</option>
        <option value="7">7 Days</option>
        <option value="30">30 Days</option>
      </select>

      <button onClick={onSubmit} disabled={loading}>
        {loading ? (
          <>
            <span className="spinner"></span>
            Shortening...
          </>
        ) : (
          <>
            <FaBolt style={{ marginRight: "8px" }} />
            Shorten URL
          </>
        )}
      </button>
    </>
  );
}

export default URLForm;