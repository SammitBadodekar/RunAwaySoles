import useStore from "../app/cartStore";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../firebase/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { FcGoogle } from "react-icons/fc";
import { IoLogoFacebook } from "react-icons/Io";

const login = () => {
  const loginSuccess = useStore((state) => state.login);
  const setItems = useStore((state) => state.setItems);
  const Logout = useStore((state) => state.logout);
  const authStatus = useStore((state) => state.auth);
  const googleAuthProvider = new GoogleAuthProvider();
  const [user, loading] = useAuthState(auth);

  const googleLogin = async () => {
    loginSuccess();
    try {
      const result = await signInWithPopup(auth, googleAuthProvider);
    } catch (error) {
      console.log(error);
    }
  };
  const logout = () => {
    Logout();
    setItems([]);
  };
  if (authStatus && user) {
    return (
      <div className="login flex h-screen items-start justify-start pt-28">
        <div className="mx-4 flex flex-col items-center justify-start gap-4 rounded-2xl bg-menu-0 p-4 shadow-2xl sm:mx-20">
          <img src={user?.photoURL} alt="" className=" rounded-full" />
          <h3>{user?.displayName}</h3>
          <p>{user?.email}</p>
          <button className="btn p-3" onClick={logout}>
            Logout
          </button>
        </div>
      </div>
    );
  }
  if (authStatus) {
    return (
      <div className="mx-4 mt-32 flex flex-col rounded-2xl p-4 shadow-2xl sm:m-12 sm:mx-40">
        <div className=" h-28 w-28 animate-bounce self-center rounded-full bg-slate-100 shadow-xl"></div>
        <div className=" m-4 h-8 animate-bounce rounded-lg bg-slate-100 shadow-xl sm:mx-40"></div>
        <div className=" m-4 h-8 animate-bounce rounded-lg bg-slate-100 shadow-xl sm:mx-40"></div>
        <button className="btn w-40 self-center p-2" onClick={logout}>
          Logout
        </button>
      </div>
    );
  }
  return (
    <div className="login flex h-screen justify-center gap-4 p-4 pt-20 sm:justify-start sm:p-8 sm:pt-20">
      <div className=" flex h-80 w-96 flex-col items-center rounded-2xl bg-menu-0">
        <h1 className="w-full  text-center  font-heading text-3xl sm:w-80">
          Login
        </h1>
        <button
          className="m-4 mt-16 flex w-52 items-center gap-2 rounded-lg bg-light-0 p-2 text-left shadow-xl sm:w-64"
          onClick={googleLogin}
        >
          <FcGoogle />
          Google
        </button>
        <button className="m-2 flex w-52 items-center gap-2 rounded-lg bg-light-0 p-2 text-left shadow-xl sm:w-64">
          <IoLogoFacebook />
          Facebook
        </button>
      </div>
    </div>
  );
};
export default login;
