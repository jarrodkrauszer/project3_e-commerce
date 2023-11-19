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

  return (
    <div>
      <Carousel autoPlay={true} infiniteLoop={true}>
        <div>
          <p className="legend">30% off all Jackets</p>
          <img src={Jacket} />
        </div>
        <div>
          <p className="legend">Some sale on Men's items</p>
          <img src={Men} />
        </div>
        <div>
          <p className="legend">Some sale on Hats</p>
          <img src={Hat} />
        </div>
        <div>
          <p className="legend">Some sale on Women's items</p>
          <img src={Women} />
        </div>
        <div>
          <p className="legend">Sale on sneakers</p>
          <img src={Sneakers} />
        </div>
      </Carousel>
    </div>
  )
}

export default Hero