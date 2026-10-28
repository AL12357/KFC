require("dotenv").config();

const mongoose = require("mongoose");
const Menu = require("./model/menuSchema");

const MONGO_URI = process.env.DATABASE;

const menuItems = [
  {
    image: "/food/fried-chicken.jpg",
    title: "KFC Chicken Bucket",
    desc: "Crispy fried chicken bucket",
    price: "1200",
    type: "chicken"
  },
  {
    image: "/food/chicken-sandwich.jpg",
    title: "Chicken Burger",
    desc: "Crispy chicken burger",
    price: "600",
    type: "chicken"
  },
  {
    image: "/food/chicken-roll.png",
    title: "Chicken Roll",
    desc: "Seasoned chicken wrapped with fresh ingredients",
    price: "450",
    type: "rolls"
  },
  {
    image: "/food/biryani-bucket.png",
    title: "Chicken Biryani Bucket",
    desc: "Chicken and fragrant spiced rice",
    price: "900",
    type: "biryani"
  },
  {
    image: "/food/chicken-sandwich.jpg",
    title: "Zinger Burger",
    desc: "Crispy chicken fillet burger",
    price: "650",
    type: "burger"
  },
  {
    image: "/food/chicken-sandwich.jpg",
    title: "Chicken Burger",
    desc: "Delicious crispy chicken burger",
    price: "600",
    type: "burger"
  },
  {
    image: "/food/fries.jpg",
    title: "French Fries",
    desc: "Crispy golden fries",
    price: "300",
    type: "snacks"
  },
  {
    image: "/food/fries.jpg",
    title: "Coleslaw",
    desc: "Fresh creamy coleslaw",
    price: "250",
    type: "snacks"
  },
  {
    image: "/food/cola.jpg",
    title: "Pepsi",
    desc: "Refreshing Pepsi",
    price: "200",
    type: "beverages"
  },
  {
    image: "/food/cola.jpg",
    title: "7UP",
    desc: "Refreshing 7UP",
    price: "200",
    type: "beverages"
  },
  {
    image: "/food/cola.jpg",
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

    await Menu.updateMany(
      { type: "burgers" },
      { $set: { type: "burger" } }
    );
    await Menu.updateMany(
      { type: "sides" },
      { $set: { type: "snacks" } }
    );

    await Menu.bulkWrite(
      menuItems.map((item) => ({
        updateOne: {
          filter: { title: item.title, type: item.type },
          update: { $set: item },
          upsert: true
        }
      }))
    );

    console.log(`${menuItems.length} menu items seeded or updated`);

    await mongoose.connection.close();

    console.log("MongoDB connection closed");
  } catch (error) {
    console.error("Seeding failed:", error);
    process.exit(1);
  }
}

seedDatabase();
