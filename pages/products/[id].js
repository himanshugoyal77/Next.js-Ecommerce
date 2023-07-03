import React, { useContext, useEffect, useState } from "react";
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
import Link from "next/link";
import SimilarProducts from "../../components/SimilarProducts";

const Title = styled.h1`
  font-size: 1.4em;
  font-weight: bold;
  @media screen and (min-width: 768px) {
    font-size: 2em;
  }
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

const PTag = styled.p`
  textalign: star;
  color: #777;
  fontsize: 0.9rem;
  @media screen and (min-width: 768px) {
    fontsize: 1.1rem;
    color: #000;
  }
`;

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

const QunatityLabel = styled.span`
  padding: 0 3px;
`;

const QunatityBox = styled.div`
  margin: 15px 0;
  display: flex;
  gap: 8px;
  align-items: center;
  margin-top: 10px;
  color: #000;
`;

const QunatityBtn = styled.button`
  border: none;
  color: #000;
  background-color: #fff;
  text-align: center;
  font-size: 1.2rem;
  padding: 4px 10px;
  border-radius: 4px;
  cursor: pointer;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: #fff;
`;

const DetailsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
`;

function SingleProductPage({ product }) {
  const { cartProducts, addProductToCart, renoveProductFromCart } =
    useContext(CartContext);
  const [products, setProducts] = useState([]);
  const handleIncrease = (id) => {
    addProductToCart(id);
  };

  const handleDecrease = (id) => {
    renoveProductFromCart(id);
  };

  let total = 0;
  cartProducts.forEach((id) => {
    if (id === product._id) total += product.price;
  });
  console.log(total);

  useEffect(() => {
    axios
      .post("/api/cart", {
        ids: cartProducts,
      })
      .then((res) => {
        setProducts(res.data);
      });
  }, [cartProducts]);
  console.log(cartProducts);
  return (
    <>
      <Header />
      <Center>
        <ColumnWrapper>
          <WhiteBox>
            <PorductImages images={product.netWorkImages} />
          </WhiteBox>
          <DetailsWrapper>
            <Title>{product.title}</Title>
            <PTag>
              {product.description.length > 200
                ? product.description.slice(0, 200) + "..."
                : product.description}
            </PTag>
            <QunatityBox className="">
              <QunatityBtn onClick={() => handleDecrease(product._id)}>
                -
              </QunatityBtn>
              <QunatityLabel>
                {cartProducts.filter((id) => id === product._id).length}
              </QunatityLabel>
              <QunatityBtn onClick={() => handleIncrease(product._id)}>
                +
              </QunatityBtn>
            </QunatityBox>
            <PriceBox>
              <Price>
                {cartProducts.filter((id) => id === product._id).length > 0
                  ? `\$${total}`
                  : `\$${product.price}`}
              </Price>
              <AddToCartBtn onClick={() => addProductToCart(product._id)}>
                <StyledLink href="/cart">BUY NOW</StyledLink>
              </AddToCartBtn>
            </PriceBox>
          </DetailsWrapper>
        </ColumnWrapper>
        <SimilarProducts productCategory={product.category} />
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
