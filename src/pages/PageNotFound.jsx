import { Link } from "react-router-dom";
import pageNotFoundSvg from "../assets/svgs/3828537.jpg";

const PageNotFound = () => {
  return (
    <div className="flex flex-col items-center gap-3 px-4 pt-16">
      <img
        src={pageNotFoundSvg}
        alt="Something went wrong"
        className=" h-80 w-screen object-contain"
      />
      <Link
        to="/"
        className="w-20 rounded-xl bg-navbar-0 p-1 text-center font-heading text-light-0"
      >
        Home
      </Link>
    </div>
  );
};
export default PageNotFound;
