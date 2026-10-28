const express = require("express");
require("dotenv").config({ path: require("path").join(__dirname, ".env") });
if (!process.env.SECRET_KEY) {
  throw new Error("Missing SECRET_KEY in Backend/.env");
}

const connection = require("./Database/db");
const userAuthRouter = require("./routes/userAuth.route");
const paymentRouter = require("./routes/paymentIntegrate.route");
const menuRouter = require("./routes/menu.route");
const cartRouter = require("./routes/cart.route");
const searchRouter = require("./routes/serach.route");
const landingRouter = require("./routes/landing.route");
const cors = require("cors");
const helmet = require("helmet");

const server = express();
const PORT = process.env.PORT || 8080;
const allowedOrigins = (process.env.FRONTEND_URLS || "http://localhost:3000")
  .split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);

server.use(express.urlencoded({ extended: true }));
server.use(
  cors({
    origin: allowedOrigins,
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);
server.use(helmet());
server.use(express.json());

server.get("/", (req, res) => {
  res.send(`KFC API Server started on localhost:${PORT}`);
});

server.get("/health", (req, res) => {
  res.status(200).json({ status: "ok" });
});

server.use("/Auth", userAuthRouter);
server.use("/api/home", landingRouter);
server.use("/api/searchapi", searchRouter);
server.use("/api/product", menuRouter);
server.use("/api/productcart", cartRouter);
server.use("/api/payment", paymentRouter);

async function startServer() {
  await connection;

  server.listen(PORT, () => {
    console.log("Connected to Database");
    console.log(`KFC API started on http://localhost:${PORT}/`);
  });
}

startServer().catch((error) => {
  console.error("Unable to start the API server:", error.message);
  process.exitCode = 1;
});
