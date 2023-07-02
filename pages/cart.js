import React, { useContext, useEffect, useState } from "react";
import Header from "../components/Header";
import { styled } from "styled-components";
import PrimaryBtn from "../components/PrimaryBtn";
import { CartContext } from "../components/CartContext";
import Center from "../components/Center";
import axios from "axios";
import Table from "../components/Table";
import Input from "../components/Input";

const ColumnWrapper = styled.div`
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  @media screen and (min-width: 768px) {
    display: grid;
    grid-template-columns: 1.2fr 0.8fr;
    gap: 40px;
    margin-top: 40px;
  }
`;

const ProductsInfoCell = styled.td`
  padding: 10px 0;
`;

const Box = styled.div`
  background-color: #fff;
  border-radius: 10px;
  padding: 20px 30px 30px;
`;

const ProductImageBox = styled.div`
  img {
    max-width: 80px;
    max-height: 80px;
    padding: 10px;
    border: 1px solid rgba(0, 0, 0, 0.1);
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    img {
      max-width: 60px;
      max-height: 60px;
      object-fit: contain;
    }
  }
`;

const CityHolder = styled.div`
  display: flex;
  gap: 5px;
`;

const QunatityLabel = styled.span`
  padding: 0 3px;
`;

const QunatityBtn = styled.button`
  border: none;
  color: #000;
  padding: 4px 10px;
  border-radius: 4px;
  cursor: pointer;
`;

const StyledImage = styled.img`
  display: block;
  height: 100%;
  width: 100%;
  margin: 0 auto;
  max-width: 80px;
  max-height: 80px;
  padding: 10px;
`;

function CartPage() {
  const { cartProducts, addProductToCart, renoveProductFromCart, clearCart } =
    useContext(CartContext);
  const [products, setProducts] = useState([]);
  const [paymentInfo, setPaymentInfo] = useState({
    name: "",
    email: "",
    city: "",
    postalCode: "",
    streetAddress: "",
    country: "",
  });
  useEffect(() => {
    axios
      .post("/api/cart", {
        ids: cartProducts,
      })
      .then((res) => {
        setProducts(res.data);
      });
  }, [cartProducts]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window?.location.href.includes("success")) {
      clearCart();
    }
  }, []);

  const handleIncrease = (id) => {
    addProductToCart(id);
  };

  const handleDecrease = (id) => {
    renoveProductFromCart(id);
  };

  const handleChange = (e) => {
    e.preventDefault();

    setPaymentInfo((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  };
  const { name, email, city, postalCode, streetAddress, country } = paymentInfo;
  const goToPayment = async () => {
    const res = await axios.post("/api/checkout", {
      name,
      email,
      city,
      postalCode,
      streetAddress,
      country,
      cartProducts,
    });

    if (res.data.url) {
      window.location = res.data.url;
    }
  };

  let total = 0;

  for (const productId of cartProducts) {
    const price = products.find((p) => p._id == productId)?.price || 0;

    total += price;
  }

  return (
    <div>
      <Header />
      <Center>
        <ColumnWrapper>
          <Box>
            {!cartProducts.length && (
              <StyledImage
                src={"https://hsnbazar.com/images/empty-cart.png"}
                alt=""
              />
            )}
            {products.length > 0 && (
              <>
                <h2>Cart</h2>
                <Table>
                  <thead>
                    <tr>
                      <th>Product</th>
                      <th>Quantity</th>
                      <th>Price</th>
                    </tr>
                  </thead>
                  <tbody>
                    {products.map((product) => {
                      return (
                        <tr key={product._id}>
                          <ProductsInfoCell>
                            <ProductImageBox>
                              <img src={product.netWorkImages[0]} alt="" />
                            </ProductImageBox>
                            {product.title}
                          </ProductsInfoCell>
                          <td>
                            <QunatityBtn
                              onClick={() => handleDecrease(product._id)}
                            >
                              -
                            </QunatityBtn>
                            <QunatityLabel>
                              {
                                cartProducts.filter((id) => id === product._id)
                                  .length
                              }
                            </QunatityLabel>
                            <QunatityBtn
                              onClick={() => handleIncrease(product._id)}
                            >
                              +
                            </QunatityBtn>
                          </td>
                          <td>
                            $
                            {cartProducts.filter((id) => id === product._id)
                              .length * product.price}
                          </td>
                        </tr>
                      );
                    })}
                    <tr>
                      <td></td>
                      <td></td>
                      <td
                        style={{
                          fontWeight: "bold",
                          fontSize: "1.2rem",
                        }}
                      >
                        ${total}
                      </td>
                    </tr>
                  </tbody>
                </Table>
              </>
            )}
          </Box>
          {!!cartProducts.length && (
            <Box>
              <h2>Order Information</h2>

              <Input
                type="text"
                name="name"
                required
                placeholder="Name"
                value={paymentInfo.name}
                onChange={handleChange}
              />
              <Input
                type="email"
                name="email"
                required
                placeholder="Email"
                value={paymentInfo.email}
                onChange={handleChange}
              />
              <CityHolder>
                <Input
                  type="text"
                  name="city"
                  required
                  placeholder="City"
                  value={paymentInfo.city}
                  onChange={handleChange}
                />
                <Input
                  type="text"
                  name="postalCode"
                  required
                  placeholder="Postal Code"
                  value={paymentInfo.postalCode}
                  onChange={handleChange}
                />
              </CityHolder>
              <Input
                type="text"
                name="streetAddress"
                placeholder="Street Address"
                value={paymentInfo.streetAddress}
                onChange={handleChange}
              />
              <Input
                type="text"
                name="country"
                required
                placeholder="Country"
                value={paymentInfo.country}
                onChange={handleChange}
              />
              <input
                type="hidden"
                name="products"
                value={cartProducts.join(",")}
              />
              <PrimaryBtn block black onClick={goToPayment}>
                Continue to payment
              </PrimaryBtn>
            </Box>
          )}
        </ColumnWrapper>
      </Center>
    </div>
  );
}

export default CartPage;
