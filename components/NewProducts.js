import React from "react";
import styled from "styled-components";
import Center from "./Center";
import ProductBox from "./ProductBox";
import ProductsGrid from "./ProductsGrid";

const Title = styled.h1`
  margin: 20px 0;
  font-weight: bold;
  font-size: 1.5rem;
  @media screen and (min-width: 768px) {
    font-size: 2.3rem;
  }
`;

function NewProducts({ newProducts }) {
  return (
    <Center>
      <Title>New Products</Title>
      <ProductsGrid products={newProducts} />
    </Center>
  );
}

export default NewProducts;
