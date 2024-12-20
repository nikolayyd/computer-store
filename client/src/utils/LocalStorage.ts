const USER_KEY = 'userInfo';

export interface User {
    id: string;
    firstName: string;
    lastName: string;
}

export function saveUserToLocalStorage(user: User) {
  localStorage.setItem(USER_KEY, JSON.stringify(user));
};

export function setTokenFromLocalStorage(token: string) {
  localStorage.setItem("token", JSON.stringify(token));
}

export function getUserFromLocalStorage() {
  const storedUser = localStorage.getItem(USER_KEY);
  return storedUser ? JSON.parse(storedUser) : null;
};

export function getTokenFromLocalStorage() {
  const storedToken = localStorage.getItem("token");
  return storedToken ? JSON.parse(storedToken) : null;
}

export function removeUserFromLocalStorage() {
  localStorage.removeItem(USER_KEY);
};

export function removeTokenFromLocalStorage() {
  localStorage.removeItem("token");
}