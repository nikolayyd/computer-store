import { Router } from 'express';
import departmentController from '../controllers/DepartmentController'
export const departmentRouter = Router();

departmentRouter.get('/get-departments', departmentController.getDepartments);
departmentRouter.get('/get-department-name/:id', departmentController.getDepartmentName);
