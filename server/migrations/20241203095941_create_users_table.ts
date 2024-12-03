import type { Knex } from "knex";

export async function up(knex: Knex) {
    await knex.schema.createTable('users', t => {
      t.increments('id').primary();
      t.string('email').notNullable().unique();
      t.string('password').notNullable(); 
      t.string('firstName').notNullable();
      t.string('lastName').notNullable(); 
      t.boolean('is_admin').defaultTo(false); 
      t.timestamp('created_at').defaultTo(knex.fn.now()); 
    });
  }
  
  export async function down(knex: Knex) {
    await knex.schema.dropTableIfExists('users');
  }