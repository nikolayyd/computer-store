import type { Knex } from "knex";

export async function up(knex: Knex) {
  await knex.schema.createTable('categories', t => {
    t.increments('id').primary();
    t.string('name').notNullable();
    t.text('description').nullable(); 
    t.integer('department_id').unsigned().references('id').inTable('departments');
    t.timestamp('created_at').defaultTo(knex.fn.now());
  });
}

export async function down(knex: Knex) {
  await knex.schema.dropTableIfExists('categories');
}