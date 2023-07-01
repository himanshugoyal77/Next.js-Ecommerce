import { mongooseConnect } from "../../lib/mongoose";
import Order from "../../models/Order";
import Product from "../../models/Products";
const stripe = require("stripe")(process.env.STRIPE_SK);

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.json("should be a POST request");
    return;
  }

  const {
    name,
    email,
    city,
    postalCode,
    streetAddress,
    country,
    cartProducts,
  } = req.body;

  const productIds = cartProducts;
  await mongooseConnect();
  const uniqueIds = [...new Set(productIds)];
  const productsInfos = await Product.find({
    _id: { $in: uniqueIds },
  });

  let line_items = [];
  for (const productId of uniqueIds) {
    const productInfo = productsInfos.find(
      (p) => p._id.toString() == productId
    );
    const quantity = productIds.filter((id) => id === productId)?.length || 0;
    if (quantity > 0) {
      line_items.push({
        quantity,
        price_data: {
          currency: "USD",
          product_data: { name: productInfo.title },
          unit_amount: productInfo.price * 100,
        },
      });
    }
  }

  const orderDoc = await Order.create({
    line_items,
    name,
    email,
    city,
    postalCode,
    streetAddress,
    country,
    paid: false,
  });

  const session = await stripe.checkout.sessions.create({
    line_items,
    mode: "payment",
    customer_email: email,
    success_url: "http://localhost:3000" + "/cart?success=true",
    cancel_url: "http://localhost:3000" + "/cart?canceled=1",
    metadata: {
      orderId: orderDoc._id.toString(),
    },
  });

  res.json({
    url: session.url,
  });
}
