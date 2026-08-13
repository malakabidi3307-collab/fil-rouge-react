
const DB_KEY = "shopease-users-db";

function fakeHash(password) {
  // Simulation naive - NE JAMAIS utiliser ceci dans un vrai projet.
  return btoa(unescape(encodeURIComponent(password)));
}

export function getAllUsers() {
  const raw = localStorage.getItem(DB_KEY);
  return raw ? JSON.parse(raw) : [];
}

function saveAllUsers(users) {
  localStorage.setItem(DB_KEY, JSON.stringify(users));
}

export function findUserByEmail(email) {
  return getAllUsers().find(
    (u) => u.email.toLowerCase() === email.toLowerCase()
  );
}

export function createUser({ name, email, password }) {
  const users = getAllUsers();
  const newUser = {
    id: `user_${Date.now()}`,
    name,
    email,
    passwordHash: fakeHash(password),
  };
  saveAllUsers([...users, newUser]);
  return newUser;
}

export function verifyPassword(user, password) {
  return user.passwordHash === fakeHash(password);
}