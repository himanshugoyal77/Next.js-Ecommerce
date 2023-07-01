import { createGlobalStyle } from "styled-components";
import "../styles/globals.css";
import CartContextProvider from "../components/CartContext";

const GlobalStyles = createGlobalStyle`
@import url('https://fonts.googleapis.com/css2?family=Roboto&display=swap');
 body {
    background-color: #eee;
    margin: 0;
    padding: 0; 
    box-sizing: border-box;
    font-family: 'Roboto', sans-serif;
  }
`;

function MyApp({ Component, pageProps }) {
  return (
    <>
      <GlobalStyles />
      <CartContextProvider>
        <Component {...pageProps} />
      </CartContextProvider>
    </>
  );
}

export default MyApp;
