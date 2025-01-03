import { Product } from "../models/Product";

class ProductService {
    async getProductsByCategory(categoryId: string): Promise<Product[]> {
        try {
            const products =  await Product.query().where('categoryId', categoryId);
            if (!products) {
                throw new Error(`Products from category ID ${categoryId} not found`);
            }

            return products;
        }
        catch(err) {
            throw new Error("Error while getting products by category.");
        }
    }

    async getProductById(productId: string): Promise<Product> {
        try {
            const product = await Product.query().where('id', productId).first();
            if (!product) {
                throw new Error(`Product with ID ${productId} not found`);
            }
            return product;
        }
        catch(err) {
            throw new Error("Error while getting product by id.");
        }
    }

}

export default new ProductService();
