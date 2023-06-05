import React, { useState, useRef, useEffect } from "react";
import logoImg from "../assets/svgs/Screenshot 2023-05-08 152832.png";
import shoppingCartSvg from "../assets/svgs/shopping_bag_FILL0_wght400_GRAD0_opsz48.svg";
import Hamburger from "hamburger-react";
import { Link } from "react-router-dom";
import useScrollToTop from "../hooks/useScrollToTop";
import useStore from "../app/cartStore";
import { auth } from "../firebase/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import axios from "axios";

const header = () => {
  const [isClicked, setIsClicked] = useState(false);
  const [isOpen, setOpen] = useState(false);
  const cartItems = useStore((state) => state.items);
  const authStatus = useStore((state) => state.auth);
  const setItems = useStore((state) => state.setItems);
  const setOrders = useStore((state) => state.setOrders);
  const setUser = useStore((state) => state.setUser);
  const PaymentSuccess = useStore((state) => state.paymentSuccess);
  const setPaymentStatus = useStore((state) => state.setPaymentStatus);
  const [user, loading] = useAuthState(auth);

  const handleMenu = () => {
    setIsClicked(!isClicked);
    setOpen(!isOpen);
    useScrollToTop();
  };
  useEffect(() => {
    const getUserInfoAndCartItems = async () => {
      setUser(user?.uid);
      try {
        if (user?.uid) {
          axios.get(
            `https://run-away-soles-backend.vercel.app/auth/user?uid=${user?.uid}&photoURL=${user?.photoURL}&displayName=${user?.displayName}&email=${user?.email}`
          );
        }
        const cartResponse = await axios.get(
          `https://run-away-soles-backend.vercel.app/users/${user?.uid}/cartItems`
        );
        const cartItems = cartResponse?.data[0]?.cart;
        const orderResponse = await axios.get(
          `https://run-away-soles-backend.vercel.app/users/${user?.uid}/orders`
        );
        const orderItems = orderResponse?.data[0]?.orders;

        if (PaymentSuccess) {
          setPaymentStatus(false);
          setOrders(orderItems);
          setItems([]);
          axios.put(
            `https://run-away-soles-backend.vercel.app/users/${user?.uid}/updateOrders`,
            [...cartItems, ...orderItems]
          );
          axios.put(
            `https://run-away-soles-backend.vercel.app/users/${user?.uid}/updateCartItems`,
            []
          );
        } else {
          setItems(cartItems || []);
          setOrders(orderItems || []);
        }
      } catch (error) {
        console.log(error);
      }
    };

    getUserInfoAndCartItems();
  }, [user, PaymentSuccess]);
  return (
    <nav
      className={`navbar fixed top-0 z-10 flex w-screen justify-between bg-light-0 px-10 shadow-xl`}
    >
      <Link to="/" onClick={useScrollToTop}>
        <img
          src={logoImg}
          alt=""
          className="object-contains my-1 h-12 w-24 p-1"
        />
      </Link>

      <div
        className={`navlinks z-10 flex gap-5 bg-light-0 py-3 text-center font-paragraph text-xl
         ${isClicked ? "open gap-10 p-10" : ""}`}
        onClick={handleMenu}
      >
        <Link to="/">HOME</Link>
        <Link to="/shop">SHOP</Link>
        <Link to="/orders">{authStatus ? "ORDERS" : ""}</Link>
        <Link to="/login">{authStatus ? "PROFILE" : "LOGIN"}</Link>
      </div>

      <div className="flex gap-3">
        <Link to="/cart">
          <div className="relative flex gap-2">
            <img
              src={shoppingCartSvg}
              alt=""
              className="h-12 w-12 pt-2 sm:h-12 sm:w-12 "
            />
            <span
              className={`absolute bottom-0 right-0 -my-1 h-fit w-fit rounded-full bg-navbar-0 px-2 font-paragraph text-sm text-light-0 sm:right-1  sm:-my-1 sm:px-1 ${
                cartItems?.length === 0 ? "hidden" : ""
              }`}
            >
              {cartItems?.length || 0}
            </span>
          </div>
        </Link>

        <div className="hamburger-button z-10 py-3" onClick={handleMenu}>
          <Hamburger color="#000" onClick={handleMenu} toggled={isOpen} />
        </div>
      </div>
    </nav>
  );
};
export default header;
