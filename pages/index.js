import { mongooseConnect } from "..//lib/mongoose";
import Featured from "../components/Featured";
import Header from "../components/Header";
import NewProducts from "../components/NewProducts";
import Product from "../models/Products";

export default function HomePage({ featuredProduct, newProducts }) {
  return (
    <div>
      <Header />
      <Featured product={featuredProduct} />
      <NewProducts newProducts={newProducts} />
    </div>
  );
}

export async function getServerSideProps() {
  const featuredProductId = "649c5d0a6a57072333db048f";
  await mongooseConnect();
  const featuredProduct = await Product.findById(featuredProductId);
  const newProducts = await Product.find({}).sort({ _id: -1 });
  return {
    props: {
      featuredProduct: JSON.parse(JSON.stringify(featuredProduct)),
      newProducts: JSON.parse(JSON.stringify(newProducts)),
    },
  };
}
