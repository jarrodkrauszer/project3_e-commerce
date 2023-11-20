import { useStoreContext } from '../../utils/store'
import "react-responsive-carousel/lib/styles/carousel.min.css"

import { Carousel } from 'react-responsive-carousel';
import stripedSweater from "../../assets/white-background.png";
import Jacket from "../../assets/jackets.png"
import Beanie from "../../assets/black-background.jpg"
import Shearling from "../../assets/brown-shearling.png"
import pinkShirt from "../../assets/white-background2.jpg"

function Hero() {
  
  const [state, dispatch] = useStoreContext();
  const imageSize = {
    width: '100%',
    height: '550px'
  };

  const legendStyle = {
    color: 'white', // Set the text color
    fontSize: '48px', // Set the font size
    // textAlign: 'center', // Set the text alignment
    background: 'black', // Set the background color and opacity
    fontFamily: "Raleway",
    fontWeight: 'bold',
    marginBottom: '200px'
  };

  const altLegendStyle = {
    color: 'black',
    fontSize: '48px',
    background: 'white',
    fontFamily: 'Raleway',
    fontWeight: 'bold',
    marginBottom: '200px'

  }
    
    
  return (
    <div>
      <Carousel autoPlay={true} infiniteLoop={true} showThumbs={false} showStatus={false}>
        {/* <div>
          <img src={Jacket} style={imageSize} />
          <p className="legend" style={legendStyle}>70% Off All Jackets!</p>
        </div> */}
        {/* <div>
          <img src={pinkShirt} style={imageSize} />
          <p className="legend" style={legendStyle}>Legend 2</p>
        </div> */}
        <div>
            <img src={stripedSweater} style={imageSize} />  
          <p className="legend" style={legendStyle}>70% Sale on all Menswear</p>
        </div>
        <div>
          <img src={Beanie} style={imageSize} />
          <p className="legend" style={altLegendStyle}>50% Sale on all Shoes</p>
        </div>
        <div>
           <img src={pinkShirt} style={imageSize} /> 
          <p className="legend" style={legendStyle}>20% off all Hats</p>
        </div>
      </Carousel>
    </div>
    
    )
    
  };
      
export default Hero