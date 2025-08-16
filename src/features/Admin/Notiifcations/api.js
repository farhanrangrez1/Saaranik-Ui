import { apiUrl } from '../../../redux/utils/config';

export const API_BASE = `${apiUrl}/notifiction`;

export async function saveToken(token, userId = "guest") {
  await fetch(`${API_BASE}/save-token`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ token, userId }),
  });
}

export async function sendTestNotification(token = null, title, body) {
  const payload = {
    notification: { title, body },
    data: { click_action: "https://your-site.example" },
  };

  // Agar token diya ho to add karo, warna sab tokens par jayega
  if (token) {
    payload.token = token;
  }

  const res = await fetch(`${API_BASE}/send`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  return res.json();
}
