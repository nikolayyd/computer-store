import { ProductAttribute } from '../models/ProductAttribute';

class ProductAttributesService {
        async getAttributesByProductId(productId: string): Promise<ProductAttribute[]> {
        try {
            const productAttributes = await ProductAttribute.query().where('product_id', productId);
            if (!productAttributes) {
                throw new Error(`Product with ID ${productId} not found`);
            }
            return productAttributes;
        }
        catch(err) {
            throw new Error('Error while getting product attributes by product id.');
        }
    }

}

export default new ProductAttributesService();
