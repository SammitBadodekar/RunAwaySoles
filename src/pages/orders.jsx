import useStore from "../app/cartStore";
import { Link } from "react-router-dom";
import useScrollToTop from "../hooks/useScrollToTop";
import loginSvg from "../assets/svgs/6310507.jpg";
import { v4 as uuidv4 } from "uuid";

const orders = () => {
  const orders = useStore((state) => state.orders);
  const authStatus = useStore((state) => state.auth);

  useScrollToTop();

  const orderItems = Object.values(orders);

  if (authStatus) {
    return (
      <section className="bg-light-0 p-3 pb-20 pt-20 sm:m-12 sm:h-screen sm:rounded-3xl">
        <h1>
          Doesn't see your orders ? <br /> Try refreshing...
        </h1>
        <div className="grid gap-2 p-1 pt-8 sm:grid-cols-2 sm:p-10">
          {orderItems?.map((item) => {
            return (
              <article
                key={uuidv4()}
                className={`relative flex gap-4 rounded-lg p-1 align-middle shadow-lg  `}
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
                </div>
              </article>
            );
          })}
        </div>
      </section>
    );
  }
  return (
    <div className="flex flex-col items-center pt-16 text-xl">
      <img
        src={loginSvg}
        alt="Login To Continue"
        className=" h-80 w-screen object-contain"
      />
      <Link
        to="/login"
        className=" w-20 rounded-xl bg-navbar-0 p-2 text-light-0"
      >
        Login
      </Link>
    </div>
  );
};

export default orders;
