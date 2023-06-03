import shoesImage1 from "../assets/shoes-img/10953b2c-9992-4365-932f-ec9a5db3bd41-removebg.png";
import shoesImage2 from "../assets/shoes-img/10953b2c-9992-4365-932f-ec9a5db3bd41-removebg-preview-removebg-preview.png";
import AeroRoamersImg1 from "../assets/shoes-img/53fc98ef-63e6-45db-be33-1bc271abb35e-removebg-preview.png";
import MarvellousImg1 from "../assets/shoes-img/1683214286_7199881-transformed.png";
import DisplayItems from "../components/displayItems";
import FetchShoes from "../components/fetchShoes";
import Footer from "../components/footer";

const home = () => {
  const sections = [
    {
      name: "skywalkers",
      description:
        "Step into the future with our high-top sneakers and futuristic footwear, merging style and innovation seamlessly",
      images: [
        {
          src: shoesImage2,
          classNames: " -rotate-12",
        },
        {
          src: shoesImage1,
          classNames: "",
        },
      ],
    },
    {
      name: "AeroRoamers",
      description:
        "Experience timeless elegance combined with exceptional comfort in our shoe lineup. Discover classic designs crafted to provide unparalleled comfort throughout your day",
      images: [
        {
          src: AeroRoamersImg1,
          classNames: "AeroRoamersImg-container w-screen -rotate-45",
        },
      ],
    },
    {
      name: "Marvellous",
      description:
        "Step into the world of superheroes with Marvellous, where iconic Marvel heroes come to life through stylish and comfortable footwear.",
      images: [
        {
          src: MarvellousImg1,
          classNames: "MarvellousImg-container w-screen",
        },
      ],
    },
  ];
  return (
    <main className=" overflow-x-hidden">
      {sections.map((section) => {
        return (
          <div key={section.name} className=" overflow-hidden">
            <DisplayItems
              name={section.name}
              description={section.description}
              images={section.images}
            />
            <FetchShoes
              name={`/${section.name}`}
              url="getShoes"
              redirect={true}
            />
          </div>
        );
      })}
      <Footer />
    </main>
  );
};
export default home;
