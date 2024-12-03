import type { Knex } from "knex";


export async function up(knex: Knex) {
    await knex.schema.createTable('orders', t => {
      t.increments('id').primary(); 
      t.integer('user_id').unsigned().references('id').inTable('users').onDelete('CASCADE'); 
      t.timestamp('order_date').defaultTo(knex.fn.now()); 
      t.string('status').notNullable();
      t.decimal('total_amount', 10, 2).notNullable(); 
      t.timestamp('created_at').defaultTo(knex.fn.now());
    });
  }
  
  export async function down(knex: Knex) {
    await knex.schema.dropTableIfExists('orders');
  }