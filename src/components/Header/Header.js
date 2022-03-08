import React, { Component } from "react";
import { Link } from "react-router-dom";
import {
  Drawer,
  message,
} from "antd";

import web3 from "web3";
import "./Header.css";
import logo from "../../assets/logo.png";
import menuicon from "../../assets/menu.svg";
import chainids from "../../libs/chainIds";
import MyWeb3Club from "../../libs/MyWeb3Club";
class Header extends Component {
  async componentDidMount() {
    const { ethereum } = window;

    var that = this;

    if (ethereum && ethereum.isMetaMask) {
      await that.initAccount();
     await that.changeNetwork();

      window.ethereum.on("accountsChanged", function () {
        that.initAccount();
      });

      window.ethereum.on("chainChanged", function () {
        that.changeNetwork();
      });

      //search name and avatar
      var myWeb3Club=new MyWeb3Club(this.state.network);
      var result=await myWeb3Club.getUser(this.state.currentAddress);
    
      if(result[0]!=""){
          this.setState({
              avatar:result[0],
              nickname:result[1],
          })
      }
     


    } else {
      this.setState({
        installremind: false,
      });
    }
  }

  constructor(props) {
    super(props);
    this.state = {
      currentAddress: "",
      isInit: false,
      visible: false,
      dialogvisible: false,
      installremind: false,
      networkName: "",
      networkColor: "#FFF",
      avatar:"",
      nickname:""
    };
  }

  render() {
    return (
      <div>
        {/* <Modal
          title="Info"
          footer={null}
          visible={this.state.installremind}
          onCancel={this.closeInstallRemin}
        >
          <p>Please install Metamask and select network.</p>
        </Modal> */}

  


        <div className="header_container" style={this.props.showbg?({"background":"#fff"}):({"background":"none"})}>
      
          <div className="header_container_content">
            <div className="logo">
              <Link to="/">
                <img src={logo} width="180" />
              </Link>
            </div>

            <div className="menu_icon" onClick={this.showDrawer}>
              <img src={menuicon} width="28" />
            </div>
            <Drawer
              title="Menu"
              placement="right"
              closable={false}
              onClose={this.closeDialog}
              visible={this.state.visible}
            >

{this.state.currentAddress == "" ? (
                <div
                  className="header_connect_btn"
                  onClick={this.addNetwork}
                >
                  CONNECT WALLET <br/><span>Crab Network</span> 
                </div>
              ) : (
                <div className="menu_item">
                             {
                        this.state.nickname!="" && this.state.avatar !=""?(   <div className="header_userinfo">
                        <div className="header_useravatar">
                          <img src={this.state.avatar} className="header_avatar"></img>
                        </div>  
                        <div className="header_userintro">
                          <p className="header_username">{this.state.nickname}</p>
                          <p className="header_useraddress">{this.address}</p>
                        </div>
                      </div>):(    
                      <div className="header_userinfo_no">
                      {this.address}
                    </div>)
                      }
                </div>
              )}


              <Link to="/Clubs/0">
                <div className="menu_item">Clubs</div>
              </Link>
              <Link to="/CreateClub">
                <div className="menu_item">Create</div>
              </Link>
      
       

         
            </Drawer>


            <div className="nav">
   
           
        
              <Link to="/Clubs/0">
                <div className="nav_item">Clubs</div>
              </Link>
              <Link to="/CreateClub">
                <div className="nav_item">Create</div>
              </Link>
    
   
              {this.state.currentAddress == "" ? (
                <div
                  className="header_connect_btn"
                  onClick={this.addNetwork}
                >
                  CONNECT WALLET <br/><span>Crab Network</span> 
                </div>
              ) : (
                <Link to={"/user/"+this.state.currentAddress}>
                  <div className="nav_item">

                   

                    {/* <span style={{ color: this.state.networkColor }}>
                      {this.state.networkName}&nbsp;
                    </span> */}
                 

                      {
                        this.state.nickname!="" && this.state.avatar !=""?(   <div className="header_userinfo">
                        <div className="header_useravatar">
                          <img src={this.state.avatar} className="header_avatar"></img>
                        </div>  
                        <div className="header_userintro">
                          <p className="header_username">{this.state.nickname}</p>
                          <p className="header_useraddress">{this.address}</p>
                        </div>
                      </div>):(    
                      <div className="header_userinfo_no">
                      {this.address}
                    </div>)
                      }
                  
                   
                  

                
                    
                
                   
                    
                  </div>
              </Link>
      
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
  get address() {
    let end = this.state.currentAddress.length;
    let addressShort =
      this.state.currentAddress.substring(0, 5) +
      "..." +
      this.state.currentAddress.substring(end - 4, end);
    return addressShort;
  }
  showDrawer = () => {
    this.setState({
      visible: true,
    });
  };

  onClose = () => {
    this.setState({
      visible: false,
    });
  };
  closeDialog = () => {
    this.setState({ visible: false });
  };

  initAccount = async () => {
    var that = this;
    const accounts = await window.ethereum.request({
      method: "eth_accounts",
    });
    if (accounts[0] != null) {
      that.setState({
        currentAddress: accounts[0],
      });
    }
  };

  handleConnect = async () => {





    var that = this;
    const { ethereum } = window;

    if (ethereum && ethereum.isMetaMask) {
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      if (accounts[0] != null) {
        that.setState({
          currentAddress: accounts[0],
        });
      }
    } else {
      message.warning(
        "Please install metamask and switch to Network.",
        3
      );
    }

  };


  addNetwork=async()=>{

 
    var params = [
      {
        "chainId": "0x2C",
        "chainName": "Crab Network",
        "rpcUrls": ["https://crab-rpc.darwinia.network/"],
        "nativeCurrency": {
          "name": "CRAB",
          "symbol": "CRAB",
          "decimals": 18
        },
        "blockExplorerUrls": ["https://crab.subscan.io/"]
      }
    ]

    try {
        await window.ethereum.request({
          method: 'wallet_switchEthereumChain',
          params: [{ chainId: '0x2C' }],
        });
        await this.handleConnect();
      } catch (switchError) {
        // This error code indicates that the chain has not been added to MetaMask.
        if (switchError.code === 4902) {
          try {
            await window.ethereum.request({
              method: 'wallet_addEthereumChain',
              params: params,
            });
            await this.handleConnect();
          } catch (addError) {
            // handle "add" error
          }
        }
        // handle other "switch" errors
      }


}







  

  closeInstallRemin = () => {
    this.setState({
      installremind: false,
    });
  };

  changeNetwork = async () => {
    var that = this;
    const chainIdHex = await window.ethereum.request({ method: "eth_chainId" });
    var chainId = web3.utils.hexToNumber(chainIdHex);
  
    for (var item in chainids) {
      if (chainId == chainids[item].ChainId) {
        that.setState({
          networkName: chainids[item].NetworkName,
          networkColor: chainids[item].FontColor,
          network:chainids[item]
        });
        break;
      }
    }


  };

  
}
export default Header;
