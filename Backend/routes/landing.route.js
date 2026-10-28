const { Router } = require("express");
const { favorites, featured, quickbites } = require("../model/LandingSchema");
const landingRouter = Router();

landingRouter.get("/favorites", async (req, res) => {
  try {
    const fav = await favorites.find();
    return res.status(200).json(fav);
  } catch (error) {
    console.error("Error fetching favorites:", error);
    return res.status(500).json({ message: "Failed to fetch favorites" });
  }
});

landingRouter.get("/featured", async (req, res) => {
  try {
    const feature = await featured.find();
    return res.status(200).json(feature);
  } catch (error) {
    console.error("Error fetching featured items:", error);
    return res.status(500).json({ message: "Failed to fetch featured items" });
  }
});

landingRouter.get("/quickbites", async (req, res) => {
  try {
    const quickbite = await quickbites.find();
    return res.status(200).json(quickbite);
  } catch (error) {
    console.error("Error fetching quick bites:", error);
    return res.status(500).json({ message: "Failed to fetch quick bites" });
  }
});
module.exports = landingRouter;
