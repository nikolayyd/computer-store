import { useEffect, useState } from 'react';
import localStorageWorker from "../utils/LocalStorageWorker";
import { Link } from "react-router-dom";
import "../styles/Category.css";

export interface IProduct {
    id: string;
    name: string;
    price: number;
    description?: string; 
}

export interface ICategory {
    id: string;
    name: string;
    products: IProduct[];
}

const mockCategories: ICategory[] = [
    { id: "1", name: "Electronics", products: [] },
    { id: "2", name: "Books", products: [] },
    { id: "3", name: "Clothing", products: [] },
    { id: "4", name: "Home Appliances", products: [] },
    { id: "5", name: "Toys", products: [] },
];

function Category() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const user = localStorageWorker.getUser();
        setIsLoggedIn(!!user);
    }, []);

    return (
        <div className="category-container">
            {isLoggedIn ? (
                <div className="categories-grid">
                    {mockCategories.map((category) => (
                        <div key={category.id} className="category-card">
                            <h3>{category.name}</h3>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="not-logged-in">
                    <p>Please sign in/sign up!</p>
                    <Link to="/sign-in">
                        <button className="sign-in-btn">Sign In</button>
                    </Link>
                </div>
            )}
        </div>
    );
}

export default Category;
