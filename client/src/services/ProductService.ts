import localStorageWorker from "../utils/LocalStorageWorker";

export interface Product {

}
class ProductService {
    async getProducts(catalogId: number) : Promise<Product[]> {
        const response = await fetch(`http://localhost:3001/catalogs/${catalogId}/get-products}`, {
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