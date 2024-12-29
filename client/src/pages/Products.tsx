import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import productService from "../services/ProductService";

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

    return(
        <div>
            <div className="products-grid">
                {products.map((product) => (
                    // <div onClick={() => handleProductClick(product.id)} key={product.id} className="product-card">
                    <div key={product.id} className="product-card">
                        <h3>{product.name}</h3>
                        <p>Price: ${product.price}</p>
                        <p>{product.description}</p>
                    </div>
                ))}
            </div>
            <span>It is product page!</span>
        </div>)
    ;
}

export default Products;