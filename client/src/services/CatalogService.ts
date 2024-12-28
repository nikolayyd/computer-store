export interface Catalog {

}

class CatalogService {
    async getCatalogs() : Promise<Catalog[]> {
        const response = await fetch(`http://0.0.0.0:3001/catalogs/get-catalogs}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        });

        if (!response.ok) {
            throw new Error('Error fetching catalogs');
        }

        return await response.json();
    } 
}

const catalogService = new CatalogService();
export default catalogService;