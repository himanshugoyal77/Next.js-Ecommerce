import Center from "./Center";
import styled from "styled-components";
import PrimaryBtn from "./PrimaryBtn";
import ButtonLink from "./ButtonLink";
import CartIcon from "./icons/CartIcon";
import { useContext } from "react";
import { CartContext } from "./CartContext";

const Bg = styled.div`
  background-color: #222;
  padding: 50px 0;
  color: #fff;
`;

const Title = styled.h1`
  margin-top: 0;
  font-weight: normal;
  font-size: 1.5rem;
  @media screen and (min-width: 768px) {
    font-size: 3rem;
  }
`;

const ColumnWrapper = styled.div`
  display: grid;
  gap: 40px;
  img {
    max-width: 100%;
    max-height: 200px;
    display: block;
    margin: 0 auto;
  }
  div:nth-child(1) {
    order: 2;
    text-align: center;
  }
  @media screen and (min-width: 768px) {
    grid-template-columns: 0.9fr 1.1fr;
    div:nth-child(1) {
      order: 0;
      text-align: left;
    }
    img {
      max-width: 100%;
    }
  }
`;

const Desc = styled.p`
  color: #aaa;
  fontsize: 0.8rem;
`;

const Column = styled.div`
  display: flex;
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-top: 25px;

  @media screen and (min-width: 768px) {
    justify-content: flex-start;
  }
`;

function Featured({ product }) {
  const { addProductToCart } = useContext(CartContext);
  function addFeaturedProductToCart() {
    addProductToCart(product._id);
  }
  return (
    <Bg>
      <Center>
        <ColumnWrapper>
          <Column>
            <div className="">
              <Title>{product.title}</Title>
              <Desc>{product.description}</Desc>
              <ButtonWrapper>
                <ButtonLink
                  href={`products/${product._id}`}
                  white={1}
                  outline={1}
                >
                  Read more
                </ButtonLink>
                <PrimaryBtn white onClick={addFeaturedProductToCart}>
                  <CartIcon />
                  Shop now
                </PrimaryBtn>
              </ButtonWrapper>
            </div>
          </Column>
          <Column>
            <img src={product.netWorkImages[0]} alt="" />
          </Column>
        </ColumnWrapper>
      </Center>
    </Bg>
  );
}

export default Featured;
