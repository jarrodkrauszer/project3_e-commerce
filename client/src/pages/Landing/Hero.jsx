import { useStoreContext } from '../../utils/store'
import "react-responsive-carousel/lib/styles/carousel.min.css"

import { Carousel } from 'react-responsive-carousel';
import Hat from "../../assets/hats.png";
import Jacket from "../../assets/jackets.png"
import Men from "../../assets/men.png"
import Women from "../../assets/men.png"
import Sneakers from "../../assets/sneakers.png"

function Hero() {
  
  const [state, dispatch] = useStoreContext();
  const imageSize = {
    width: '100%',
    height: '550px'
  };

  const legendStyle = {
    color: '#FFF', // Set the text color
    fontSize: '24px', // Set the font size
    // textAlign: 'center', // Set the text alignment
    background: 'transparent', // Set the background color and opacity
    
  };
  return (
    <div>
      <Carousel autoPlay={true} infiniteLoop={true} showThumbs={false}>
        <div>
          <img src={Jacket} style={imageSize} />
          <p className="legend" style={legendStyle}>70% Off!</p>
        </div>
        <div>
          <img src={Men} style={imageSize} />
          <p className="legend" style={legendStyle}>Legend 2</p>
        </div>
        <div>
          <img src={Hat} style={imageSize} />
          <p className="legend" style={legendStyle}>Legend 3</p>
        </div>
        <div>
          <img src={Women} style={imageSize} />
          {/* Add legend or other content if needed */}
        </div>
        <div>
          <img src={Sneakers} style={imageSize} />
          {/* Add legend or other content if needed */}
        </div>
      </Carousel>
    </div>
  )
}

export default Hero