import React, { useEffect } from "react";
import Center from "../../components/Center";
import { useRouter } from "next/router";
import Header from "../../components/Header";
import { styled } from "styled-components";
import axios from "axios";

const Title = styled.h1`
  font-size: 1.5em;
`;

function SingleProductPage() {
  useEffect(() => {
    const getData = async () => {
      const res = await axios.post("/api/cart", {
        ids: id,
      });
      console.log(res.data);
    };
    getData();
  }, []);

  const router = useRouter();
  const { id } = router.query;
  return (
    <>
      <Header />
      <Center>
        <Title>Product: {id}</Title>
      </Center>
    </>
  );
}

export default SingleProductPage;
