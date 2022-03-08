import Web3 from "web3";
import MyWeb3ClubAbi from "../abi/MyWeb3Club.json";
import ERC721 from "../abi/MyWeb3ClubNFT.json";
import axios from "axios";
class MyWeb3Club {
  constructor(network) {
    this.web3 = new Web3(window.ethereum);
    this.network= network;
    this.contract = new this.web3.eth.Contract(
      MyWeb3ClubAbi["abi"],
      network.MyWeb3Club
    );
  }

  async createNewClub(_from,_category,_nftContract,_avatar,_title,_description){
    console.log(_from,_category,_nftContract,_avatar,_title,_description)
    var result = await this.contract.methods
    .createClub( parseInt(_category),_nftContract,_avatar,_title,_description)
    .send({ from: _from})
    .on("transactionHash", function (hash) {
        console.info(hash);
        // return hash;
    })
    .on("receipt", function (receipt) {
      return receipt;
    });
    return result;
  }


  async getCategoriesClubCount(_categoryCount){
    var clubsCount=await this.contract.methods._clubIds().call();
    var categorysCountArray=await this.contract.methods.getCategoriesData(_categoryCount).call();
    return {
      clubsCount:clubsCount,
      categorysCountArray:categorysCountArray
    }
  }

  async getClubsByCategoryId(_categoryId,_pageNum,_pageSize){
    console.log(_categoryId,_pageNum,_pageSize)
    var clubsIdArray=await this.contract.methods.getClubListByCategory(parseInt(_categoryId),_pageNum,_pageSize).call();
    var returnArray=[];
    for(var i=0;i<clubsIdArray.length;i++){
      var clubId=clubsIdArray[i];
      var clubsDetail=await this.contract.methods.ClubsMapping(clubId).call();
      returnArray[i]=clubsDetail;
    }
    return returnArray;
    console.log(clubsIdArray)
    
  }

  async getClubs(_pageNum,_pageSize){

    var clubsCount=await this.contract.methods._clubIds().call();
    
    var arrayLength;
    var arrayIndex=0;

    var dataStart=(clubsCount-1) - (_pageNum-1) * _pageSize; 
    var dataEnd;
    
    if(dataStart<_pageSize){ 
        dataEnd=0;
        arrayLength=dataStart+1;
    }else{
        dataEnd=dataStart-_pageSize+1;
        arrayLength=_pageSize;
    }

    var returnArray=[];

    for(var i=dataStart;i>=dataEnd;i--){
  
       var clubsDetail=await this.contract.methods.ClubsMapping(i).call();
        returnArray[arrayIndex]=clubsDetail;
        arrayIndex++;
    }

    console.log(returnArray);
    return returnArray;

  }

  async getClubById(_id){

    var clubsDetail=await this.contract.methods.ClubsMapping(_id).call();

    return clubsDetail;
  
  }

  async getUser(_from){
    var result=await this.contract.methods.getUserInfo().call({from: _from});
    return result;
  }

  async updateUser(_from,_avatar,_nickname){
        var result=await this.contract.methods
        .createUserInfo(_avatar,_nickname)
        .send({ from: _from })
        .on("transactionHash", function (hash) {
          console.info(hash);
        })
        .on("receipt", function (receipt) {
          console.info(receipt);
          return receipt;
      });
      return result;
  }

  async postContent(_from,_clubId,_content,_img){
    var result=await this.contract.methods
    .createNFT(_clubId,_content,_img)
    .send({ from: _from })
    .on("transactionHash", function (hash) {
      console.info(hash);
    })
    .on("receipt", function (receipt) {
      console.info(receipt);
      return receipt;
  });
  return result;
  }

  async getContentByClubId(_nftAddress,_clubId,_pageNum,_pageSize){
    var contents=[];
    try {
      var nftIds=await this.contract.methods.getClubNFT(_clubId,_pageNum,_pageSize).call();
    
      for(var i=0;i<nftIds.length;i++){
          let tokenURI=await this.getTokenURI(_nftAddress,nftIds[i]);
          let tokenURIResponse = await axios.get(tokenURI);
          let nftImage=tokenURIResponse.data.image;
          let description=tokenURIResponse.data.description;
          let nftOwner=await this.getNFTOwner(_nftAddress,nftIds[i]);
          let userInfo=await this.getUser(nftOwner);
          contents.push({
            owner:nftOwner,
            nftImage:nftImage,
            description:description,
            userInfo:userInfo
          })
      }
    } catch (error) {
      
    }

    return contents;
 
  }




  async getContentByAddress(_nftAddress,_from){

  

    var contract = new this.web3.eth.Contract(
      ERC721["abi"],
      _nftAddress
    );;
    var contents=[];
    var nftCount=await contract.methods.balanceOf(_from).call();
    console.log(nftCount);
    for(var i=0;i<nftCount;i++){
      var nftId=await contract.methods.tokenOfOwnerByIndex(_from,i).call()
      let tokenURI=await this.getTokenURI(_nftAddress,nftId);
      let tokenURIResponse = await axios.get(tokenURI);
      let nftImage=tokenURIResponse.data.image;
      let description=tokenURIResponse.data.description;
      let nftOwner=await this.getNFTOwner(_nftAddress,nftId);
      let userInfo=await this.getUser(nftOwner);
      contents.push({
        owner:nftOwner,
        nftImage:nftImage,
        description:description,
        userInfo:userInfo
      })
    } 
    return contents;

  }

  async getTokenURI(_nftAddress,_tokenId){
    var contract = new this.web3.eth.Contract(
      ERC721["abi"],
      _nftAddress
    );;
    var tokenURI=await contract.methods.tokenURI(_tokenId).call()
    return tokenURI;
  }

  async getNFTOwner(_nftAddress,_tokenId){
    var contract = new this.web3.eth.Contract(
      ERC721["abi"],
      _nftAddress
    );;
    var owner=await contract.methods.ownerOf(_tokenId).call()
    return owner;
  }

  async joinClub(_from,_clubId){
    var result=await this.contract.methods
    .joinClub(_clubId)
    .send({ from: _from })
    .on("transactionHash", function (hash) {
      console.info(hash);
    })
    .on("receipt", function (receipt) {
      console.info(receipt);
      return receipt;
    });
    return result;
  }

  async quitClub(_from,_clubId){
    var result=await this.contract.methods
    .quitClub(_clubId)
    .send({ from: _from })
    .on("transactionHash", function (hash) {
      console.info(hash);
    })
    .on("receipt", function (receipt) {
      console.info(receipt);
      return receipt;
    });
    return result;
  }

  async isJoinClub(_from,_clubId){
    var user=await this.contract.methods.getUserInfo().call({from: _from});
    var joinClubsArray=user[2];
    if(joinClubsArray.length==0){
      return false;
    }else{
      if(joinClubsArray.indexOf(_clubId)!=-1){
        return true;
      }else{
        return false;
      }
    }
    
  }
  


  



  
}

export default MyWeb3Club;
