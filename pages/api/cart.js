import { mongooseConnect } from "../../lib/mongoose";
import Product from "../../models/Products";

export default async function handler(req, res) {
  await mongooseConnect();
  const { method } = req;
  const ids = req.body.ids;
  res.json(await Product.find({ _id: { $in: ids } }));
}
