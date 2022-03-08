import React, { Component } from "react";
import { Row, Col } from "antd";
import icon1 from "../../assets/keypoint_icon1.png";
import icon2 from "../../assets/keypoint_icon2.png";
import icon3 from "../../assets/keypoint_icon3.png";
import myweb3bg from "../../assets/myweb3bg_blue.svg";
import "./KeyPoint.css";
class KeyPoint extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <div className="keypoint_bg">
          <div className="keypoint_big_title">What is myweb3.club?</div>
          <div className="keypoint_big_bg"><img src={myweb3bg} width="100%"></img></div>
          
          <div className="keypoint_short_title">myweb3.club uses web3 and blockchain technology to ensure freedom of speech. Let everyone build a home for their community and put the social network back in their hands.</div>
          <div className="keypoint_big_title">What you can do on myweb3.club</div>
          <Row className="keypoint_container">
            <Col
              xs={24}
              sm={12}
              md={8}
              lg={8}
              xl={8}
              className="keypoint_content"
            >
              <img src={icon1} className="keypoint_item_img" />
              <div className="keypoint_item_tit">Web3er</div>
              <div className="keypoint_item_txt">
                You can browse your favorite content without interruption, exchange ideas and express opinions with crypto enthusiasts. No ads, no algorithms.
              </div>
            </Col>
            <Col
              xs={24}
              sm={12}
              md={8}
              lg={8}
              xl={8}
              className="keypoint_content"
            >
              <img src={icon2} className="keypoint_item_img" />
              <div className="keypoint_item_tit">Creator</div>
              <div className="keypoint_item_txt">
                Collaborate with a group of like-minded people to innovate and bring new ideas to web3. Freely publish content, every content you create will be minted into an NFT.
              </div>
            </Col>
            <Col
              xs={24}
              sm={12}
              md={8}
              lg={8}
              xl={8}
              className="keypoint_content"
            >
              <img src={icon3} className="keypoint_item_img" />
              <div className="keypoint_item_tit">Governor</div>
              <div className="keypoint_item_txt">
                Each club is run by different organizations or individuals, but it does not belong to any single entity, it belongs to the public who use it, and community members determine the development of the club.
              </div>
            </Col>
          </Row>
        </div>
        {/* <div className="keypoint_container">
          <div className="keypoint_item">
        
          </div>
        </div> */}
      </div>
    );
  }
}
export default KeyPoint;
