import { Model } from 'objection';
import { Department } from './Department';
import { Product } from './Product';

export class Category extends Model {
  static readonly tableName = 'categories';

  id!: number;
  name!: string;
  description?: string;
  department_id!: number;
  created_at!: string;

  products!: Product[]

  static get relationMappings() {
    return {
      department: {
        relation: Model.BelongsToOneRelation,
        modelClass: Department,
        join: {
          from: 'categories.department_id',
          to: 'departments.id'
        }
      },
      products: {
        relation: Model.HasManyRelation,
        modelClass: Product,
        join: {
          from: 'categories.id',
          to: 'products.category_id'
        }
      }
    };
  }
}
