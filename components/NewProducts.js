import React from "react";
import styled from "styled-components";
import Center from "./Center";
import ProductBox from "./ProductBox";

const ProductsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  gap: 20px;
  padding-top: 30px;
`;

function NewProducts({ newProducts }) {
  console.log("new products", newProducts);
  return (
    <Center>
      <ProductsGrid>
        {newProducts.length > 0 &&
          newProducts.map((product) => <ProductBox {...product} />)}
      </ProductsGrid>
    </Center>
  );
}

export default NewProducts;
