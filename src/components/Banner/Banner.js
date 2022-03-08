import React, { Component } from "react";
import crablogo from "../../assets/crablogo.svg"
import crustlogo from "../../assets/crustlogo.svg"

import "./Banner.css";

class Banner extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="banner_bg">
            <div className="banner_font">
              Build your own web3 community
            </div>

            <a href="/Clubs/0">
              <div className="explore">
                Explore Clubs
              </div>
            </a>

            <div className="logos">
              <div>
                  <a href="https://crab.network/" target="_blank">
                    Built on <img src={crablogo} width="100px"></img>
                  </a>
              </div>
              &nbsp;&nbsp;&nbsp;&nbsp;
              <div>
              <a href="https://www.crust.network/" target="_blank">
                  Powered by&nbsp;<img src={crustlogo} width="100px"></img>
                  </a>
              </div>
              
            </div>  
      
      </div>
    );
  }
}
export default Banner;
