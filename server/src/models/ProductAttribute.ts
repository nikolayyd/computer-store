import { Model } from 'objection';
import { Product } from './Product'; 

export class ProductAttribute extends Model {
  static readonly tableName = 'product_attributes';

  id!: number;
  product_id!: number;
  name!: string;
  value!: string;
  created_at!: string;

  static get relationMappings() {
    return {
      product: {
        relation: Model.BelongsToOneRelation,
        modelClass: Product,
        join: {
          from: 'product_attributes.product_id',
          to: 'products.id'
        }
      }
    };
  }
}
