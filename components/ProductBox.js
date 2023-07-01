import React, { useContext } from "react";
import styled from "styled-components";
import PrimaryBtn from "./PrimaryBtn";
import CartIcon from "./icons/CartIcon";
import { CartContext } from "./CartContext";

const Box = styled.div`
  background-color: #fff;
  display: flex;
  padding: 20px;
  height: 100px;
  text-align: center;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  img {
    max-width: 100%;
    max-height: 80px;
  }
`;

const Title = styled.h2`
  font-weight: normal;
  font-size: 0.9rem;
  margin: 0;
`;

const ProductInfoBox = styled.div`
  margin-top: 10px;
`;

const PriceRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 2px;
`;

const Price = styled.span`
  font-weight: bold;
  font-size: 1.5rem;
`;

function ProductBox({ _id, title, description, price, images, netWorkImages }) {
  const { addProductToCart } = useContext(CartContext);
  return (
    <div className="">
      <Box>
        <img src={netWorkImages[0] || netWorkImages[1]} alt="" />
      </Box>
      <ProductInfoBox>
        <Title>{title}</Title>
        <PriceRow>
          <Price>${price}</Price>
          <PrimaryBtn primary={1} outline onClick={() => addProductToCart(_id)}>
            Add to cart
          </PrimaryBtn>
        </PriceRow>
      </ProductInfoBox>
    </div>
  );
}

export default ProductBox;
