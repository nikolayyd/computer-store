import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import productService from "../services/ProductService";
import "../styles/Product.css";
import localStorageWorker from "../utils/LocalStorageWorker";

export interface IProduct {
    id: string;
    name: string;
    price: number;
    description?: string;
    quantity?: number; 
    category?: string;
}

function Products() {
    const { id } = useParams<{ id: string }>();
    const [products, setProducts] = useState<IProduct[]>([]);
    const [messages, setMessages] = useState<{ [key: number]: string | null }>({}); 
    const fetchProducts = async () => {
        try {
            const fetchProducts = await productService.getProductsFromCategory(id!);
            setProducts(fetchProducts);
        } catch (error) {
            console.log("Error fetching categories");
        }
    };

    const handleAddToCart = (product: IProduct) => {
        localStorageWorker.addProduct(product);

        setMessages((prevMessages) => ({
            ...prevMessages,
            [product.id]: "Product was added to the cart!",
        }));

        setTimeout(() => {
            setMessages((prevMessages) => ({
                ...prevMessages,
                [product.id]: null,
            }));
        }, 3000);
    }
    
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
                        <button onClick={() => handleAddToCart(product)} className="add-to-cart-btn">Add to Cart</button>
                        {messages[Number(product.id)] && (
                            <p className="success-message">{messages[Number(product.id)]}</p>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );    
}

export default Products;