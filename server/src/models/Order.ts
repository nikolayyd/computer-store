import { Model } from 'objection';
import { User } from './User';

export class Order extends Model {
  static readonly tableName = 'orders';

  id!: number;
  user_id!: number;
  order_date!: string;
  status!: string;
  total_amount!: number;

  static get relationMappings() {
    return {
      user: {
        relation: Model.BelongsToOneRelation,
        modelClass: User,                      
        join: {
          from: 'orders.user_id',              
          to: 'users.id'                       
        }
      },
    };
  }
}
