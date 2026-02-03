const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000";

async function handleResponse(response) {
  const data = await response.json();
  if (!response.ok) {
    const message = data?.message || "Something went wrong";
    throw new Error(message);
  }
  return data;
}

export async function fetchOrders() {
  const response = await fetch(`${API_BASE}/api/orders`);
  return handleResponse(response);
}

export async function createOrder(payload) {
  const response = await fetch(`${API_BASE}/api/orders`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  });
  return handleResponse(response);
}

export async function assignOrder(maxDistance) {
  const response = await fetch(`${API_BASE}/api/orders/assign`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ maxDistance })
  });
  return handleResponse(response);
}
