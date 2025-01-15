import {Request, Response} from 'express';
import UserService from '../services/UserService';

class UserController {
    async getUserInfo(req: Request, res: Response): Promise<void> {
            try {
                const userId = req.params.id;
                const userData = await UserService.getUserInfo(Number(userId));
                res.status(201).json(userData);
            } catch(error: any) {
                res.status(500).json({error: 'Server error' });
            }
        }
}

export default new UserController();