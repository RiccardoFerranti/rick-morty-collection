import { createGlobalStyle } from 'styled-components'
import { TTheme } from './Theme';

const GlobalStyle = createGlobalStyle<{theme: TTheme}>`
  @import url('https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,300;0,400;0,600;0,700;1,300;1,400;1,600;1,700&display=swap');

 * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  body {
    background-color: ${({ theme }) => theme.colors.body};
    font-family: 'Open Sans', sans-serif;
    color: white;
  }
`

export default GlobalStyle;