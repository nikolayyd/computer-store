import type { Knex } from "knex";

export async function up(knex: Knex) {
  await knex.schema.createTable('departments', t => {
    t.increments('id').primary();
    t.string('name').notNullable(); 
    t.text('description').nullable(); 
    t.timestamp('created_at').defaultTo(knex.fn.now()); 
  });
}

export async function down(knex: Knex) {
  await knex.schema.dropTableIfExists('departments');
}