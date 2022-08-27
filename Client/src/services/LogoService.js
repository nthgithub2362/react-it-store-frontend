import axios from 'axios';
class LogoService {
    getLogoPhone(){
        return axios.get('http://localhost:8080/logo-phone');
    }
    getLogoLaptop(){
        return axios.get('http://localhost:8080/logo-laptop');
    }
    getLogoWatch(){
        return axios.get('http://localhost:8080/logo-watch');
    }
    getLogoAc(){
        return axios.get('http://localhost:8080/logo-accessorie');
    }
}

export default new LogoService()