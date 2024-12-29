import { UserData } from "../components/AuthForm";

const USER_KEY = 'userInfo';
export interface UserAPI {
  userId: number;
  token: string
}

class LocalStorageWorker {
  saveUser(userAPI: UserAPI, user: UserData) {
    localStorage.setItem(USER_KEY, JSON.stringify(user));
    this.setUserId(userAPI.userId);
    this.setToken(userAPI.token);
  
    window.dispatchEvent(new Event('storage'));
  }

  setUserId(userId: number) {
    localStorage.setItem("id", JSON.stringify(userId));
  }

  setToken(token: string) {
    localStorage.setItem("token", JSON.stringify(token));
  }

  getUser() {
    const storedUser = localStorage.getItem(USER_KEY);
    return storedUser ? JSON.parse(storedUser) : null;
  };

  getToken() {
    const storedToken = localStorage.getItem("token");
    return storedToken ? JSON.parse(storedToken) : null;
  }
  getUserId() {
    const storedUserId = localStorage.getItem("id");
    return storedUserId ? JSON.parse(storedUserId) : null;
  }
  removeUser() {
    localStorage.removeItem(USER_KEY);
  }
  
  removeToken() {
    localStorage.removeItem("token");
  }

  removeUserId() {
    localStorage.removeItem("id");
  }
}

const localStorageWorker = new LocalStorageWorker();
export default localStorageWorker; 