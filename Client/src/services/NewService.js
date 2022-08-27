import axios from 'axios';

const News = "http://localhost:8080/news";
const News_API_BASE_URL_Phone = "http://localhost:8080/news/phone";
const News_API_BASE_URL_Lap = "http://localhost:8080/news/lap";
const News_API_BASE_URL_Watc = "http://localhost:8080/news/watch";
class NewService {

    getNews(page){
        return axios.get("http://localhost:8080/news?page="+page);
    }
    getListNewPhones(){
        return axios.get(News_API_BASE_URL_Phone);
    }
    getListNewLaps(){
        return axios.get(News_API_BASE_URL_Lap);
    }
    getListNewWatcs(){
        return axios.get(News_API_BASE_URL_Watc);
    }
    getNewHigh(){
        return axios.get('http://localhost:8080/news-highlight');
    }
    getListNewHigh(){
        return axios.get('http://localhost:8080/news-list-light');
    }
    getListProductOfNew(){
        return axios.get('http://localhost:8080/list-of-new');
    }
    getListNewRight(){
        return axios.get('http://localhost:8080/news-list-new');
    }
    getListNewPro(){
        return axios.get('http://localhost:8080/news-list-pro');
    }
    getListNewTips(){
        return axios.get('http://localhost:8080/news-list-tips');
    }
    // getNewRe(){
    //     return axios.get(Phone_API_BASE_URL);
    // }
  

    // createPhone(phone){
    //     return axios.post(Phone_API_BASE_URL, phone);
    // }

    getNewById(newId){
        return axios.get("http://localhost:8080/news/detail-new" + '/' + newId);
    }
    // getNewDetail(newId){
    //     return axios.get(News_API_BASE_URL_2 + '/' + newId);
    // }
    // updatePhone(phone, phoneId){
    //     return axios.put(Phone_API_BASE_URL + '/' + phoneId, phone);
    // }
    // getlistRelated(phoneId){
    //     return axios.get(Phone_API_BASE_URL_1 + '/' + phoneId);
    // }

    // deletePhone(phoneId){
    //     return axios.delete(Phone_API_BASE_URL + '/' + phoneId);
    // }
}

export default new NewService()