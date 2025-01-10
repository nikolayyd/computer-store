import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { IProduct } from './Products';
import productService from '../services/ProductService';
import ProductAttributeService from '../services/ProductAttributeService';
import '../styles/ProductAttribute.css';
export interface IProductAttribute {
    id: number;
    name: string;
    value: string;
}

function ProductAttributes() {
    const { id } = useParams<{ id: string }>();
    const [product,setProduct] = useState<IProduct>();
    const [attributes,setAttributes] = useState<IProductAttribute[]>();
    const fetchProduct = async () => {
        try {
            if (!id) {
                return;
            }
            const fetchProduct = await productService.getProductById(id);
            setProduct(fetchProduct);
        } catch (error) {
            console.log('Error fetching product by id');
        }
    } 

    const fetchAttributes = async () => {
        try {
            if (!id) {
                return;
            }

            const fetchAttributes = await ProductAttributeService.getAttributeByProductId(id);
            if (Array.isArray(fetchAttributes)) {
                setAttributes(fetchAttributes);
            }
            // setAttributes(fetchAttributes);
        }
        catch(error) {
            console.log('Error fetching attributes by product id');
        }
    }
    

    useEffect(() => {
        fetchProduct();
        fetchAttributes();
    },
    []);

    return (
        <div className='product-attr-container'>
          {product && (
            <div className='product-attr-card'>
              <h3 className='product-attr-title'>{product.name}</h3>
              <p className='product-attr-price'>Price: {product.price} лв.</p>
              <p className='product-attr-description'>{product.description}</p>
            </div>
          )}
          {attributes && (
            <div className='attributes-container'>
              <h4 className='attributes-title'>Attributes:</h4>
              <ul className='attributes-list'>
                {attributes.map((attr) => (
                  <li key={attr.id} className='attribute-item'>
                    <span className='attribute-name'>{attr.name}:</span>
                    <span className='attribute-value'>{attr.value}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      );
}

export default ProductAttributes;