import axios from "axios";

const API_KEY='wxqqm076w3pi30t08'
const BASE_URL='https://techhk.aoscdn.com/'
const MAX_TRY=20;
export const enhancedImageAPI = async (file)=>{
    try {
        const taskId = await uploadImage(file)
        console.log("this is task id : ",taskId);
        const enhancedImageData = await poolForEnhancedImage(taskId)
        console.log("this is data : ",enhancedImageData)
        return enhancedImageData;
    } catch (error) {

        console.log("error in enhancing the image : ",error.message);
        
    }
    
};
const uploadImage =async (file)=>{
    const formData = new FormData();
    formData.append('image_file',file)
    const { data } = await axios.post(
        `${BASE_URL}/api/tasks/visual/scale/`,
        formData,
        {
            headers :{
            'Content-Type' : "multipart/form-data",
            'X-API-KEY' : API_KEY,
        },
    }
);
    if(!data?.data?.task_id){
        throw new Error("task id failed");
    }
    return data.data.task_id;
}

const fetchImage = async (taskId) => {
    try {
        const { data } = await axios.get(
            `${BASE_URL}/api/tasks/visual/scale/${taskId}`,
            {
                headers: {
                    'X-API-KEY': API_KEY,
                },
            }
        );

        console.log("Fetch Response:", data);
        if (!data?.data?.image) {
            console.warn("Image not ready yet, state:", data?.data?.state);
            return data.data;
        }

        return data.data;
    } catch (error) {
        console.error("Error fetching image:", error.response?.data || error.message);
        throw error;
    }
};

const poolForEnhancedImage = async (taskId, retry = 0) => {
    
    try {
        const result = await fetchImage(taskId);
        if (result.state === 4) {
            console.log("Image still processing... Retrying in 2 seconds",`${retry}/${MAX_TRY}`);

            if (retry >= MAX_TRY) {
                throw new Error("Max retry limit reached");
            }

            await new Promise((resolve) => setTimeout(resolve, 2000));
            return poolForEnhancedImage(taskId, retry + 1);
        }

        console.log("Enhanced Image URL:", result.image);
        return result.image;
    } catch (error) {
        console.error("Error in polling enhanced image:", error.message);
        throw error;
    }
};
