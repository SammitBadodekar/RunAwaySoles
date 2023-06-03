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
        .get("https://run-away-soles-backend.vercel.app/auth/login/success", {
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
      `https://run-away-soles-backend.vercel.app/users/${userInfo?._id}/updateCartItems`,
      updatedCart
    );
  };

  const checkOut = async () => {
    axios
      .post(
        `https://run-away-soles-backend.vercel.app/create-checkout-session`,
        cartItems
      )
      .then((response) => {
        window.location.href = response.data.url;
      });
  };

  if (authStatus) {
    return (
      <section className="bg-light-0 p-3 pb-20 pt-20 sm:m-12 sm:h-screen sm:rounded-3xl sm:pt-16">
        <article className=" sm: rounded-xl bg-slate-200 p-4 font-paragraph text-xs sm:text-base">
          <p>
            Use Card: <span className=" font-heading">4242 4242 4242 4242</span>{" "}
            to get{" "}
            <span className=" font-logo text-xl  sm:text-2xl"> 100% </span>off
          </p>
          <p>Country: United States</p>
          <p>Any CVV and Address</p>
        </article>
        <div className="grid gap-4 p-1 pt-4 sm:grid-cols-2 sm:p-10">
          {cartItems?.map((item) => {
            return (
              <article
                key={item?._id}
                className="relative flex gap-4 rounded-lg p-1 align-middle shadow-lg"
                onClick={useScrollToTop}
              >
                <Link to={`/products/${item?._id}`}>
                  <img
                    src={item?.img}
                    alt=""
                    className=" h-20 w-16 rounded-md object-cover"
                  />
                </Link>
                <div className="flex flex-col ">
                  <Link to={`/products/${item?._id}`}>
                    <p>{item?.name}</p>
                  </Link>
                  <h2 className=" font-logo">${item?.price}</h2>
                </div>{" "}
                <button
                  onClick={() => {
                    deleteItem(item?._id);
                  }}
                  className=" absolute bottom-2 right-2"
                >
                  <img src={deleteSvg} alt="" className=" w-6 " />
                </button>
              </article>
            );
          })}
        </div>
        <div className="fixed bottom-0 left-0 right-0 flex justify-between bg-light-0 p-2">
          <h2>
            Total:<span className=" font-logo text-3xl"> ${totalPrice}</span>
          </h2>
          <button
            className={`btn p-2 ${cartItems?.length === 0 ? "hidden" : ""}`}
            onClick={checkOut}
          >
            Check Out
          </button>
        </div>
      </section>
    );
  }
  return <div className=" pt-20 text-3xl">Login to View Cart...</div>;
};

export default cart;
