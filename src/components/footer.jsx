import logoSvg from "../assets/svgs/Screenshot_2023-05-08_153230-removebg-preview.png";

const footer = () => {
  return (
    <footer className="  bg-navbar-0 p-4 text-light-0 sm:p-10">
      <div className="flex flex-col items-start gap-8 sm:flex-row">
        <img src={logoSvg} alt="" className=" w-20" />
        <div>
          <h1 className=" mb-4 font-extrabold">Follow Us On</h1>
          <div className=" grid text-left font-paragraph underline ">
            <a href="https://www.instagram.com/sammitbadodekar" target="_blank">
              Instagram
            </a>
            <a
              href="https://twitter.com/SammitBadodekar?t=BhN3et2iD1uLnq8ILmNz_w&s=09"
              target="_blank"
            >
              Twitter
            </a>
            <a href="https://github.com/sammitbadodekar" target="_blank">
              Github
            </a>
            <a
              href="https://www.linkedin.com/in/sammitbadodekar"
              target="_blank"
            >
              LinkedIn
            </a>
          </div>{" "}
        </div>{" "}
        <p className=" self-end">
          &copy; {new Date().getFullYear()} RunAwaySoles. All rights reserved.
        </p>
      </div>
    </footer>
  );
};
export default footer;
