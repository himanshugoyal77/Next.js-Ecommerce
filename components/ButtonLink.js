import Link from "next/link";
import React from "react";
import { buttonStyle } from "./PrimaryBtn";
import { styled } from "styled-components";

const StyledLink = styled(Link)`
  ${buttonStyle}
`;

function ButtonLink({  href, ...props }) {
  console.log("props inside btn", props);
  return <StyledLink {...props} href={href} />;
}

export default ButtonLink;
