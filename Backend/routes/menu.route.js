const { Router } = require("express");

const Menu = require("../model/menuSchema");

const menuRouter = Router();


// ===============================
// CREATE - Add a new menu item
// POST /api/product/menu
// ===============================
menuRouter.post("/menu", async (req, res) => {
    try {
        const { image, title, desc, price, type } = req.body;

        // Check required fields
        if (!title || !desc || !price || !type) {
            return res.status(400).json({
                message: "Title, description, price and type are required"
            });
        }

        const newMenuItem = new Menu({
            image,
            title,
            desc,
            price,
            type
        });

        const savedItem = await newMenuItem.save();

        return res.status(201).json({
            message: "Menu item created successfully",
            item: savedItem
        });

    } catch (error) {
        console.error("Error creating menu item:", error);

        return res.status(500).json({
            message: "Failed to create menu item",
            error: error.message
        });
    }
});


// ===============================
// READ - Get all menu items
// GET /api/product/menu
// ===============================
menuRouter.get("/menu", async (req, res) => {
    try {
        const query = req.query;

        const items = await Menu.find(query);

        return res.status(200).json(items);

    } catch (error) {
        console.error("Error fetching menu:", error);

        return res.status(500).json({
            message: "Failed to fetch menu items",
            error: error.message
        });
    }
});


// ===============================
// READ - Get one menu item
// GET /api/product/menu/:id
// ===============================
menuRouter.get("/menu/:id", async (req, res) => {
    try {
        const { id } = req.params;

        const item = await Menu.findById(id);

        if (!item) {
            return res.status(404).json({
                message: "Menu item not found"
            });
        }

        return res.status(200).json(item);

    } catch (error) {
        console.error("Error fetching menu item:", error);

        return res.status(500).json({
            message: "Failed to fetch menu item",
            error: error.message
        });
    }
});


// ===============================
// UPDATE - Update a menu item
// PUT /api/product/menu/:id
// ===============================
menuRouter.put("/menu/:id", async (req, res) => {
    try {
        const { id } = req.params;

        const updatedItem = await Menu.findByIdAndUpdate(
            id,
            req.body,
            {
                new: true,
                runValidators: true
            }
        );

        if (!updatedItem) {
            return res.status(404).json({
                message: "Menu item not found"
            });
        }

        return res.status(200).json({
            message: "Menu item updated successfully",
            item: updatedItem
        });

    } catch (error) {
        console.error("Error updating menu item:", error);

        return res.status(500).json({
            message: "Failed to update menu item",
            error: error.message
        });
    }
});


// ===============================
// DELETE - Delete a menu item
// DELETE /api/product/menu/:id
// ===============================
menuRouter.delete("/menu/:id", async (req, res) => {
    try {
        const { id } = req.params;

        const deletedItem = await Menu.findByIdAndDelete(id);

        if (!deletedItem) {
            return res.status(404).json({
                message: "Menu item not found"
            });
        }

        return res.status(200).json({
            message: "Menu item deleted successfully",
            item: deletedItem
        });

    } catch (error) {
        console.error("Error deleting menu item:", error);

        return res.status(500).json({
            message: "Failed to delete menu item",
            error: error.message
        });
    }
});


module.exports = menuRouter;