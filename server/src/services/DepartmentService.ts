import { Category } from "../models/Category";
import { Department } from "../models/Department";

class CategoryService {
    async getDepartments(): Promise<Department[]> {
        try {
            return await Department.query();   
        }
        catch(err) {
            throw new Error("Error while getting catalogues/categories.");
        }
    }
    async getDepartmentById(categoryId: string): Promise<string> {
        try {
            const department = await Category.relatedQuery('department')
            .for(categoryId)
            .first();
        
        if (!department) {
            throw new Error('Department not found');
        }
        
        return department.name;
        
        }
        catch(err) {
            throw new Error('Error while getting name of category!');
        }
    }
}

export default new CategoryService();
