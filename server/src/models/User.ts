import { Model } from "objection";
import { BaseModel } from "./BaseModel"
import { Order } from "./Order";

export class User extends BaseModel {
    static readonly tableName = 'users'

    email!: string
    password!: string
    firstName!: string
    lastName!: string
    is_admin!: boolean

    orders!: Order[]


    static get relationMappings() {
        return {
            orders: {
                relation: Model.HasManyRelation,  
                modelClass: Order,                
                join: {
                    from: 'users.id',              
                    to: 'orders.user_id'           
                }
            },
        };
    }
}