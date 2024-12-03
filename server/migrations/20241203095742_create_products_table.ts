import type { Knex } from "knex";

export async function up(knex: Knex) {
  await knex.schema.createTable('products', t => {
    t.increments('id').primary();
    t.string('name').notNullable();
    t.text('description').nullable();
    t.decimal('price', 10, 2).notNullable();
    t.integer('stock_quantity').unsigned().notNullable(); 
    t.integer('category_id').unsigned().references('id').inTable('categories');
    t.timestamp('created_at').defaultTo(knex.fn.now()); 
  });
}

export async function down(knex: Knex) {
  await knex.schema.dropTableIfExists('products');
}