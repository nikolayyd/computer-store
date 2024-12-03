import type { Knex } from "knex";



export async function up(knex: Knex) {
    await knex.schema.createTable('product_attributes', t => {
      t.increments('id').primary();
      t.integer('product_id').unsigned().references('id').inTable('products').onDelete('CASCADE'); 
      t.string('name').notNullable(); 
      t.string('value').notNullable(); 
      t.timestamp('created_at').defaultTo(knex.fn.now()); 
    });
  }
  
  export async function down(knex: Knex) {
    await knex.schema.dropTableIfExists('product_attributes');
  }

