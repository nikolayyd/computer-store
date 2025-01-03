import { Request, Response } from 'express';
import ProductAttributesService from "../services/ProductAttributesService";

export interface IProductAttribute {
    id: number;
    name: string;
    value: string;
}

class ProductAttributeController {
    async getAttributesByProductId(req: Request, res: Response): Promise<void> {
        try {
            const productId = req.params.id;
            const productAttributes = await ProductAttributesService.getAttributesByProductId(productId);
            const productAttributesData: IProductAttribute[] = productAttributes.map(productAttribute => ({
                id: productAttribute.id,
                name: productAttribute.name,
                value: productAttribute.value,
            }));
            res.status(200).json(productAttributesData);

        }
        catch(error) {
            res.status(500).json({error: 'Server error!' });
        }


    }
}

export default new ProductAttributeController();