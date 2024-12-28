import { UserData } from "../components/AuthForm";

const USER_KEY = 'userInfo';
export interface UserAPI {
  userId: number;
  token: string
}

export function saveUserToLocalStorage(userAPI: UserAPI, user: UserData) {
  localStorage.setItem(USER_KEY, JSON.stringify(user));
  localStorage.setItem("Id:", JSON.stringify(userAPI.userId));
  setTokenFromLocalStorage(userAPI.token);
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

export function getUserIdFromLocalStorage() {
  const storedUserId = localStorage.getItem('Id');
  return storedUserId ? JSON.parse(storedUserId) : null;
}

export function removeUserFromLocalStorage() {
  localStorage.removeItem(USER_KEY);
};

export function removeTokenFromLocalStorage() {
  localStorage.removeItem("token");
}