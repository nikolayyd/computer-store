import { Knex } from 'knex';

export async function seed(knex: Knex): Promise<void> {
  // Clear existing data
  await knex('order_items').del();
  await knex('orders').del();
  await knex('product_attributes').del();
  await knex('products').del();
  await knex('categories').del();
  await knex('departments').del();
  await knex('users').del();

  // Insert departments (same as before)
  const departments = await knex('departments').insert([
    { name: 'Laptops', description: 'Portable computers for all purposes' },
    { name: 'Accessories', description: 'Gadgets and peripherals' },
  ]).returning('id');

  // Insert categories (same as before)
  const categories = await knex('categories').insert([
    { name: 'Gaming Laptops', description: 'High-performance laptops for gaming', department_id: departments[0].id },
    { name: 'Business Laptops', description: 'Reliable laptops for work', department_id: departments[0].id },
    { name: 'Headphones', description: 'High-quality audio devices', department_id: departments[1].id },
    { name: 'Keyboards', description: 'Mechanical and wireless keyboards', department_id: departments[1].id },
  ]).returning('id');

  // Insert products (add at least 5 products per category)
  const products = await knex('products').insert([
    // Gaming Laptops
    {
      name: 'Alienware M15',
      description: 'Gaming laptop with RTX 3060',
      price: 1999.99,
      stock_quantity: 10,
      category_id: categories[0].id,
    },
    {
      name: 'Razer Blade 15',
      description: 'Gaming laptop with GTX 1660 Ti',
      price: 1499.99,
      stock_quantity: 8,
      category_id: categories[0].id,
    },
    {
      name: 'MSI GE66 Raider',
      description: 'Gaming laptop with RTX 3070',
      price: 2299.99,
      stock_quantity: 5,
      category_id: categories[0].id,
    },
    {
      name: 'Asus Rog Strix G15',
      description: 'Gaming laptop with RTX 3060',
      price: 1799.99,
      stock_quantity: 12,
      category_id: categories[0].id,
    },
    {
      name: 'HP Omen 15',
      description: 'Gaming laptop with GTX 1650',
      price: 1399.99,
      stock_quantity: 15,
      category_id: categories[0].id,
    },

    // Business Laptops
    {
      name: 'ThinkPad X1 Carbon',
      description: 'Ultralight business laptop',
      price: 1499.99,
      stock_quantity: 15,
      category_id: categories[1].id,
    },
    {
      name: 'Dell Latitude 7410',
      description: 'Premium business laptop with a 14-inch display',
      price: 1599.99,
      stock_quantity: 7,
      category_id: categories[1].id,
    },
    {
      name: 'HP Elite Dragonfly',
      description: 'Business laptop with a sleek design',
      price: 1799.99,
      stock_quantity: 6,
      category_id: categories[1].id,
    },
    {
      name: 'Microsoft Surface Laptop 3',
      description: 'Sleek business laptop with a high-res screen',
      price: 1399.99,
      stock_quantity: 10,
      category_id: categories[1].id,
    },
    {
      name: 'Acer Aspire 5',
      description: 'Affordable business laptop',
      price: 599.99,
      stock_quantity: 20,
      category_id: categories[1].id,
    },

    // Headphones
    {
      name: 'Sony WH-1000XM4',
      description: 'Noise-cancelling headphones',
      price: 349.99,
      stock_quantity: 30,
      category_id: categories[2].id,
    },
    {
      name: 'Bose QuietComfort 35 II',
      description: 'Premium noise-cancelling headphones',
      price: 299.99,
      stock_quantity: 25,
      category_id: categories[2].id,
    },
    {
      name: 'Beats Studio3',
      description: 'Wireless headphones with noise-cancellation',
      price: 299.99,
      stock_quantity: 15,
      category_id: categories[2].id,
    },
    {
      name: 'Sennheiser Momentum 3',
      description: 'High-quality over-ear headphones',
      price: 399.99,
      stock_quantity: 18,
      category_id: categories[2].id,
    },
    {
      name: 'JBL 650BTNC',
      description: 'Affordable noise-cancelling headphones',
      price: 129.99,
      stock_quantity: 50,
      category_id: categories[2].id,
    },

    // Keyboards
    {
      name: 'Logitech MX Keys',
      description: 'Premium wireless keyboard',
      price: 99.99,
      stock_quantity: 25,
      category_id: categories[3].id,
    },
    {
      name: 'Razer Huntsman Elite',
      description: 'Mechanical gaming keyboard',
      price: 199.99,
      stock_quantity: 15,
      category_id: categories[3].id,
    },
    {
      name: 'Corsair K95 RGB Platinum',
      description: 'Mechanical keyboard with RGB lighting',
      price: 179.99,
      stock_quantity: 10,
      category_id: categories[3].id,
    },
    {
      name: 'Logitech G915',
      description: 'Wireless mechanical keyboard with RGB',
      price: 229.99,
      stock_quantity: 5,
      category_id: categories[3].id,
    },
    {
      name: 'Microsoft Sculpt Ergonomic',
      description: 'Ergonomic wireless keyboard',
      price: 129.99,
      stock_quantity: 30,
      category_id: categories[3].id,
    },
  ]).returning('id');

  // Insert product attributes
  await knex('product_attributes').insert([
    { product_id: products[0].id, name: 'Graphics Card', value: 'RTX 3060' },
    { product_id: products[0].id, name: 'RAM', value: '16GB' },
    { product_id: products[1].id, name: 'Graphics Card', value: 'GTX 1660 Ti' },
    { product_id: products[1].id, name: 'RAM', value: '8GB' },
    { product_id: products[2].id, name: 'Graphics Card', value: 'RTX 3070' },
    { product_id: products[2].id, name: 'RAM', value: '32GB' },
    { product_id: products[3].id, name: 'Graphics Card', value: 'RTX 3060' },
    { product_id: products[3].id, name: 'RAM', value: '16GB' },
    { product_id: products[4].id, name: 'Graphics Card', value: 'GTX 1650' },
    { product_id: products[4].id, name: 'RAM', value: '8GB' },

    // Add more attributes for Business Laptops
    { product_id: products[5].id, name: 'Weight', value: '2.4 lbs' },
    { product_id: products[6].id, name: 'Battery Life', value: '18 hours' },
    { product_id: products[7].id, name: 'Battery Life', value: '20 hours' },
    { product_id: products[8].id, name: 'Screen Size', value: '13.5 inches' },
    { product_id: products[9].id, name: 'Storage', value: '256GB SSD' },

    // Headphones attributes
    { product_id: products[10].id, name: 'Noise Cancelling', value: 'Yes' },
    { product_id: products[11].id, name: 'Noise Cancelling', value: 'Yes' },
    { product_id: products[12].id, name: 'Wireless', value: 'Yes' },
    { product_id: products[13].id, name: 'Noise Cancelling', value: 'Yes' },
    { product_id: products[14].id, name: 'Noise Cancelling', value: 'Yes' },

    // Keyboards attributes
    { product_id: products[15].id, name: 'Connection', value: 'Bluetooth' },
    { product_id: products[16].id, name: 'Key Switch', value: 'Opto-mechanical' },
    { product_id: products[17].id, name: 'Key Switch', value: 'Cherry MX' },
    { product_id: products[18].id, name: 'Key Switch', value: 'Mechanical' },
    { product_id: products[19].id, name: 'Key Switch', value: 'Membrane' },
  ]);
}
