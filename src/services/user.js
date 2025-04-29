// src/services/user.js
export async function fetchUsers() {
    const res = await fetch('http://localhost:3000/api/users');
    if (!res.ok) throw new Error('Impossible de récupérer les utilisateurs');
    return await res.json();
  }
  
  