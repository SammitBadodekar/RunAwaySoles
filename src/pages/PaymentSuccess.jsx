import successSvg from "../assets/svgs/check_circle_FILL0_wght400_GRAD0_opsz48.svg";
import { useState, useEffect } from "react";
import axios from "axios";
import useStore from "../app/cartStore";
import { Link } from "react-router-dom";

const PaymentSuccess = () => {
  const [userInfo, setUserInfo] = useState([]);
  const setPaymentStatus = useStore((state) => state.setPaymentStatus);

  useEffect(() => {
    setPaymentStatus(true);

    let isMounted = true;
    const fetchUser = () => {
      axios
        .get("https://run-away-soles-backend.vercel.app/auth/login/success", {
          withCredentials: true,
        })
        .then((response) => {
          setUserInfo(response.data[0]);
        })
        .catch((error) => console.log(error));
    };
    if ((!userInfo || !userInfo._id) && isMounted) {
      fetchUser();
    }

    return () => {
      isMounted = false;
    };
  }, [userInfo]);

  return (
    <div className="grid gap-10 pt-20 text-center">
      <div className="flex flex-col items-center">
        <img src={successSvg} alt="" className=" h-40 w-40 self-center" />
        <h1 className=" text-xl font-extrabold">Payment Successful</h1>
      </div>
      <h2>
        You will receive your order on{" "}
        <span className="text-lg underline sm:text-xl">{userInfo?.email}</span>
      </h2>
      <h2>
        See Your{" "}
        <Link
          to="/orders"
          className=" text-xl font-bold underline underline-offset-2"
        >
          ORDERS
        </Link>
      </h2>
    </div>
  );
};
export default PaymentSuccess;
