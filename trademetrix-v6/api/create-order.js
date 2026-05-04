const Razorpay = require("razorpay");

const razorpay = new Razorpay({
  key_id: process.env.rzp_test_SlHX4L1Fozb0v3,
  key_secret: process.env.YvK7oJPy54O1bYkBz6R703mz,
});

module.exports = async function handler(req, res) {
  // CORS headers
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") return res.status(200).end();
  if (req.method !== "POST")
    return res.status(405).json({ error: "Method not allowed" });

  try {
    const { amount, currency = "INR", receipt, notes } = req.body;

    // Validate amount — minimum 100 paise (₹1)
    if (!amount || typeof amount !== "number" || amount < 100) {
      return res
        .status(400)
        .json({ error: "Invalid amount. Minimum 100 paise." });
    }

    const order = await razorpay.orders.create({
      amount,
      currency,
      receipt: receipt || `tm_${Date.now()}`,
      notes: notes || {},
    });

    return res.status(200).json({
      order_id: order.id,
      amount: order.amount,
      currency: order.currency,
    });
  } catch (error) {
    console.error("create-order error:", error);

    if (error?.statusCode === 401) {
      return res
        .status(401)
        .json({ error: "Razorpay auth failed. Check API keys." });
    }

    return res.status(500).json({ error: "Failed to create order." });
  }
};
