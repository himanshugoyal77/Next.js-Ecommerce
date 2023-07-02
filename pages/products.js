import React from "react";
import Header from "../components/Header";
import Center from "../components/Center";
import { styled } from "styled-components";
import { mongooseConnect } from "..//lib/mongoose";
import Product from "../models/Products";
import ProductsGrid from "../components/ProductsGrid";

const Title = styled.h1`
  font-size: 1.5em;
`;

function ProductsPage({ products }) {
  console.log(products);
  return (
    <div>
      <Header />
      <Center>
        <Title>All Products</Title>
        <ProductsGrid products={products} />
      </Center>
    </div>
  );
}

export default ProductsPage;

export async function getStaticProps() {
  await mongooseConnect();
  const products = await Product.find({}).sort({ _id: -1 });
  return {
    props: {
      products: JSON.parse(JSON.stringify(products)),
    },
  };
}
