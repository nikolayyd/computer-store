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
}

export default new CategoryService();
