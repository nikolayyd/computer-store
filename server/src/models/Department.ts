import { Model, RelationMappings, RelationMappingsThunk } from 'objection';
import { Category } from './Category';

export class Department extends Model {
  static readonly tableName = 'departments';

  id!: number;
  name!: string;
  description?: string;
  created_at!: string;

  categories?: Category[];

  static get relationMappings(): RelationMappings | RelationMappingsThunk {
    return {
      categories: {
        relation: Model.HasManyRelation,
        modelClass: Category,
        join: {
          from: 'departments.id',
          to: 'categories.department_id',
        },
      },
    };
  }
}
