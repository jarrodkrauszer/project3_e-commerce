import { useStoreContext } from '../../utils/store'
import "react-responsive-carousel/lib/styles/carousel.min.css"

import { Carousel } from 'react-responsive-carousel';
import stripedSweater from "../../assets/striped-sweater.png";
import Jacket from "../../assets/jackets.png"
import Beanie from "../../assets/green-beanie.png"
import Shearling from "../../assets/brown-shearling.png"
import pinkShirt from "../../assets/pink-shirt.png"

function Hero() {
  
  const [state, dispatch] = useStoreContext();
  const imageSize = {
    width: '80%',
    height: '550px'
  };

  const legendStyle = {
    color: '#FFF', // Set the text color
    fontSize: '48px', // Set the font size
    // textAlign: 'center', // Set the text alignment
    background: 'transparent', // Set the background color and opacity
    fontFamily: "Verdana",
    fontWeight: 'bold',
    
  };
  return (
    <div>
      <Carousel autoPlay={true} infiniteLoop={true} showThumbs={false}>
        <div>
          <img src={Jacket} style={imageSize} />
          <p className="legend" style={legendStyle}>70% Off All Jackets!</p>
        </div>
        <div>
          <img src={pinkShirt} style={imageSize} />
          <p className="legend" style={legendStyle}>Legend 2</p>
        </div>
        <div>
          <img src={stripedSweater} style={imageSize} />
          <p className="legend" style={legendStyle}>Legend 3</p>
        </div>
        <div>
          <img src={Beanie} style={imageSize} />
          {/* Add legend or other content if needed */}
        </div>
        <div>
          <img src={Shearling} style={imageSize} />
          {/* Add legend or other content if needed */}
        </div>
      </Carousel>
    </div>
  )
}

export default Hero