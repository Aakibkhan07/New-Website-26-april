const https = require("https");
const crypto = require("crypto");

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
      return res.status(400).json({ error: "Invalid amount. Minimum 100 paise." });
    }

    const KEY_ID = process.env.RAZORPAY_KEY_ID;
    const KEY_SECRET = process.env.RAZORPAY_KEY_SECRET;

    if (!KEY_ID || !KEY_SECRET) {
      console.error("Missing Razorpay env vars");
      return res.status(500).json({ error: "Payment configuration missing." });
    }

    const payload = JSON.stringify({
      amount,
      currency,
      receipt: receipt || ("tm_" + Date.now()),
    });

    const auth = Buffer.from(KEY_ID + ":" + KEY_SECRET).toString("base64");

    const order = await new Promise((resolve, reject) => {
      const options = {
        hostname: "api.razorpay.com",
        path: "/v1/orders",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Basic " + auth,
          "Content-Length": Buffer.byteLength(payload),
        },
      };

      const httpReq = https.request(options, (httpRes) => {
        let data = "";
        httpRes.on("data", (chunk) => { data += chunk; });
        httpRes.on("end", () => {
          try {
            const parsed = JSON.parse(data);
            if (httpRes.statusCode >= 400) {
              reject(new Error(parsed.error?.description || "Razorpay API error: " + httpRes.statusCode));
            } else {
              resolve(parsed);
            }
          } catch (e) {
            reject(new Error("Invalid response from Razorpay"));
          }
        });
      });

      httpReq.on("error", reject);
      httpReq.write(payload);
      httpReq.end();
    });

    return res.status(200).json({
      order_id: order.id,
      amount: order.amount,
      currency: order.currency,
    });

  } catch (error) {
    console.error("create-order error:", error.message);
    return res.status(500).json({ error: "Failed to create order: " + error.message });
  }
};
