import React, { useState, useEffect } from "react"
import { Button, Upload, message } from "antd"
import crustlogo from "../../assets/crustlogo.svg"
import "./FileUpload.css"


 
function FileUpload(props) {
   
    const [imgBuffer, setImgBuffer] = useState([])
    const [imgBase64, setImgBase64] = useState([props.avatar])
    
    useEffect(() => {
        
        setImgBase64(props.avatar)
    
      }, [props.avatar])

    var upload = (file) => {

        const isJpgOrPng =
            file.type === "image/jpeg" ||
            file.type === "image/png" ||
            file.type === "image/gif" ||
            file.type === "image/jpg"||
            file.type === "image/svg"
        if (!isJpgOrPng) {
            message.error("You can only upload JPG/PNG/Gif file!")
        }
        const isLt2M = file.size / 1024 / 1024 < 1
        if (!isLt2M) {
            message.error("Image must smaller than 500KB!")
        }
        var that = this;
        if (isJpgOrPng && isLt2M) {
            const BufferReader = new FileReader()
            const Base64Reader = new FileReader()
            BufferReader.addEventListener("load", function () {

                setImgBuffer(BufferReader.result)

            
                props.changeFileBuffer(BufferReader.result);
                //that.props.changeFileBuffer(BufferReader.result);
            })

            Base64Reader.addEventListener('loadend', function () {


                setImgBase64(Base64Reader.result);
         

            });

            if (file) {
                
                BufferReader.readAsArrayBuffer(file)
                Base64Reader.readAsDataURL(file)
            }


        }
        
        return isJpgOrPng && isLt2M ? false : Upload.LIST_IGNORE
    }



  
        return (
            <div>
                <Upload
                    maxCount="1"
                    beforeUpload={upload.bind(this)}
                    showUploadList={false}

                >
          
                    <div className="crustButton">
                        Select Photo
                    </div>

                    <div className="upload_tip">
                    Powered by <img src={crustlogo} width="60"></img>
                    </div>
                  
                    <div>
                        <img src={imgBase64} width="200" alt="" />
                    </div>

                    
                </Upload>
           
            </div>
        )
    
}

export default FileUpload;