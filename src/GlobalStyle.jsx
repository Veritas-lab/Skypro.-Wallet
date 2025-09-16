import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  body {
    font-family: 'Montserrat', sans-serif; 
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    background-color: #f9f9f9; 
    color: #333; 
  }

  * {
    box-sizing: inherit; 
  }
`;

export default GlobalStyle;
