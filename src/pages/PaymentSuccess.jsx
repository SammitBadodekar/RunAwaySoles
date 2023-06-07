import successSvg from "../assets/svgs/check_circle_FILL0_wght400_GRAD0_opsz48.svg";
import useStore from "../app/cartStore";
import { Link } from "react-router-dom";
import { auth } from "../firebase/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useEffect } from "react";
import axios from "axios";

const PaymentSuccess = () => {
  const setPaymentStatus = useStore((state) => state.setPaymentStatus);
  const [user, loading] = useAuthState(auth);

  useEffect(() => {
    setPaymentStatus(true);
    axios.get(
      `https://run-away-soles-backend.vercel.app/${user?.uid}/ordersuccess`
    );
  }, [user]);

  return (
    <div className="grid gap-10 pt-20 text-center">
      <div className="flex flex-col items-center">
        <img src={successSvg} alt="" className=" h-40 w-40 self-center" />
        <h1 className=" text-xl font-extrabold">Payment Successful</h1>
      </div>
      <h2>
        You will receive your order on{" "}
        <span className="text-lg underline sm:text-xl">{user?.email}</span>
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
