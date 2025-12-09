// API utility functions for frontend

const API_BASE_URL = '/api';

export async function fetchHello() {
  const response = await fetch(`${API_BASE_URL}/hello`);
  if (!response.ok) {
    throw new Error('Failed to fetch hello');
  }
  return response.json();
}

export async function fetchUsers() {
  const response = await fetch(`${API_BASE_URL}/users`);
  if (!response.ok) {
    throw new Error('Failed to fetch users');
  }
  return response.json();
}

export async function fetchUser(id: number) {
  const response = await fetch(`${API_BASE_URL}/users/${id}`);
  if (!response.ok) {
    throw new Error('Failed to fetch user');
  }
  return response.json();
}

export async function createUser(data: { name: string; email: string }) {
  const response = await fetch(`${API_BASE_URL}/users`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Failed to create user');
  }
  return response.json();
}

export async function updateUser(id: number, data: { name?: string; email?: string }) {
  const response = await fetch(`${API_BASE_URL}/users/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Failed to update user');
  }
  return response.json();
}

export async function deleteUser(id: number) {
  const response = await fetch(`${API_BASE_URL}/users/${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Failed to delete user');
  }
  return response.json();
}

export function getAvatarUrl(email: string, size: number = 200): string {
  return `${API_BASE_URL}/avatar?email=${encodeURIComponent(email)}&size=${size}`;
}

