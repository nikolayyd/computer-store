import { UserData } from '../components/AuthForm';
import { IProduct } from '../pages/Products';

const USER_KEY = 'userInfo';
export interface UserAPI {
  userId: number;
  token: string
}

class LocalStorageWorker {
  saveUser(userAPI: UserAPI, user: UserData) {
    const userData = {
      email: user.email,
    };

    localStorage.setItem(USER_KEY, JSON.stringify(userData));
    
    this.setUserId(userAPI.userId);
    this.setToken(userAPI.token);

    window.dispatchEvent(new Event('storage'));
  }

  setUserId(userId: number) {
    localStorage.setItem('id', JSON.stringify(userId));
  }

  setToken(token: string) {
    localStorage.setItem('token', JSON.stringify(token));
  }

  addProduct(product: IProduct) {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    const existingProduct = cart.find((item: IProduct) => item.id === product.id);

    if (existingProduct) {
        existingProduct.quantity = (existingProduct.quantity || 1) + 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }

    localStorage.setItem('cart', JSON.stringify(cart));
  }

  removeProduct(product: IProduct) {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    const updatedCart = cart.map((item: IProduct) => {
        if (item.id === product.id) {
            if (Number(item.quantity) > 1) {
                return { ...item, quantity: Number(item.quantity) - 1 };
            }
            return null;
        }
        return item;
    }).filter((item: IProduct | null) => item !== null);

    localStorage.setItem('cart', JSON.stringify(updatedCart));
}
  
  getUser() {
    const storedUser = localStorage.getItem(USER_KEY);
    return storedUser ? JSON.parse(storedUser) : null;
  };

  getToken() {
    const storedToken = localStorage.getItem('token');
    return storedToken ? JSON.parse(storedToken) : null;
  }
  getUserId() {
    const storedUserId = localStorage.getItem('id');
    return storedUserId ? JSON.parse(storedUserId) : null;
  }

  getProducts(): IProduct[] {
    const existingProducts = localStorage.getItem('cart');
    return existingProducts ? JSON.parse(existingProducts) : [];
  }

  removeUser() {
    localStorage.removeItem(USER_KEY);
  }
  
  removeToken() {
    localStorage.removeItem('token');
  }

  removeUserId() {
    localStorage.removeItem('id');
  }

  removeProducts() {
    localStorage.removeItem('cart');
  }
}

const localStorageWorker = new LocalStorageWorker();
export default localStorageWorker; 