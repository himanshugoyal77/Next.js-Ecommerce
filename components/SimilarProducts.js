import React, { useEffect, useState } from "react";
import ProductsGrid from "./ProductsGrid";
import { mongooseConnect } from "../lib/mongoose";
import axios from "axios";

function SimilarProducts({ productCategory }) {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    const getData = async () => {
      const res = await axios.post("/api/similar", {
        category: productCategory,
      });

      setProducts(res.data);
    };
    getData();
  }, []);
  console.log("similar products", products);

  return (
    <div>
      <h1>Similar Products </h1>
      <ProductsGrid products={products} />
    </div>
  );
}

export default SimilarProducts;
