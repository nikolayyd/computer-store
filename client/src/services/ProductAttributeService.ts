import { IProductAttribute } from '../pages/ProductAttributes';
import localStorageWorker from '../utils/LocalStorageWorker';

class ProductAttributeService {
    async getAttributeByProductId(productId: string) : Promise<IProductAttribute> {
        const response = await fetch(`http://localhost:3001/product-attribute/get-attribute-by-productId/${productId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorageWorker.getToken()}`
            }
        });

        if (!response.ok) {
            throw new Error('Error fetching product by id!');
        }
        return await response.json();
    }
}

const productAttributeService = new ProductAttributeService();
export default productAttributeService;