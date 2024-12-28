import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
  // Clear existing data
  await knex('order_items').del();
  await knex('orders').del();
  await knex('product_attributes').del();
  await knex('products').del();
  await knex('categories').del();
  await knex('departments').del();
  await knex('users').del();

  // Insert departments
  const departments = await knex('departments').insert([
    { name: 'Laptops', description: 'Portable computers for all purposes' },
    { name: 'Accessories', description: 'Gadgets and peripherals' },
  ]).returning('id');

  // Insert categories
  const categories = await knex('categories').insert([
    { name: 'Gaming Laptops', description: 'High-performance laptops for gaming', department_id: departments[0].id },
    { name: 'Business Laptops', description: 'Reliable laptops for work', department_id: departments[0].id },
    { name: 'Headphones', description: 'High-quality audio devices', department_id: departments[1].id },
    { name: 'Keyboards', description: 'Mechanical and wireless keyboards', department_id: departments[1].id },
  ]).returning('id');

  // Insert products
  const products = await knex('products').insert([
    {
      name: 'Alienware M15',
      description: 'Gaming laptop with RTX 3060',
      price: 1999.99,
      stock_quantity: 10,
      category_id: categories[0].id,
    },
    {
      name: 'ThinkPad X1 Carbon',
      description: 'Ultralight business laptop',
      price: 1499.99,
      stock_quantity: 15,
      category_id: categories[1].id,
    },
    {
      name: 'Sony WH-1000XM4',
      description: 'Noise-cancelling headphones',
      price: 349.99,
      stock_quantity: 30,
      category_id: categories[2].id,
    },
    {
      name: 'Logitech MX Keys',
      description: 'Premium wireless keyboard',
      price: 99.99,
      stock_quantity: 25,
      category_id: categories[3].id,
    },
  ]).returning('id');

  // Insert product attributes
  await knex('product_attributes').insert([
    { product_id: products[0].id, name: 'Graphics Card', value: 'RTX 3060' },
    { product_id: products[0].id, name: 'RAM', value: '16GB' },
    { product_id: products[1].id, name: 'Weight', value: '2.4 lbs' },
    { product_id: products[1].id, name: 'Battery Life', value: '18 hours' },
    { product_id: products[2].id, name: 'Battery Life', value: '30 hours' },
    { product_id: products[3].id, name: 'Connection', value: 'Bluetooth' },
  ]);

  // Insert users
  const users = await knex('users').insert([
    {
      email: 'john.doe@example.com',
      password: 'hashed_password_1', // Use a proper hashed password in production
      firstName: 'John',
      lastName: 'Doe',
    },
    {
      email: 'jane.smith@example.com',
      password: 'hashed_password_2',
      firstName: 'Jane',
      lastName: 'Smith',
    },
  ]).returning('id');

  // Insert orders
  const orders = await knex('orders').insert([
    { user_id: users[0].id, order_date: knex.fn.now(), status: 'completed', total_amount: 2399.98 },
    { user_id: users[1].id, order_date: knex.fn.now(), status: 'pending', total_amount: 99.99 },
  ]).returning('id');

  // Insert order items
  await knex('order_items').insert([
    { order_id: orders[0].id, product_id: products[0].id, quantity: 1, price: 1999.99 },
    { order_id: orders[0].id, product_id: products[2].id, quantity: 1, price: 349.99 },
    { order_id: orders[1].id, product_id: products[3].id, quantity: 1, price: 99.99 },
  ]);
}
