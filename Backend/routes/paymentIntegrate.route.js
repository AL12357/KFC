const { Router } = require("express");

const paymentRouter = Router();

paymentRouter.post("/demo", (req, res) => {
  const amount = Number(req.body.amount);
  if (!Number.isFinite(amount) || amount <= 0) {
    return res.status(400).json({ message: "Invalid demo payment amount" });
  }

  return res.status(200).json({
    status: "success",
    demo: true,
    demoPaymentId: `demo_payment_${Date.now()}`,
    amount,
    message: "Demo payment successful. No real payment was charged.",
  });
});

module.exports = paymentRouter;
