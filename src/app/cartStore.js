import { create } from "zustand";
import Cookies from "js-cookie";
import { auth } from "../firebase/firebase";

const cartStore = (set) => ({
  items: [],
  user: Cookies.get("userId") || "",
  orders: [],
  auth: Cookies.get("auth") === "true",
  paymentSuccess: Cookies.get("paymentSuccess") === "true",

  setItems: (item) => {
    set((state) => ({
      items: item,
    }));
  },
  setOrders: (item) => {
    set((state) => ({
      orders: item,
    }));
  },
  setUser: (item) => {
    Cookies.set("userId", `${item}`);
    set((state) => ({
      user: item,
    }));
  },
  setPaymentStatus: (status) => {
    Cookies.set("paymentSuccess", `${status}`);
    set((state) => ({
      paymentSuccess: status,
    }));
  },
  addItems: (item) => {
    return new Promise((resolve) => {
      set((state) => ({
        items: [item, ...state.items],
      }));
      resolve();
    });
  },

  removeItems: (itemId) => {
    return new Promise((resolve) => {
      set((state) => ({
        items: state.items.filter((item) => item._id !== itemId),
      }));
      resolve();
    });
  },
  login: () => {
    Cookies.set("auth", "true", { expires: 1 });
    set((state) => ({
      auth: true,
    }));
  },
  logout: () => {
    Cookies.remove("auth");
    auth.signOut();
    set((state) => ({
      auth: false,
    }));
  },
});

const useStore = create(cartStore);

export default useStore;
