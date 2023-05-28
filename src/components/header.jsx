import React, { useState, useRef, useEffect } from "react";
import logoImg from "../assets/svgs/Screenshot 2023-05-08 152832.png";
import shoppingCartSvg from "../assets/svgs/shopping_bag_FILL0_wght400_GRAD0_opsz48.svg";
import Hamburger from "hamburger-react";
import { Link } from "react-router-dom";
import useScrollToTop from "../hooks/useScrollToTop";
import useStore from "../app/cartStore";
import axios from "axios";

const header = () => {
  const [isClicked, setIsClicked] = useState(false);
  const [isOpen, setOpen] = useState(false);
  const [userInfo, setUserInfo] = useState([]);
  const cartItems = useStore((state) => state.items);
  const authStatus = useStore((state) => state.auth);
  const setItems = useStore((state) => state.setItems);

  const handleMenu = () => {
    setIsClicked(!isClicked);
    setOpen(!isOpen);
    useScrollToTop();
  };
  useEffect(() => {
    let isMounted = true;

    const getUserInfoAndCartItems = async () => {
      try {
        const response = await axios.get(
          "http://runawaysoles-backend.onrender.com/auth/login/success",
          {
            withCredentials: true,
          }
        );
        const userInfo = await response.data[0];
        if (isMounted) {
          setUserInfo(userInfo);
        }

        const cartResponse = await axios.get(
          `http://runawaysoles-backend.onrender.com/users/${userInfo._id}/cartItems`
        );
        const cartItems = cartResponse?.data[0]?.cart;
        setItems(cartItems);
      } catch (error) {
        window.location.href = "/Error";
      }
    };

    if (!userInfo || !userInfo._id || cartItems === []) {
      getUserInfoAndCartItems();
    }

    return () => {
      isMounted = false;
    };
  }, [userInfo]);
  return (
    <nav
      className={`navbar fixed top-0 z-10 flex w-screen justify-between bg-light-0 px-10`}
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
