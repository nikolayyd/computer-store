import { ICategory } from "../pages/Category";
import localStorageWorker from "../utils/LocalStorageWorker";

class CategoryService {
    async getCatalogs() : Promise<ICategory[]> {
        const response = await fetch(`http://0.0.0.0:3001/catalogs/get-catalogs}`, {
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