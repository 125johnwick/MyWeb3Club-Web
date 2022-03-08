import React, { Component } from "react";


import "./Footer.css";
class Footer extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div id="community">
        <div className="footer_bg">

          <div className="copyright">Copyright 2022 By MyWeb3Club</div>
        </div>
      </div>
    );
  }
}
export default Footer;
