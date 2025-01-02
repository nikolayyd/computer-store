import { IDepartment } from "../pages/About";
import localStorageWorker from "../utils/LocalStorageWorker";

class DepartmentService {
    async getDepartments() : Promise<IDepartment[]> {
        const response = await fetch(`http://localhost:3001/departments/get-departments`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorageWorker.getToken()}`
            }
        });

        if (!response.ok) {
            throw new Error('Error fetching departments');
        }

        return await response.json();
    }
        async getDepartmentNameById(categoryId: number): Promise<string> {
        const response = await fetch(`http://localhost:3001/departments/get-department-name/${categoryId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorageWorker.getToken()}`
            },
        });

        if (!response.ok) {
            throw new Error('Error fetching department name by category id');
        }
        return await response.json();
    } 
}

const departmentService = new DepartmentService();
export default departmentService;