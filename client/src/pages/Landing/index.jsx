import Hero from "./Hero";
import Category from "../../components/Category";
import Carousel from "../../components/Carousel";

function Landing() {
  return (
    <>
      <section className="text-center pt-5">
        {/* <Header /> */}
        <Hero />
        <Category />
      </section>
    </>
  );
}

export default Landing;
