import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createGlobalStyle } from 'styled-components'
import App from './App';
import { store } from './redux/store';
import reportWebVitals from './reportWebVitals';
import { colorWhite } from './style/styled';


const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'PT Sans Caption', sans-serif;
  }

  .container {
    max-width: 1164px;
    margin: 0 auto;
    padding: 5px;
  }

  img {
    width: 100%;
  }

  body {
    background: ${colorWhite};
  }

  html {
    font-size: 12px
  }
`

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <GlobalStyle />
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
