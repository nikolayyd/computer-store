import { useEffect, useState } from 'react';
import localStorageWorker from '../utils/LocalStorageWorker';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/Category.css';
import categoryService from '../services/CategoryService';
import departmentService from '../services/DepartmentService';

export interface ICategory {
    id: string;
    name: string;
    description?: string;
    department?: string;
}

function Category() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [categories, setCategories] = useState<ICategory[]>([]);
    const navigate = useNavigate();
    const fetchCategories = async () => {
        try {
            const fetchedCategories = await categoryService.getCategories();
    
            const categoriesWithDepartments = await Promise.all(
                fetchedCategories.map(async (category: ICategory) => {
                    const department = await departmentService.getDepartmentNameById(Number(category.id));
                    return { ...category, department };
                })
            );
            setCategories(categoriesWithDepartments);
        } catch (error) {
            console.error('Error fetching categories or departments', error);
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
        <div className='category-container'>
            {isLoggedIn ? (
                <div className='categories-grid'>
                    {categories.map((category) => (
                        <div onClick={() => handleCategoryClick(category.id)} key={category.id} className='category-card'>
                            <h3>{category.name}</h3>
                            <p className='department'>{category.department}</p>
                            <p>{category.description}</p>
                        </div>
                    ))}
                </div>
            ) : (
                <div className='not-logged-in'>
                    <p>Please sign in/sign up!</p>
                    <Link to='/sign-in'>
                        <button className='sign-in-btn'>Sign In</button>
                    </Link>
                </div>
            )}
        </div>
    );
}

export default Category;
