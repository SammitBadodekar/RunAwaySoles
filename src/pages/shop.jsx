import FetchShoes from "../components/fetchShoes";
import Footer from "../components/footer";

const shop = () => {
  return (
    <div className=" pt-20">
      <h2 className="w-full pt-5 text-center font-heading text-3xl">
        skywalkers
      </h2>
      <FetchShoes name="/skywalkers" url="getShoes/all" />
      <h2 className="w-full pt-5 text-center font-heading text-3xl">
        AeroRoamers
      </h2>
      <FetchShoes name="/AeroRoamers" url="getShoes/all" />
      <h2 className="w-full pt-5 text-center font-heading text-3xl">
        Marvellous
      </h2>
      <FetchShoes name="/Marvellous" url="getShoes/all" />
      <Footer />
    </div>
  );
};
export default shop;
