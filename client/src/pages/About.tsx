import { useEffect, useState } from 'react';
import localStorageWorker from "../utils/LocalStorageWorker";
import { Link } from "react-router-dom";
import "../styles/About.css";
import departmentService from '../services/DepartmentService';

export interface IDepartment {
    id: string;
    name: string;
    description?: string;
}

function About() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [departments, setDepartments] = useState<IDepartment[]>([]);
    const fetchDepartments = async () => {
        try {
            const fetchedDepartments = await departmentService.getDepartments();
            setDepartments(fetchedDepartments);
        } catch (error) {
            console.log("Error fetching departments");
        }
    };

    useEffect(() => {
        const user = localStorageWorker.getUser();
        fetchDepartments();
        setIsLoggedIn(!!user);
    }, []);

    return (
        <div className="department-container">
            <h1 className="department-header">Departments</h1>
            {isLoggedIn ? (
                <div className="departments-grid">
                    {departments.map((department) => (
                        <div key={department.id} className="department-card">
                            <h3>{department.name}</h3>
                            <span>{department.description}</span>
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

export default About;
