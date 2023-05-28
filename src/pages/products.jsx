import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import FetchShoes from "../components/fetchShoes";
import useStore from "../app/cartStore";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const products = () => {
  const { id } = useParams();
  const [shoesInfo, setShoesInfo] = useState([]);
  const [shoesImgs, setShoesImgs] = useState([]);
  const [isAdded, setIsAdded] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const addItems = useStore((state) => state.addItems);
  const authStatus = useStore((state) => state.auth);
  const cartItems = useStore((state) => state.items);
  const [userInfo, setUserInfo] = useState([]);
  const addButton = useRef(null);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    autoplay: true,
    autoplaySpeed: 2000,
    appendDots: (dots) => (
      <div
        style={{
          Color: "#0c134f",
          borderRadius: "10px",
          padding: "1 rem",
        }}
      >
        <ul style={{ color: "#0c134f", padding: "0rem" }}> {dots} </ul>
      </div>
    ),
  };

  useEffect(() => {
    axios
      .get(`http://runawaysoles-backend.onrender.com/getShoes/specific/${id}`)
      .then((response) => {
        setShoesInfo(response.data[0]);
        setShoesImgs(
          Object.entries(response.data[0] ? response.data[0].image : "")
        );
      })
      .catch((error) => console.log(error));

    axios
      .get(
        "http://runawaysoles-backend.onrender.com.onrender.com.onrender.com/auth/login/success",
        {
          withCredentials: true,
        }
      )
      .then((response) => {
        setUserInfo(response.data[0]);
      });
  }, [id]);

  const handleAdd = (object) => {
    if (authStatus) {
      const isDuplicate = cartItems.some((item) => item?._id === object?._id);
      if (!isAdded && !isDuplicate) {
        const updatedCart = [object, ...cartItems];
        axios.put(
          `http://runawaysoles-backend.onrender.com.onrender.com/users/${userInfo?._id}/updateCartItems`,
          updatedCart
        );
        addItems(object);
        toast("Item Added To Cart");
        setIsAdded(true);
        if (addButton.current && !isAdded) {
          addButton.current.style.backgroundColor = "#383f84";
        }
      } else {
        toast("Already There !!!");
      }
    } else {
      window.location.href = "/login";
    }
  };

  if (shoesInfo) {
    return (
      <div className="sm:pt-30 mx-4 flex flex-col gap-4 pt-16 sm:gap-8 ">
        <div className="justify-center gap-8 sm:flex ">
          <Slider {...settings} className="sm:w-80">
            {shoesImgs.map((img) => {
              return (
                <img
                  src={img ? img[1] : ""}
                  alt=""
                  key={img ? img[1] : ""}
                  className=" w-30 h-80 object-cover sm:h-80 sm:w-10 "
                />
              );
            })}
          </Slider>
          <section className="pt-4 sm:pt-28">
            <p className="text-2xl">{shoesInfo.name}</p>
            <p className=" font-logo text-2xl">${shoesInfo.price}</p>
            <button
              className="btn my-4 w-full p-2 text-lg"
              onClick={() => {
                handleAdd({
                  name: shoesInfo.name,
                  img: shoesImgs[0][1],
                  _id: shoesInfo._id,
                  price: shoesInfo.price,
                  quantity: 1,
                });
              }}
              ref={addButton}
            >
              Add
            </button>
            <ToastContainer
              position="bottom-center"
              autoClose={5000}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="dark"
            />
          </section>
        </div>

        <section className="grid gap-2 sm:px-28">
          <p>
            At RunAwaySoles, we prioritize both design and comfort. Our shoes
            are not only visually appealing but also engineered for maximum
            comfort and support. We use premium materials and innovative
            technologies to ensure a perfect fit and cushioning that lasts all
            day long.
          </p>
          <p>
            We take pride in the quality of our products. Every pair of shoes
            goes through rigorous quality checks to ensure durability and
            long-lasting performance. From the stitching to the soles, we
            maintain the highest standards to deliver a product that exceeds
            expectations.
          </p>
          <p>
            Discover the perfect blend of style, comfort, and quality at
            RunAwaySoles. Step into our world of exceptional footwear and let
            your feet do the talking.
          </p>
        </section>
        <section
          onClick={() => {
            setRefresh(!refresh);
            setIsAdded(false);
            addButton.current.style.backgroundColor = "#0c134f";
          }}
          className=" -mx-4"
        >
          <h1 className=" p-4 font-heading text-2xl sm:px-40 sm:text-4xl">
            More Shoes
          </h1>
          <FetchShoes
            name=""
            url="getShoes/allShoes"
            redirect={true}
            key={refresh}
          />
        </section>
      </div>
    );
  }
  return (
    <div className="grid justify-center gap-3 px-4 pt-20">
      <h1 className=" font-logo">Somthing Went Wrong...</h1>
      <Link to="/" className="bg-navbar-0 p-1 text-light-0">
        Go to Home Page
      </Link>
    </div>
  );
};
export default products;
