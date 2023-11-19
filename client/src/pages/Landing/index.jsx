import Hero from "./Hero";
import Category from "../../components/Category/Category";
import Carousel from "../../components/Carousel";

function Landing() {
  return (
    <>
      <section className="text-center pt-5">

        <Hero />
        <Category />
      </section>
    </>
  );
}

export default Landing;
