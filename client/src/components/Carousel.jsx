import React, { useState, useEffect } from "react";
import { Carousel } from 'react-responsive-carousel';
import Hat from "../assets/hats.png";
import Jacket from "../assets/jackets.png"
import Men from "../assets/men.png"
import Women from "../assets/men.png"
import Sneakers from "../assets/sneakers.png"

function clothesCarousel() {
  return (
    <>
            <Carousel autoPlay={true} infiniteLoop={true}>
                <div>
                    <img src={Jacket} />
                    <p className="legend">Legend 1</p>
                </div>
                <div>
                    <img src={Men} />
                    <p className="legend">Legend 2</p>
                </div>
                <div>
                    <img src={Hat}/>
                    <p className="legend">Legend 3</p>
                </div>
                <div>
                    <img src={Women}/>

                </div>
                <div>
                    <img src={Sneakers}/>
                </div>
            </Carousel>
        </>
  );
}

export default clothesCarousel
