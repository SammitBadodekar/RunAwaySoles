import React from "react";
import ReactDOM from "react-dom/client";
import "./styles/index.css";
import "./styles/mediaQueries.css";
import Header from "./components/header";

import Home from "./pages/home.jsx";
import Shop from "./pages/shop.jsx";
import Products from "./pages/products";
import Cart from "./pages/cart";
import Orders from "./pages/orders";
import Login from "./pages/login";
import PaymentSuccess from "./pages/PaymentSuccess";
import PageNotFound from "./pages/PageNotFound.jsx";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { disableReactDevTools } from "@fvilers/disable-react-devtools";

if (process.env.NODE_ENV === "production") disableReactDevTools();

ReactDOM.createRoot(document.getElementById("root")).render(
  <Router>
    <Header />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/shop" element={<Shop />} />
      <Route path="/products/:id" element={<Products />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/orders" element={<Orders />} />
      <Route path="/login" element={<Login />} />
      <Route path="/success" element={<PaymentSuccess />} />
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  </Router>
);
