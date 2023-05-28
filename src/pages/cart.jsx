import useStore from "../app/cartStore";
import { Link } from "react-router-dom";
import useScrollToTop from "../hooks/useScrollToTop";
import { useMemo } from "react";

const cart = () => {
  const cartItems = useStore((state) => state.items);
  const authStatus = useStore((state) => state.auth);
  const totalPrice = useMemo(() => {
    return cartItems?.reduce((acc, item) => acc + parseInt(item?.price), 0);
  }, [cartItems]);
  useScrollToTop();
  if (authStatus) {
    return (
      <section className="bg-light-0 p-3 pb-20 pt-20 sm:m-12 sm:h-screen sm:rounded-3xl">
        <h1>You have {cartItems?.length || 0} items in your cart</h1>
        <div className="grid gap-4 p-1 sm:grid-cols-2 sm:p-10">
          {cartItems?.map((item) => {
            return (
              <Link
                to={`/products/${item?._id}`}
                key={item?._id}
                className="flex gap-4 rounded-lg p-1 align-middle shadow-lg"
                onClick={useScrollToTop}
              >
                <img
                  src={item?.img}
                  alt=""
                  className=" h-20 w-16 rounded-md object-cover"
                />
                <div>
                  <p>{item?.name}</p>
                  <p>QTY:{item?.quantity}</p>
                  <h2 className=" font-logo">${item?.price}</h2>
                </div>
              </Link>
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
