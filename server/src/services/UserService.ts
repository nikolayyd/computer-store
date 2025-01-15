import { User } from '../models/User';
interface UserRegistrationData {
    firstName: string;
    lastName: string;
    email: string;
    password?: string;
}

class UserService {
    async signIn(email: string, password: string): Promise<number> {      
        try {
            const user = await User.query().where('email', email).first();
            if (!user || password != user.password) {
                throw ('invalid-credentials');
            }
            return user.id;
        }
        catch(err: any) {
            if (err === 'invalid-credentials') {
                throw new Error('invalid-credentials');
            }
            throw new Error('Error while login!');
        }
    }

    async signUp(userData: UserRegistrationData): Promise<number> {
        try {
            const newUser = await User.query().insert(userData);
            return newUser.id;
        }
        catch(err: any) {
            if (err.constraint === 'users_email_unique') {
                throw new Error('Error while register!');
            }

            throw new Error('Server error!');

        }
    }

    async getUserInfo(userId: number): Promise<UserRegistrationData> {
        try {
            const user = await User.query().findById(userId);
            if (!user) {
                throw ('no-user');
            }
            const userData = {
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email
            }

            return userData;
        }
        catch (err) {
            if (err === 'no-user') {
                throw new Error('no-user');
            }
            throw new Error('Error while getting userInfo!');
        }
    }
}

export default new UserService();