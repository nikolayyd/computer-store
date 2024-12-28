import { UserData } from "../components/AuthForm";
import { UserAPI } from "../utils/LocalStorage";

class AuthService {
    async signIn(email: string, password: string) : Promise<UserAPI> {
        const response = await fetch(`http://localhost:3001/auth/sign-in`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({email, password})
        });

        if (!response.ok) {
            throw new Error('Error fetching issues');
        }

        return await response.json();
    }

    async signUp(userData: UserData) : Promise<UserAPI> {
        const response = await fetch(`http://localhost:3001/auth/sign-up`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',   
            },
            body: JSON.stringify(userData)
        });

        if (!response.ok) {
            throw new Error('Error fetching issues');
        }

        return await response.json();
    }
}

const authService = new AuthService();
export default authService; 