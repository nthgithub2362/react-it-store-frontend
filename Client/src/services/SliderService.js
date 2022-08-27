import axios from 'axios';





class SliderService {

    getSider(){
        return axios.get("http://localhost:8080/sliders");
    }
    getSiderPhone(){
        return axios.get("http://localhost:8080/sliders-phone");
    }
    getSiderLaptop(){
        return axios.get("http://localhost:8080/sliders-laptop");
    }
    getSiderWatch(){
        return axios.get("http://localhost:8080/sliders-watch");
    }
    getSiderAcess(){
        return axios.get("http://localhost:8080/sliders-accessorie");
    }
   

   
}

export default new SliderService()