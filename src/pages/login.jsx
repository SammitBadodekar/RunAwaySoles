import { useEffect, useState } from "react";
import useStore from "../app/cartStore";
import axios from "axios";

const login = () => {
  const loginSuccess = useStore((state) => state.login);
  const setItems = useStore((state) => state.setItems);
  const Logout = useStore((state) => state.logout);
  const authStatus = useStore((state) => state.auth);
  const [userInfo, setUserInfo] = useState([]);
  useEffect(() => {
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
    /* if (!userInfo || !userInfo._id) {
      fetchUser();
    } */
    fetchUser();
    return () => {
      isMounted = false;
    };
  }, [userInfo]);
  const googleLogin = () => {
    loginSuccess();
    window.open(
      "https://run-away-soles-backend.vercel.app/auth/google",
      "_self"
    );
  };
  const logout = () => {
    Logout();
    setUserInfo([]);
    setItems([]);
  };
  if (authStatus && userInfo) {
    return (
      <div className="mx-4 flex flex-col items-center justify-center gap-4 rounded-2xl p-4 pt-20 text-center shadow-2xl sm:px-40">
        <img src={userInfo?.imageUrl} alt="" className=" rounded-full" />

        <h3>{userInfo?.username}</h3>
        <p>{userInfo?.email}</p>
        <button className="btn p-3" onClick={logout}>
          Logout
        </button>
      </div>
    );
  }
  if (authStatus) {
    return (
      <div className="grid gap-4 p-4 pt-20 shadow-2xl sm:m-12 sm:p-8">
        <h1 className="w-full text-center text-2xl">Account Created !!!</h1>
        <button className="btn p-3" onClick={googleLogin}>
          Login with Google
        </button>
      </div>
    );
  }
  return (
    <div className="grid gap-4 p-4 pt-20 shadow-2xl sm:m-12 sm:p-8">
      <h1 className="w-full text-center text-3xl">Login</h1>
      <button className="btn p-3" onClick={googleLogin}>
        Login with Google
      </button>
    </div>
  );
};
export default login;
