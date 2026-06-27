const API_BASE_URL = "http://127.0.0.1:8000";

export async function shortenUrl(
  originalUrl,
  customAlias,
  expiryDays
) {
  const response = await fetch(`${API_BASE_URL}/api/shorten`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
    original_url: originalUrl,
    custom_alias: customAlias || null,
    expiry_days: expiryDays
        ? parseInt(expiryDays)
        : null,
}),
  });

  return response.json();
}

export async function getUrlStats(shortCode) {
  const response = await fetch(`${API_BASE_URL}/api/stats/${shortCode}`);
  return response.json();
}

export { API_BASE_URL };