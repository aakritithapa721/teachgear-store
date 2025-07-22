// seeds/productSeeder.js
const Product = require('../model/productmodel');

const seedProducts = async () => {
  await Product.sync({ alter: true }); // Syncs the model (use force: true only for testing)
  await Product.bulkCreate([
    { name: 'Wireless Mouse', 
    description: 'A simple wireless mouse', 
    price: 'रू 800', 
    image: 'https://example.com/wireless-mouse.jpg' },

    { name: 'USB Charger (Dual Port)', 
    description: 'Dual port USB charger', 
    price: 'रू 600', 
    image: 'https://example.com/usb-charger.jpg' },

    { name: 'Bluetooth Headphones', 
    description: 'Wireless headphones', 
    price: 'रू 2,500', 
    image: 'https://example.com/bluetooth-headphones.jpg' },

    { name: '16GB USB Drive', 
    description: '16GB USB storage', 
    price: 'रू 1,200', 
    image: 'https://example.com/16gb-usb-drive.jpg' },

    { name: 'Portable Power Bank (10,000mAh)', 
    description: '10,000mAh power bank', 
    price: 'रू 1,800', 
    image: 'https://example.com/portable-power-bank.jpg' }
  ]);
  
  console.log('Products seeded successfully');
};

seedProducts().catch(console.error);