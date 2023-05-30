import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import useScrollToTop from "../hooks/useScrollToTop";

const fetchShoes = (props) => {
  const { name, url, redirect } = props;
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    axios.get(`http://localhost:3000/${url}${name}`).then((response) => {
      setItems(response.data);
      setIsLoading(false);
    });
  }, []);
  if (isLoading) {
    return (
      <div className=" grid h-screen w-screen grid-cols-2 items-center justify-center gap-4 sm:grid-cols-4 sm:p-10">
        <section className="w-30 grid h-52 animate-bounce justify-center rounded-lg bg-slate-100 p-3 align-middle shadow-2xl"></section>
        <section className="w-30 grid h-52 animate-bounce justify-center rounded-lg bg-slate-100 p-3 align-middle shadow-2xl"></section>
        <section className="w-30 grid h-52 animate-bounce justify-center rounded-lg bg-slate-100 p-3 align-middle shadow-2xl"></section>
        <section className="w-30 grid h-52 animate-bounce justify-center rounded-lg bg-slate-100 p-3 align-middle shadow-2xl"></section>
      </div>
    );
  }
  return (
    <section className="bg-light-0 shadow-2xl sm:m-12 sm:rounded-3xl">
      <div className="grid grid-cols-2 gap-4 p-3 sm:grid-cols-4 sm:p-10">
        {items.map((item) => {
          return (
            <Link
              to={`/products/${item._id}`}
              key={item._id}
              className="grid justify-center rounded-lg p-3 align-middle shadow-lg"
              onClick={useScrollToTop}
            >
              <img
                src={item.image[0]}
                alt=""
                className=" h-40 w-36 rounded-md object-cover"
              />
              <p>{item.name}</p>
              <h2 className=" font-logo">${item.price}</h2>
            </Link>
          );
        })}
        <div>
          {redirect ? (
            <>
              <Link
                to={`/shop#${name}-section`}
                className="p-3 text-xl underline"
              >
                See all
              </Link>
            </>
          ) : (
            ""
          )}
        </div>
      </div>
    </section>
  );
};
export default fetchShoes;
