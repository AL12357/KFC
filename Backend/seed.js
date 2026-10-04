require("dotenv").config();

const mongoose = require("mongoose");
const Menu = require("./model/menuSchema");

const MONGO_URI = process.env.DATABASE;

const menuItems = [
  {
    image: "https://tb-static.uber.com/prod/image-proc/processed_images/e564c535342573d14f50aeda86b4dfed/c73ecc27d2a9eaa735b1ee95304ba588.jpeg",
    title: "KFC Chicken Bucket",
    desc: "Crispy fried chicken bucket",
    price: "1200",
    type: "chicken"
  },
  {
    image: "https://d1ralsognjng37.cloudfront.net/2a74c64c-c473-4abb-a263-1051f38e503e.jpeg",
    title: "Chicken Burger",
    desc: "Crispy chicken burger",
    price: "600",
    type: "chicken"
  },
  {
    image: "https://tb-static.uber.com/prod/image-proc/processed_images/e564c535342573d14f50aeda86b4dfed/c73ecc27d2a9eaa735b1ee95304ba588.jpeg",
    title: "Zinger Burger",
    desc: "Crispy chicken fillet burger",
    price: "650",
    type: "burgers"
  },
  {
    image: "https://d1ralsognjng37.cloudfront.net/2a74c64c-c473-4abb-a263-1051f38e503e.jpeg",
    title: "Chicken Burger",
    desc: "Delicious crispy chicken burger",
    price: "600",
    type: "burgers"
  },
  {
    image: "https://d1ralsognjng37.cloudfront.net/2a74c64c-c473-4abb-a263-1051f38e503e.jpeg",
    title: "French Fries",
    desc: "Crispy golden fries",
    price: "300",
    type: "sides"
  },
  {
    image: "https://d1ralsognjng37.cloudfront.net/2a74c64c-c473-4abb-a263-1051f38e503e.jpeg",
    title: "Coleslaw",
    desc: "Fresh creamy coleslaw",
    price: "250",
    type: "sides"
  },
  {
    image: "https://d1ralsognjng37.cloudfront.net/2a74c64c-c473-4abb-a263-1051f38e503e.jpeg",
    title: "Pepsi",
    desc: "Refreshing Pepsi",
    price: "200",
    type: "beverages"
  },
  {
    image: "https://d1ralsognjng37.cloudfront.net/2a74c64c-c473-4abb-a263-1051f38e503e.jpeg",
    title: "7UP",
    desc: "Refreshing 7UP",
    price: "200",
    type: "beverages"
  },
  {
    image: "https://d1ralsognjng37.cloudfront.net/2a74c64c-c473-4abb-a263-1051f38e503e.jpeg",
    title: "Mirinda",
    desc: "Refreshing orange drink",
    price: "200",
    type: "beverages"
  }
];

async function seedDatabase() {
  try {
    if (!MONGO_URI) {
      throw new Error("DATABASE is not set in the environment");
    }

    await mongoose.connect(MONGO_URI);

    console.log("MongoDB connected");

    await Menu.deleteMany({});

    console.log("Old menu data deleted");

    await Menu.insertMany(menuItems);

    console.log(`${menuItems.length} menu items inserted successfully`);

    await mongoose.connection.close();

    console.log("MongoDB connection closed");
  } catch (error) {
    console.error("Seeding failed:", error);
    process.exit(1);
  }
}

seedDatabase();