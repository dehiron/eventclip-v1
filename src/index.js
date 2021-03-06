import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import createStore from './reducks/store/store';
// import { ConnectedRouter } from 'connected-react-router';
// import * as History from 'history';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

//パスの情報を履歴として作成
// const history = History.createBrowserHistory();
//これで初めてreduxのstoreが作成される
export const store = createStore();

ReactDOM.render(
  // Providerでラップしたコンポーネント（App=全てのコンポーネント）内でstoreの情報へ参照出来る様になる。
  // App配下でreac-reduxのconnect関数を使える様になり、storeの情報更新ができる様になる。
  <Provider store={store}>
    {/* <ConnectedRouter history={history}> */}
      <App />
    {/* </ConnectedRouter> */}
  </Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
