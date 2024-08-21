import GoogleFontLoader from 'react-google-font-loader';

import { createGlobalStyle } from 'styled-components'

const GlobalStyle = createGlobalStyle`
  html, body, div, span, applet, object, iframe,
  h1, h2, h3, h4, h5, h6, p, blockquote, pre,
  a, abbr, acronym, address, big, cite, code,
  del, dfn, em, img, ins, kbd, q, s, samp,
  small, strike, strong, sub, sup, tt, var,
  b, u, i, center,
  dl, dt, dd, ol, ul, li,
  fieldset, form, label, legend,
  table, caption, tbody, tfoot, thead, tr, th, td,
  article, aside, canvas, details, embed, 
  figure, figcaption, footer, header, hgroup, 
  menu, nav, output, ruby, section, summary,
  time, mark, audio, video {
    margin: 0;
    padding: 0;
    border: 0;
    font-size: 100%;
    vertical-align: baseline;
  }
  article, aside, details, figcaption, figure, 
  footer, header, hgroup, menu, nav, section {
    display: block;
  }
  body {
    line-height: 1;
  }
  ol, ul {
    list-style: none;
  }
  blockquote, q {
    quotes: none;
  }
  blockquote:before, blockquote:after,
  q:before, q:after {
    content: '';
    content: none;
  }
  table {
    border-collapse: collapse;
    border-spacing: 0;
  }
  h1{
    font-weight: 400
  }

  * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
      font-family:  'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
      outline: 0;
  }
  a {
      cursor: pointer;
  }
  body {
      min-height: -webkit-fill-available;
      scroll-behavior: smooth;
  }
  html {
      height: -webkit-fill-available;
      scroll-behavior: smooth;
  }
  
  button:not(:disabled) {
    cursor: pointer;
  }

 
  ::-webkit-scrollbar {
    width: 4px;
    height: 10px;
  }
  
  ul::-webkit-scrollbar {
    height: 5px;
  }

  /* Track */
  ::-webkit-scrollbar-track {
    background: #F5F5F5;
  }

  ul::-webkit-scrollbar-track {
    background-color: transparent;
  }
  
  /* Handle */
  ::-webkit-scrollbar-thumb {
    background: #58606C;
    border-radius: 5px;
  }

  /* Handle on hover */
  ::-webkit-scrollbar-thumb:hover {
    background: #474C53;
  }
  
  ::placeholder {
      color: #D8D8D8;
      opacity: 1; /* Chrome, Firefox, Opera, Safari 10.1+ */
  }

  :-ms-input-placeholder { /* Internet Explorer 10-11 */
      color: #D8D8D8;
  }

  ::-ms-input-placeholder { /* Microsoft Edge */
      color: #D8D8D8;
  }
`
const googleFonts = [
  {
    font: 'Roboto',
    weights: [100, 300, 400, 500, 700],
  },
]

const GlobalStyles = () => (
  <>
    <GlobalStyle />
    <GoogleFontLoader fonts={googleFonts} />
  </>
);

export default GlobalStyles;