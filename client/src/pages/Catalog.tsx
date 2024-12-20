export interface Product {
    id: string;
    name: string;
    price: number;
    description?: string; // Описание на продукта (по избор)
}
  
export interface Category {
    id: string;
    name: string;
    products: Product[];
}

function Catalog() {
    return(
        <div>It is catalog page</div>
    );
}

export default Catalog;