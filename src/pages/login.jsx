import useStore from "../app/cartStore";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../firebase/firebase";
import { useAuthState } from "react-firebase-hooks/auth";

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
      <div className="mx-4 mt-32 flex flex-col items-center justify-center gap-4 rounded-2xl p-4 text-center shadow-2xl sm:px-40">
        <img src={user?.photoURL} alt="" className=" rounded-full" />

        <h3>{user?.displayName}</h3>
        <p>{user?.email}</p>
        <button className="btn p-3" onClick={logout}>
          Logout
        </button>
      </div>
    );
  }
  if (authStatus && loading) {
    return (
      <div className="m-4 mt-32 flex flex-col rounded-2xl shadow-2xl sm:m-12">
        <div className=" h-28 w-28 animate-bounce self-center rounded-full bg-slate-100 shadow-xl"></div>
        <div className=" m-4 h-8 animate-bounce rounded-lg bg-slate-100 shadow-xl sm:mx-40"></div>
        <div className=" m-4 h-8 animate-bounce rounded-lg bg-slate-100 shadow-xl sm:mx-40"></div>
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
