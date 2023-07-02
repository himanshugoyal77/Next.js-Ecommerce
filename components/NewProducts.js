import React from "react";
import styled from "styled-components";
import Center from "./Center";
import ProductBox from "./ProductBox";
import ProductsGrid from "./ProductsGrid";

function NewProducts({ newProducts }) {
  return (
    <Center>
      <ProductsGrid products={newProducts} />
    </Center>
  );
}

export default NewProducts;
