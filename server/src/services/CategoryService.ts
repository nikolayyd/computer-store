import { Category } from '../models/Category';

class CategoryService {
    async getCategories(): Promise<Category[]> {
        try {
            return await Category.query();
            
        }
        catch(err) {
            throw new Error('Error while getting catalogues/categories.');
        }
    }
}

export default new CategoryService();
