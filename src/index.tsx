import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {FirebaseAppProvider} from "reactfire";

const firebaseConfig = {
    apiKey: "AIzaSyAeCq1p5ovMW4VYF4knm_cohmNbzpog1MM",
    authDomain: "opinion-8c863.firebaseapp.com",
    projectId: "opinion-8c863",
    storageBucket: "opinion-8c863.appspot.com",
    messagingSenderId: "1024143246484",
    appId: "1:1024143246484:web:356d9be8972866684fa081",
    measurementId: "G-MH5473PDJF"
};

ReactDOM.render(
  <React.StrictMode>
      <FirebaseAppProvider firebaseConfig={firebaseConfig}>
          <App />
      </FirebaseAppProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
