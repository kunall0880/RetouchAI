import React, { useState } from 'react'
import ImageUpload from './ImageUpload';
import ImagePreview from'./ImagePreview';
import {enhancedImageAPI} from '../utils/enhancedImageAppi' 

const Home = () => {
    const [uploadImage, setUploadImage] = useState(null)
    const [enhancedImage, setEnhancedImage] = useState(null)
    const [loading, setLoading] = useState(false)

    const UploadImageHandler = async (file)=>{
        setUploadImage(URL.createObjectURL(file));
        setLoading(true);
        //calling the api 
        try{//code that may cause some error
            const enhancedURl = await enhancedImageAPI(file);
            setEnhancedImage(enhancedURl);
            setLoading(false)
        }catch(error){ //code to handle that error
          console.log(error)
          alert("error in image")
        }
    };

  return (
    <>
        <ImageUpload UploadImageHandler={UploadImageHandler}/>
        <ImagePreview 
        loading={loading} 
        uploaded={uploadImage} 
        enhanced={enhancedImage}/>
    </>
  )
}

export default Home