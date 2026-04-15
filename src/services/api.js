const API_BASE = 'http://localhost:3001';

export async function fetchAllServices() {
  const response = await fetch(`${API_BASE}/services`);
  if (!response.ok) {
    throw new Error(`Failed to fetch services: ${response.status}`);
  }
  return response.json();
}

export async function fetchServiceById(id) {
  const response = await fetch(`${API_BASE}/services/${id}`);
  if (!response.ok) {
    throw new Error(`Service with id ${id} not found`);
  }
  return response.json();
}
