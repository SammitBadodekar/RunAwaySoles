import useStore from "../app/cartStore";
import { Link } from "react-router-dom";
import useScrollToTop from "../hooks/useScrollToTop";
import { useEffect, useMemo, useState } from "react";
import deleteSvg from "../assets/svgs/delete_FILL0_wght400_GRAD0_opsz48.svg";
import axios from "axios";

const cart = () => {
  const cartItems = useStore((state) => state.items);
  const [userInfo, setUserInfo] = useState([]);
  const authStatus = useStore((state) => state.auth);
  const removeItem = useStore((state) => state.removeItems);
  const addItem = useStore((state) => state.addItems);
  let totalPrice = useMemo(() => {
    return cartItems?.reduce(
      (acc, item) => acc + parseInt(item?.price) * item.quantity,
      0
    );
  }, [cartItems]);
  useScrollToTop();

  useEffect(() => {
    let isMounted = true;
    const fetchUser = () => {
      axios
        .get("http://localhost:3000/auth/login/success", {
          withCredentials: true,
        })
        .then((response) => {
          setUserInfo(response.data[0]);
        });
    };
    if (!userInfo || !userInfo._id) {
      fetchUser();
    }

    return () => {
      isMounted = false;
    };
  }, [userInfo]);

  const deleteItem = (id) => {
    removeItem(id);
    const updatedCart = cartItems.filter((item) => item._id !== id);
    axios.put(
      `http://localhost:3000/users/${userInfo?._id}/updateCartItems`,
      updatedCart
    );
  };
  const updateQuantity = (operation, item) => {
    if (operation === "minus" && item.quantity === 1) return;

    if (operation === "minus") {
      const newQuantity = item.quantity - 1;
      const updatedItem = {
        name: item.name,
        img: item.img,
        _id: item._id,
        price: item.price,
        quantity: newQuantity,
      };
      removeItem(item._id);
      addItem(updatedItem);
      axios.put(
        `http://localhost:3000/users/${userInfo?._id}/updateCartItems`,
        cartItems
      );
    }
    if (operation === "plus") {
      const newQuantity = item.quantity + 1;
      const updatedItem = {
        name: item.name,
        img: item.img,
        _id: item._id,
        price: item.price,
        quantity: newQuantity,
      };
      removeItem(item._id);
      addItem(updatedItem);
      axios.put(
        `http://localhost:3000/users/${userInfo?._id}/updateCartItems`,
        cartItems
      );
    }
  };

  if (authStatus) {
    return (
      <section className="bg-light-0 p-3 pb-20 pt-20 sm:m-12 sm:h-screen sm:rounded-3xl">
        <h1>Hi {userInfo.username} </h1>
        <div className="grid gap-4 p-1 pt-4 sm:grid-cols-2 sm:p-10">
          {cartItems?.map((item) => {
            return (
              <article
                key={item?._id}
                className="flex gap-4 rounded-lg p-1 align-middle shadow-lg"
                onClick={useScrollToTop}
              >
                <Link to={`/products/${item?._id}`}>
                  <img
                    src={item?.img}
                    alt=""
                    className=" h-20 w-16 rounded-md object-cover"
                  />
                </Link>

                <div>
                  <Link to={`/products/${item?._id}`}>
                    <p>{item?.name}</p>
                  </Link>

                  <h2 className=" font-logo">${item?.price}</h2>
                  <section className="flex  items-center justify-between pt-3 leading-3 sm:pt-4">
                    <div className="flex gap-1 ">
                      <button
                        className="btn  p-1 "
                        onClick={() => updateQuantity("minus", item)}
                      >
                        -
                      </button>
                      <p>{item?.quantity}</p>
                      <button
                        className="btn p-1"
                        onClick={() => updateQuantity("plus", item)}
                      >
                        +
                      </button>
                    </div>

                    <button
                      onClick={() => {
                        deleteItem(item?._id);
                      }}
                    >
                      <img src={deleteSvg} alt="" className=" w-6 pt-2" />
                    </button>
                  </section>
                </div>
              </article>
            );
          })}
        </div>
        <h2 className=" fixed bottom-0 w-screen bg-light-0 p-2">
          Total:<span className=" font-logo text-3xl"> ${totalPrice}</span>{" "}
        </h2>
      </section>
    );
  }
  return <div className=" pt-20 text-3xl">Login to View Cart...</div>;
};

export default cart;
