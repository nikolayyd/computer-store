import { Router } from 'express';
import productController from '../controllers/ProductController';
export const productRouter = Router();

productRouter.get('/get-by-category/:id', productController.getProductsByCategorie);

