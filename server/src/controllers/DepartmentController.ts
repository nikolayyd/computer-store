import { Request, Response } from 'express';
import DepartmentService from '../services/DepartmentService';

export interface IDepartment {
    id: number;
    name: string;
    description?: string;
}
class ProductController {
    async getDepartments(req: Request, res: Response): Promise<void> {
        try {
            const departments = await DepartmentService.getDepartments();
            const departmentsData: IDepartment[] = departments.map(department => ({
                id: department.id,
                name: department.name,
                description: department.description,
            }));
            res.status(200).json(departmentsData);
        }
        catch(error) {
            res.status(500).json({error: 'Server error!' });
        }
    }
    async getDepartmentName(req: Request, res: Response): Promise<void> {
        try {
            const categoryId = req.params.id;
            const departmentName = await DepartmentService.getDepartmentById(categoryId);
            res.status(200).json(departmentName);
        }
        catch(error) {
            res.status(500).json({error: 'Server error while getting category name'});
        }
    }
}

export default new ProductController();