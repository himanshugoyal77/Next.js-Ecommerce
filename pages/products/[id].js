import React, { useContext, useEffect } from "react";
import Center from "../../components/Center";
import { useRouter } from "next/router";
import Header from "../../components/Header";
import { styled } from "styled-components";
import axios from "axios";
import { mongooseConnect } from "../../lib/mongoose";
import Product from "../../models/Products";
import PorductImages from "../../components/PorductImages";
import PrimaryBtn from "../../components/PrimaryBtn";
import { CartContext } from "../../components/CartContext";

const Title = styled.h1`
  font-size: 1.4em;
  font-weight: bold;
`;

const ColumnWrapper = styled.div`
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  gap: 10px;

  @media screen and (min-width: 768px) {
    margin-top: 40px;
    display: grid;
    grid-template-columns: 1.2fr 0.8fr;
    gap: 40px;
  }
`;

const WhiteBox = styled.div`
  background-color: white;
  border-radius: 10px;
  padding: 30px;
`;

const PriceBox = styled.div`
  display: flex;
  gap: 12px;
  align-items: center;
  font-size: 1.2rem;
  font-weight: bold;
`;

const Price = styled.span``;

const AddToCartBtn = styled.button`
  height: 34px;
  width: 120px;
  border: none;
  color: #fff;
  padding: 4px 10px;
  border-radius: 4px;
  cursor: pointer;
  background-color: black;
`;

function SingleProductPage({ product }) {
  console.log(product);
  const { addProductToCart } = useContext(CartContext);
  return (
    <>
      <Header />
      <Center>
        <ColumnWrapper>
          <WhiteBox>
            <PorductImages images={product.netWorkImages} />
          </WhiteBox>
          <div className="">
            <Title>{product.title}</Title>
            <p
              style={{
                textAlign: "start",
                color: "#777",
                fontSize: "0.9rem",
              }}
            >
              {product.description.length > 200
                ? product.description.slice(0, 200) + "..."
                : product.description}
            </p>
            <PriceBox>
              <Price>${product.price}</Price>
              <AddToCartBtn onClick={() => addProductToCart(product._id)}>
                Add to cart
              </AddToCartBtn>
            </PriceBox>
          </div>
        </ColumnWrapper>
      </Center>
    </>
  );
}

export default SingleProductPage;

export async function getServerSideProps(context) {
  await mongooseConnect();
  const { id } = context.query;
  const product = await Product.findById(id);
  return {
    props: {
      product: JSON.parse(JSON.stringify(product)),
    },
  };
}
