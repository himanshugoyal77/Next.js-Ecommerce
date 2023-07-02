import { mongooseConnect } from "../../lib/mongoose";
const stripe = require("stripe")(process.env.STRIPE_SK);
import { buffer } from "micro";
import Order from "../../models/Order";

const endpointSecret =
  "whsec_f2e209a4d9c215094055b4164194b25531d93732be702d7ee37886080bb2b45e";

export default async function handler(req, res) {
  await mongooseConnect();

  const sig = req.headers["stripe-signature"];

  let event;

  try {
    event = stripe.webhooks.constructEvent(
      await buffer(req),
      sig,
      endpointSecret
    );
  } catch (err) {
    res.status(400).send(`Webhook Error: ${err.message}`);
    return;
  }

  // Handle the event
  switch (event.type) {
    case "checkout.session.completed":
      const data = event.data.object;
      const orderId = data.metadata.orderId;
      const pay = data.payment_status === "paid";
      if (orderId && pay) {
        await Order.findByIdAndUpdate(orderId, { paid: true });
      }
      break;
    // ... handle other event types
    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  // Return a 200 response to acknowledge receipt of the event
  res.status(200).send("OK");
}

export const config = {
  api: {
    bodyParser: false,
  },
};

//worth-softer-clears-timely
// acct_1NHSPaSHrFIYiYVq
