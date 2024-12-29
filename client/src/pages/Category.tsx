import { useEffect, useState } from 'react';
import localStorageWorker from "../utils/LocalStorageWorker";
import { Link, useNavigate } from "react-router-dom";
import "../styles/Category.css";
import categoryService from '../services/CatagoryService';

export interface ICategory {
    id: string;
    name: string;
    description?: string;
}

function Category() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [categories, setCategories] = useState<ICategory[]>([]);
    const navigate = useNavigate();
    const fetchCategories = async () => {
        try {
            const fetchedCategories = await categoryService.getCategories();
            setCategories(fetchedCategories);
        } catch (error) {
            console.log("Error fetching categories");
        }
    };

    const handleCategoryClick = (id: string) => {
        navigate(`${id}`);
    }

    useEffect(() => {
        const user = localStorageWorker.getUser();
        fetchCategories();
        setIsLoggedIn(!!user);
    }, []);

    return (
        <div className="category-container">
            {isLoggedIn ? (
                <div className="categories-grid">
                    {categories.map((category) => (
                        <div onClick={() => handleCategoryClick(category.id)} key={category.id} className="category-card">
                            <h3>{category.name}</h3>
                            <span>{category.description}</span>
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
