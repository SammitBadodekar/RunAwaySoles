import { create } from "zustand";
import Cookies from "js-cookie";

const cartStore = (set) => ({
  items: [],
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
    set((state) => ({
      auth: false,
    }));
  },
});

const useStore = create(cartStore);

export default useStore;
