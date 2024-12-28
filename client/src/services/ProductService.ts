export interface Product {

}
class ProductService {
    async getProducts(catalogId: number) : Promise<Product[]> {
        const response = await fetch(`http://:3001/catalogs/${catalogId}/get-products}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
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