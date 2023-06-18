import mongoose from "mongoose";
import { Category } from "../../models/Category";
import { mongooseConnect } from "../../lib/mongoose";

export default async function handle(req, res) {
  const { method } = req;
  await mongooseConnect();

  if (method === "GET") {
    const categories = await Category.find({}).populate("parent");
    res.json(categories);
  }

  if (method === "POST") {
    const { name, parentCategory } = req.body;
    const data = { name };
    if (parentCategory !== "") {
      data.parent = parentCategory;
    }
    const newCategory = await Category.create(data);
    res.json(newCategory);
  }

  if (method === "PUT") {
    const { name, parentCategory, _id } = req.body;
    const data = { name };
    if (parentCategory !== "") {
      data.parent = parentCategory;
    } else {
      data.parent = null;
    }
    const updatedCategory = await Category.findByIdAndUpdate({ _id }, data);
    res.json(updatedCategory);
  }

  if (method === "DELETE") {
    const { _id } = req.query;
    console.log("delete category", _id);
    const deletedCategory = await Category.deleteOne({ _id });
    res.json(deletedCategory);
  }
}
