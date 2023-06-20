import mongoose from "mongoose";
import { Category } from "../../models/Category";
import { mongooseConnect } from "../../lib/mongoose";
import { authOption, isAdminRequest } from "./auth/[...nextauth]";
import { getServerSession } from "next-auth";

export default async function handle(req, res) {
  const { method } = req;
  await mongooseConnect();
  await isAdminRequest(req, res);

  if (method === "GET") {
    if (req.query._id) {
      const getCatByID = await Category.findById(req.query._id).populate(
        "parent"
      );
      res.json(getCatByID);
    } else {
      const categories = await Category.find({}).populate("parent");
      res.json(categories);
    }
  }

  if (method === "POST") {
    const { name, parentCategory, properties } = req.body;
    const data = { name, properties };
    if (parentCategory !== "") {
      data.parent = parentCategory;
    }
    const newCategory = await Category.create(data);
    res.json(newCategory);
  }

  if (method === "PUT") {
    const { name, parentCategory, properties, _id } = req.body;
    const data = { name, properties };
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
