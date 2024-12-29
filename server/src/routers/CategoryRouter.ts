import { Router } from 'express';
import categoryController from '../controllers/CategoryController'
export const categoryRouter = Router();

categoryRouter.get('/get-categories', categoryController.getCategories);
