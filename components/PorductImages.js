import React, { useState } from "react";
import styled, { css } from "styled-components";

const StyledImage = styled.img`
  max-width: 100%;
  max-height: 100%;
`;

const BigImage = styled.img`
  max-width: 100%;
  max-height: 200px;
`;

const ImageButtons = styled.div`
  display: flex;
  gap: 10px;
  flex-grow: 0;
  margin-top: 10px;
  align-center: center;
  justify-content: center;
`;

const ImageButton = styled.div`
  border: 1px solid #ccc;
  ${(props) =>
    props.active
      ? css`
          border-color: red;
        `
      : css`
          border-color: transparent;
          opacity: 0.8px;
        `}
  height: 40px;
  padding: 2px;
  cursor: pointer;
  border-radius: 5px;
`;

const BigWrapper = styled.div`
  text-align: center;
`;

function PorductImages({ images }) {
  const [activeImage, setActiveImage] = useState(images?.[0]);
  return (
    <>
      <BigWrapper>
        <BigImage src={activeImage} alt="" />
      </BigWrapper>
      <ImageButtons>
        {images.map((image) => {
          return (
            <ImageButton
              active={activeImage === image ? true : false}
              onClick={() => setActiveImage(image)}
            >
              <StyledImage src={image} alt="" />
            </ImageButton>
          );
        })}
      </ImageButtons>
    </>
  );
}

export default PorductImages;
