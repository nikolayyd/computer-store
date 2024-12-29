import { Product } from "../models/Product";

class ProductService {
    async getProductsByCategory(categoryId: string): Promise<Product[]> {
        try {
            return await Product.query().where('categoryId', categoryId);
        }
        catch(err) {
            throw new Error("Error while getting products by category.");
        }
    }

}

export default new ProductService();
