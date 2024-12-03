import type { Knex } from "knex";

export async function up(knex: Knex) {
    await knex.schema.createTable('order_items', t => {
      t.increments('id').primary();
      t.integer('order_id').unsigned().references('id').inTable('orders').onDelete('CASCADE'); 
      t.integer('product_id').unsigned().references('id').inTable('products').onDelete('CASCADE');
      t.integer('quantity').unsigned().notNullable();
      t.decimal('price', 10, 2).notNullable(); 
      t.timestamp('created_at').defaultTo(knex.fn.now()); 
    });
  }
  
  export async function down(knex: Knex) {
    await knex.schema.dropTableIfExists('order_items');
  }
