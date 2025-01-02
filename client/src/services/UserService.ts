
export interface User {
    id: number;
    firstName: string;    
    lastName: string;
    email: string;
    createdAt: string; 
}

class UserService {
    async getUser(): Promise<User> {
        const response = await fetch(`http://localhost:3001/users/get-info}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
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