import { Link } from "react-router-dom";

const PageNotFound = () => {
  return (
    <div className="grid justify-center gap-3 px-4 pt-20">
      <h1 className=" font-logo">Somthing Went Wrong...</h1>
      <Link to="/" className="bg-navbar-0 p-1 text-light-0">
        Go to Home Page
      </Link>
    </div>
  );
};
export default PageNotFound;
