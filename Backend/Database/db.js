const mongoose = require("mongoose");

const db = process.env.DATABASE;

if (!db) {
throw new Error("Missing DATABASE connection string in Backend/.env");
}

mongoose.set("strictQuery", false);

const connection = mongoose.connect(db)
.then(() => {
console.log("MongoDB connected successfully");
})
.catch((error) => {
console.error("MongoDB connection failed:", error.message);
throw error;
});

module.exports = connection;
