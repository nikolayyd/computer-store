import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import productService from "../services/ProductService";
import "../styles/Product.css";

export interface IProduct {
    id: string;
    name: string;
    price: number;
    description?: string; 
}

function Products() {
    const { id } = useParams<{ id: string }>(); 
    const [products, setProducts] = useState<IProduct[]>([]);
    const fetchProducts = async () => {
        try {
            const fetchProducts = await productService.getProductsFromCategory(id!);
            setProducts(fetchProducts);
        } catch (error) {
            console.log("Error fetching categories");
        }
    };
    
    useEffect(() => {
        fetchProducts();
    }, []);

    return (
        <div className="product-container">
            <div className="products-grid">
                {products.map((product) => (
                    <div key={product.id} className="product-card">
                        <h3>{product.name}</h3>
                        <p className="price">Price: {product.price} лв.</p>
                        <p className="description">{product.description}</p>
                        <button className="add-to-cart-btn">Add to Cart</button>
                    </div>
                ))}
            </div>
        </div>
    );    
}

export default Products;