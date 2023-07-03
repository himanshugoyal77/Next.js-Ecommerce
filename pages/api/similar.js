import { mongooseConnect } from "../../lib/mongoose";
import Product from "../../models/Products";
import { Category } from "../../models/Category";

export default async function handler(req, res) {
  await mongooseConnect();
  const { method } = req;
  var category = req.body.category;
  var findParent = await Category.findById(category).populate("parent");

  const similarProductsList = [];
  while (findParent.parent != null) {
    similarProductsList.push(category);
    category = findParent.parent._id;
    findParent = await Category.findById(category).populate("parent");
  }
  similarProductsList.push(category);
  console.log("parent" + similarProductsList);
  const product = await Product.find({
    category: { $in: similarProductsList },
  });

  // const product = await Product.find({}).populate("category");

  res.json(product);
}
