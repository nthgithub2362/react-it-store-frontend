import axios from 'axios';





class UploadService {

    async addImage(imageData) {
        return axios.post(`http://localhost:8080/admin/addimage`, imageData
        , {
            onUploadProgress: progressEvent => {
                console.log("Uploading : " + ((progressEvent.loaded / progressEvent.total) * 100).toString() + "%")
            }
        });
    }
    async addProductImage(imageData, productId, type) {
        const response = await axios.post(`http://localhost:8080/admin/add-product-image/${productId}`, imageData, {
            onUploadProgress: progressEvent => {
                console.log("Uploading : " + ((progressEvent.loaded / progressEvent.total) * 100).toString() + "%")
            },
            params: {
                type
            }
        });
    }
   

   
}

export default new UploadService()