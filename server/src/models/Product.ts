import { Model } from 'objection';
import { Category } from './Category';
import { ProductAttribute } from './ProductAttribute'; 
import { OrderItem } from './OrderItem';  

export class Product extends Model {
  static readonly tableName = 'products';

  id!: number;
  name!: string;
  description?: string;
  price!: number;
  stock_quantity!: number;
  category_id?: number;
  created_at!: string;

  category!: Category
  attributes!: ProductAttribute[]


  static get relationMappings() {
    return {
      category: {
        relation: Model.BelongsToOneRelation,
        modelClass: Category,
        join: {
          from: 'products.category_id',
          to: 'categories.id'
        }
      },
      attributes: {
        relation: Model.HasManyRelation,
        modelClass: ProductAttribute,
        join: {
          from: 'products.id',
          to: 'product_attributes.product_id'
        }
      },
      orderItems: {
        relation: Model.HasManyRelation,
        modelClass: OrderItem,
        join: {
          from: 'products.id',
          to: 'order_items.product_id'
        }
      }
    };
  }
}
