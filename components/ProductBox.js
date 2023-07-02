import React, {
  Component,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import styled from "styled-components";
import PrimaryBtn from "./PrimaryBtn";
import CartIcon from "./icons/CartIcon";
import { CartContext } from "./CartContext";
import Link from "next/link";

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
  font-size: 0.8rem;
  margin: 0;
  height: 0.8rem;
  overflow: hidden;
  @media screen and (min-width: 768px) {
    font-size: 0.9rem;
  }
`;

const ProductInfoBox = styled.div`
  margin-top: 10px;
`;

const PriceRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 4px;
`;

const Price = styled.span`
  font-weight: bold;
  font-size: 1.1rem;
  color: black;

  @media screen and (min-width: 768px) {
    font-size: 1.4rem;
  }
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: #000;
`;

const AddToCartBtn = styled.button`
  border: 1px solid #8ebfc4;
  color: #000;
  padding: 4px 10px;
  border-radius: 4px;
  cursor: pointer;
`;

function ProductBox({ _id, title, description, price, images, netWorkImages }) {
  const { addProductToCart } = useContext(CartContext);
  const [windowSize, setWindowSize] = useState([]);

  useEffect(() => {
    const handleWindowResize = () => {
      setWindowSize([window.innerWidth, window.innerHeight]);
    };

    window.addEventListener("resize", handleWindowResize);

    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, [windowSize]);
  console.log(windowSize);
  const add = (event, _id) => {
    addProductToCart(_id);
    event.stopPropagation();
  };

  return (
    <StyledLink href={`/products/${_id}`}>
      <Box>
        <img src={netWorkImages[0] || netWorkImages[1]} alt="" />
      </Box>
      <ProductInfoBox>
        <Title>{title}</Title>
        <PriceRow>
          <Price>${price}</Price>
          <AddToCartBtn onClick={(e) => add(e, _id)}>
            {windowSize[0] > 768 ? "Add to cart" : "+"}
          </AddToCartBtn>
        </PriceRow>
      </ProductInfoBox>
    </StyledLink>
  );
}

export default ProductBox;
