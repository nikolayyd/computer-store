import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
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
    const navigate = useNavigate();
    const fetchProducts = async () => {
        try {
            if (!id) {
                return;
            }
            const fetchProducts = await productService.getProductsFromCategory(id);
            setProducts(fetchProducts);
        } catch (error) {
            console.log("Error fetching categories");
        }
    };

    const handleAddToCart = (event: React.MouseEvent, product: IProduct) => {
        event.stopPropagation();
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
    
    const handleProductClick = (product: IProduct) => {
        navigate(`/product/${product.id}`);
    }

    useEffect(() => {
        fetchProducts();
    }, []);

    return (
        <div className="product-container">
            <div className="products-grid">
                {products.map((product) => (
                    <div onClick={() => handleProductClick(product)}className="product-card" key={product.id}>
                        <h3>{product.name}</h3>
                        <p className="price">Price: {product.price} лв.</p>
                        <p className="description">{product.description}</p>
                        <button onClick={(event) => handleAddToCart(event, product)} className="add-to-cart-btn">Add to Cart</button>
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