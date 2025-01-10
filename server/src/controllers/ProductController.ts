import { Request, Response } from 'express';
import ProductService from "../services/ProductService";

export interface IProduct {
    id: number;
    name: string;
    price: number;
    description?: string;
    quantity?: number;
}

class ProductController {
    async getProductsByCategorie(req: Request, res: Response): Promise<void> {
        try {
            const categoryId = req.params.id;
            const products = await ProductService.getProductsByCategory(categoryId);
            const productsData: IProduct[] = products.map(product => ({
                id: product.id,
                name: product.name,
                price: product.price,
                description: product.description
            }));
            res.status(200).json(productsData);
        }
        catch(error) {
            res.status(500).json({error: 'Server error!' });
        }
    }

    async getProductById(req: Request, res: Response): Promise<void> {
        try {
            const productId = req.params.id;
            const product = await ProductService.getProductById(productId);
            const productData: IProduct = {
               id: product.id,
               name: product.name,
               price: product.price,
               description: product.description
            }
            res.status(200).json(productData);

        }
        catch(error) {
            res.status(500).json({error: 'Server error!' });
        }


    }
}

export default new ProductController();