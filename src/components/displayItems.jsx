import { Link } from "react-router-dom";

const displayItems = (props) => {
  const { name, description, images } = props;
  return (
    <div>
      <section
        className={`${name}-container flex h-screen w-screen flex-col items-center gap-1 overflow-hidden px-3 pt-20 text-light-0 sm:flex-row sm:gap-0 sm:px-10 sm:pt-16`}
      >
        <div className=" grid gap-3">
          <p className=" font-heading text-3xl sm:text-6xl ">{name}</p>

          <p className=" grid w-4/5 gap-4 font-paragraph text-sm leading-4 sm:w-2/3  ">
            {description}
          </p>
          <Link
            to="/shop"
            className=" my-5 w-fit rounded-2xl border-2 p-2 font-logo text-xl hover:text-slate-300"
          >
            SHOP
          </Link>
        </div>
        <div className="w-screen">
          {images.map((image) => {
            return (
              <img
                src={image.src}
                alt=""
                className={image.classNames}
                key={image.src}
              />
            );
          })}
        </div>
      </section>
    </div>
  );
};
export default displayItems;
