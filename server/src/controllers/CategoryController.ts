import { Request, Response } from 'express';
import CategoryService from '../services/CategoryService';
import { verifyToken } from '../utils/jwtUtils';

class CategoryController {
    async getCatalogues(req: Request, res: Response): Promise<void> {
        try {
            // const userData = req.body;
                // res.status(400).json({ error: 'invalid-data' });
            
            // const userId = await userService.signUp(userData);

            // res.status(201).json({userId, token});
        } catch(error: any) {
            // if (error.message === 'Error while register!') {
                // res.status(400).json({error: 'already-used-email' });
            // } else {
                // res.status(500).json({error: 'Server error!' });
            // }
        }
    }
}

export default new CategoryController();