const https = require("https");

module.exports = async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  if (req.method === "OPTIONS") return res.status(200).end();
  if (req.method !== "POST")
    return res.status(405).json({ error: "Method not allowed" });

  try {
    const { amount, currency = "INR", receipt } = req.body;
    if (!amount || typeof amount !== "number" || amount < 100) {
      return res.status(400).json({ error: "Invalid amount." });
    }

    const KEY_ID = process.env.RAZORPAY_KEY_ID || "rzp_test_SlZppeQzAmHP7I";
    const KEY_SECRET = process.env.RAZORPAY_KEY_SECRET || "HMmnpn21G2XA5GjIYaERTC92";

    const payload = JSON.stringify({
      amount,
      currency,
      receipt: receipt || ("tm_" + Date.now()),
    });

    const auth = Buffer.from(KEY_ID + ":" + KEY_SECRET).toString("base64");

    const order = await new Promise((resolve, reject) => {
      const r = https.request({
        hostname: "api.razorpay.com",
        path: "/v1/orders",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Basic " + auth,
          "Content-Length": Buffer.byteLength(payload),
        },
      }, (res2) => {
        let data = "";
        res2.on("data", c => data += c);
        res2.on("end", () => {
          try {
            const parsed = JSON.parse(data);
            if (res2.statusCode >= 400) {
              reject(new Error(parsed.error?.description || "Razorpay error " + res2.statusCode));
            } else {
              resolve(parsed);
            }
          } catch(e) { reject(new Error("Invalid Razorpay response")); }
        });
      });
      r.on("error", reject);
      r.write(payload);
      r.end();
    });

    return res.status(200).json({
      order_id: order.id,
      amount: order.amount,
      currency: order.currency,
    });

  } catch (err) {
    console.error("create-order error:", err.message);
    return res.status(500).json({ error: err.message });
  }
};
