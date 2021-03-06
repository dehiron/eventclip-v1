import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
//注意：redux-persistを使ったconfigureStoreを作成したことにより、ここは使わなくなった
// import createStore from './reducks/store/store';
import './index.css';
import App from './App';
import store, { persistor } from './reducks/store/configureStore';
import reportWebVitals from './reportWebVitals';

//注意：redux-persistを使ったconfigureStoreを作成したことにより、ここは使わなくなった
//これで初めてreduxのstoreが作成される
// export const store = createStore();

ReactDOM.render(
  // Providerでラップしたコンポーネント（App=全てのコンポーネント）内でstoreの情報へ参照出来る様になる。
  // App配下でreac-reduxのconnect関数を使える様になり、storeの情報更新ができる様になる。
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
    <App />
    </PersistGate>
  </Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
