import axios from 'axios';

const Cate_API_BASE_URL_1 = "http://localhost:8080/categories/detailpr";


class CategoriesService {

    getCategories(){
        return axios.get('http://localhost:8080/categories');
    }
    getCategoriesPr(cateid){
    return axios.get(Cate_API_BASE_URL_1 + '/' + cateid);
    }
    getCategoriesAll(){
        return axios.get('http://localhost:8080/categories-admin');
    }
    getCp(){
        return axios.get('http://localhost:8080/c-p');
    }
    getCl(){
        return axios.get('http://localhost:8080/c-l');
    }
    getCm(){
        return axios.get('http://localhost:8080/c-m');
    }
    getCs(){
        return axios.get('http://localhost:8080/c-s');
    }
    getCk(){
        return axios.get('http://localhost:8080/c-k');
    }
    getCb(){
        return axios.get('http://localhost:8080/c-b');
    }

   
}

export default new CategoriesService()