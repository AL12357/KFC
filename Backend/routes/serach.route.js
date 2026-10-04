const { Router } = require("express");

const Menu = require("../model/menuSchema");

const searchRouter = Router();

searchRouter.get("/item", async (req, res) => {
    try {
        const search = String(req.query.search || "").trim();

        if (!search) {
            return res.status(400).json({
                message: "Search term is required"
            });
        }

        const items = await Menu.find({
            title: { $regex: search, $options: "i" }
        });

        return res.status(200).json(items);

    } catch (error) {
        console.error("Error searching menu:", error);

        return res.status(500).json({
            message: "Failed to search menu items",
            error: error.message
        });
    }
});

module.exports = searchRouter;