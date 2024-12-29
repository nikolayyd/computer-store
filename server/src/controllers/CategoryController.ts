import { Request, Response } from 'express';
import CategoryService from '../services/CategoryService';

export interface IProduct {
    id: number;
    name: string;
    price: string;
    description?: string; 
}

export interface ICategory {
    id: number;
    name: string;
    description?: string;
}


class CategoryController {
    async getCategories(req: Request, res: Response): Promise<void> {
        try {
            const categories = await CategoryService.getCategories();
            const categoriesData: ICategory[] = categories.map(category => ({
                id: category.id,
                name: category.name,
                description: category.description,
            }));
            res.status(200).json(categoriesData);
        } catch(error) {
            res.status(500).json({error: 'Server error!' });
        }
    }
}

export default new CategoryController();