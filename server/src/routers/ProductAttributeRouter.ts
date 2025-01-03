import { Router } from 'express';
import productAttributeController from '../controllers/ProductAttributeController';
export const productAttributeRouter = Router();

productAttributeRouter.get('/get-attribute-by-productId/:id', productAttributeController.getAttributesByProductId);
