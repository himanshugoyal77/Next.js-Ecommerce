import mongoose from "mongoose";
import clientPromise from "../../lib/mongodb";
import Product from "../../models/Products";
import { mongooseConnect } from "../../lib/mongoose";
import { isAdminRequest } from "./auth/[...nextauth]";

export default async function handle(req, res) {
  const { method } = req;
  await mongooseConnect();
  await isAdminRequest(req, res);

  if (method === "POST") {
    const {
      title,
      description,
      price,
      images,
      category,
      properties,
      netWorkImages,
    } = req.body;
    const productDoc = new Product({
      title,
      description,
      price,
      images,
      category,
      properties,
      netWorkImages,
    });
    await productDoc.save();
    res.status(200).json(productDoc);
  }

  if (method === "GET") {
    if (req.query?.id) {
      const product = await Product.findById({
        _id: req.query.id,
      });
      return res.status(200).json(product);
    }
    const products = await Product.find({});
    res.status(200).json(products);
  }

  if (method === "PUT") {
    const {
      title,
      description,
      price,
      images,
      category,
      _id,
      properties,
      netWorkImages,
    } = req.body;
    await Product.findByIdAndUpdate(
      { _id },
      { title, description, price, images, category, properties, netWorkImages }
    );

    res.status(200).json({ message: "ok" });
  }

  if (method === "DELETE") {
    if (!req.query?.id)
      return res.status(400).json({ message: "id is required" });
    await Product.findByIdAndDelete({ _id: req.query.id });
    res.status(200).json({ message: "deleted" });
  }
}
