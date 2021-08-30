import axios from 'axios';

class apiRequestService{
    async sendformData(url, data){
        const config = {
            headers:{
                "content-type": "application/json"
            }
        }       
        try{
            const response = await axios.post(url,data,config);
            // console.log(response);
            return response;
        }
        catch(err){
            // console.log(err);
            return err;
        }
    }

    async getuser(url,data,token){
        const config = {
            headers:{
                "content-type": "application/json",
                "Authorization":`Bearer ${token}`
            }
        }
        try{
            const response = await axios.post(url,data,config);
            return response;
        }
        catch(err){
            return err.message;
        }

    }

    async fetchData(url){
        try{
            const response = await axios.get(url);
            return response;
        }
        catch(err){
            return err;
        }
    }

    async fetchPrivateData(url,token){
        const config = {
            headers:{
                "content-type": "application/json",
                "Authorization":`Bearer ${token}`
            }
        };
        try {
            const response = await axios.get(url,config);
            return response;
        } catch (error) {
            return error;
        }

    }

    async fileUpload(url,data,token){
        const config = {
            headers:{
                "content-type": "multipart/form-data",
                "Authorization":`Bearer ${token}`
            }
        }
        try {
            const response = await axios.post(url,data,config);
            // console.log(response);
            return response;
        } catch (error) {
            // console.log(error);
            return error;    
        }
    }

    userGoogleLogin=async(url,data)=>{
        try{
            const config ={
                headers:{
                    "content-type": "application/json"
                }
            }
            const response = await axios.post(url,data,config)
            return response;
        }
        catch(error){
            return error;
        }
    }

    userFacebookLogin=async(url,data)=>{
        try{
            const config ={
                headers:{
                    "content-type": "application/json"
                }
            }
            const response = await axios.post(url,data,config)
            return response;
        }
        catch(error){
            return error;
        }
    }

}

export default apiRequestService;