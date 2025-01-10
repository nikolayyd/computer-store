import { ICategory } from '../pages/Category';
import localStorageWorker from '../utils/LocalStorageWorker';

class CategoryService {
    async getCategories() : Promise<ICategory[]> {
        const response = await fetch(`http://localhost:3001/categories/get-categories`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorageWorker.getToken()}`
            }
        });

        if (!response.ok) {
            throw new Error('Error fetching catalogs');
        }

        return await response.json();
    }
}

const categoryService = new CategoryService();
export default categoryService;