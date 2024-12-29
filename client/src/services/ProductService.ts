import { IProduct } from "../pages/Products";
import localStorageWorker from "../utils/LocalStorageWorker";

class ProductService {
    async getProductsFromCategory(catalogId: string) : Promise<IProduct[]> {
        const response = await fetch(`http://localhost:3001/products/get-by-category/${catalogId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorageWorker.getToken()}`
            }
        });

        if (!response.ok) {
            throw new Error('Error fetching products');
        }
        return await response.json();
    } 
}

const productService = new ProductService();
export default productService;