import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { Provider } from "react-redux";
import store from './store'
import { BrowserRouter } from 'react-router-dom';
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
    apiKey: "AIzaSyC-C_EejnYAoDo1QylOSKjYVoCTQvPtOgE",
    authDomain: "myblog-747a3.firebaseapp.com",
    projectId: "myblog-747a3",
    storageBucket: "myblog-747a3.appspot.com",
    messagingSenderId: "78050141069",
    appId: "1:78050141069:web:fcc9748eab236bc71393c4",
    measurementId: "G-SVJXQHFWNH"
};

// Initialize Firebase
initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

const root = ReactDOM.createRoot(document.getElementById("app"));
root.render(
    <BrowserRouter>
        <Provider store={store}>
            <App />
        </Provider>
    </BrowserRouter>
);