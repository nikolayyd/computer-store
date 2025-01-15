import localStorageWorker from "../utils/LocalStorageWorker";

export interface User {
    id: number;
    firstName: string;    
    lastName: string;
    email: string;
    createdAt: string; 
}

class UserService {
    async getUser(): Promise<User> {
        const response = await fetch(`http://localhost:3001/users/get-info/${localStorageWorker.getUserId()}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorageWorker.getToken()}`
            }
        });

        if (!response.ok) {
            throw new Error('Error fetching users');
        }

        return await response.json();
    }
}
const userService = new UserService();
export default userService;