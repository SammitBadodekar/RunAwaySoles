import { create } from "zustand";
import Cookies from "js-cookie";

const cartStore = (set) => ({
  items: [],
  auth: Cookies.get("auth") === "true",

  setItems: (item) => {
    set((state) => ({
      items: item,
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
