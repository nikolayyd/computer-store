import { Model } from 'objection';
import { Order } from './Order';
import { Product } from './Product';

export class OrderItem extends Model {
  static readonly tableName = 'order_items';

  id!: number;
  order_id!: number;
  product_id!: number;
  quantity!: number;
  price!: number;
  created_at!: string;

  static get relationMappings() {
    return {
      order: {
        relation: Model.BelongsToOneRelation,
        modelClass: Order,
        join: {
          from: 'order_items.order_id',
          to: 'orders.id'
        }
      },
      product: {
        relation: Model.BelongsToOneRelation,
        modelClass: Product,
        join: {
          from: 'order_items.product_id',
          to: 'products.id'
        }
      }
    };
  }
}
