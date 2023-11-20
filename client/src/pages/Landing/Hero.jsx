import { useStoreContext } from "../../utils/store";
import "react-responsive-carousel/lib/styles/carousel.min.css";

import { Carousel } from "react-responsive-carousel";
import Logo from "../../assets/logo.png";

function Hero() {
  const [state, dispatch] = useStoreContext();
  const imageSize = {
    width: "100%",
    height: "550px",
  };

  const legendStyle = {
    color: "white", // Set the text color
    fontSize: "48px", // Set the font size
    // textAlign: 'center', // Set the text alignment
    background: "black", // Set the background color and opacity
    fontFamily: "Raleway",
    fontWeight: "bold",
    marginBottom: "200px",
  };

  const altLegendStyle = {
    color: "black",
    fontSize: "48px",
    background: "white",
    fontFamily: "Raleway",
    fontWeight: "bold",
    marginBottom: "200px",
  };

  const titleStyle = {
    color: "black",
    fontSize: "64px",
    background: "transparent",
    fontFamily: "Raleway",
    fontWeight: "bold",
  };

  return (
    <div>

      <img
        style={{ filter: 'invert(1)' }}
        className="mx-auto h-15 w-auto invert-colors"
        src={`/images/logo.png`} />
      <h1 style={titleStyle}>UrbanVogue</h1>

      <Carousel autoPlay={true} infiniteLoop={true} showThumbs={false} showStatus={false}>

        <div>
          <img src={`/images/white-background.png`} style={imageSize} />
          <p className="legend" style={legendStyle}>
            70% Sale on all Menswear
          </p>
        </div>
        <div>
          <img src={`/images/black-background.png`} style={imageSize} />
          <p className="legend" style={altLegendStyle}>
            50% Sale on all Shoes
          </p>
        </div>
        <div>
          <img src={`/images/white-background.png2`} style={imageSize} />
          <p className="legend" style={legendStyle}>
            20% off all Hats
          </p>
        </div>
      </Carousel>
    </div>
  );
}

export default Hero;
