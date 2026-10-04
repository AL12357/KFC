const { Router } = require("express");

const Cart = require("../model/cartSchema");

const cartRouter = Router();

cartRouter.post("/cart", async (req, res) => {
    try {
        await Cart.insertMany(req.body);

        return res.status(201).send("cart added");
    } catch (error) {
        console.error("Error adding cart:", error);

        return res.status(500).json({
            message: "Failed to add cart",
            error: error.message
        });
    }
});

cartRouter.get("/cart", async (req, res) => {
    try {
        const cart = await Cart.find();

        return res.status(200).json(cart);
    } catch (error) {
        console.error("Error fetching cart:", error);

        return res.status(500).json({
            message: "Failed to fetch cart",
            error: error.message
        });
    }
});

cartRouter.delete("/cart/:id", async (req, res) => {
    try {
        const deletedCart = await Cart.findByIdAndDelete(req.params.id);

        if (!deletedCart) {
            return res.status(404).json({
                message: "Cart item not found"
            });
        }

        return res.status(200).json({
            message: "Delete successful",
            item: deletedCart
        });
    } catch (error) {
        console.error("Error deleting cart:", error);

        return res.status(500).json({
            message: "Failed to delete cart",
            error: error.message
        });
    }
});

cartRouter.put("/cart/:id", async (req, res) => {
    try {
        if (req.body.qty === 0) {
            const deletedCart = await Cart.findByIdAndDelete(req.params.id);

            if (!deletedCart) {
                return res.status(404).json({
                    message: "Cart item not found"
                });
            }

            return res.status(200).send("cart is empty");
        }

        const updatedCart = await Cart.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            {
                new: true,
                runValidators: true
            }
        );

        if (!updatedCart) {
            return res.status(404).json({
                message: "Cart item not found"
            });
        }

        return res.status(200).json(updatedCart);

    } catch (error) {
        console.error("Error updating cart:", error);

        return res.status(500).json({
            message: "Failed to update cart",
            error: error.message
        });
    }
});

module.exports = cartRouter;