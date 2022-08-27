import axios from "axios";

const Phone_API_BASE_URL = "http://localhost:8080/products";
const Phone_API_BASE_URL_1 = "http://localhost:8080/products/detail-product";
const Phone_API_BASE_URL_2 =
  "http://localhost:8080/products/detail-product/detail";
const Phone_API_BASE_URL_Phone = "http://localhost:8080/products/phone";
const Phone_API_BASE_URL_Lap = "http://localhost:8080/products/lap";
const Phone_API_BASE_URL_Watc = "http://localhost:8080/products/watch";
const Review_API_BASE_URL_Watc = "http://localhost:8080/products/reviews";

class ProductService {
  getListAll(page) {
    return axios.get("http://localhost:8080/products?page=" + page);
  }
  getListPhones() {
    return axios.get(Phone_API_BASE_URL_Phone);
  }
  getListSale() {
    return axios.get("http://localhost:8080/products/sale");
  }
  getListLaps() {
    return axios.get(Phone_API_BASE_URL_Lap);
  }
  getListWatcs() {
    return axios.get(Phone_API_BASE_URL_Watc);
  }
  getPhonesRe() {
    return axios.get(Phone_API_BASE_URL);
  }
  getlistACE() {
    return axios.get("http://localhost:8080/products/accessories");
  }
  getlistBuyWithACE() {
    return axios.get("http://localhost:8080/phone-buy-with-accessories");
  }
  getlistLapBuyWithACE() {
    return axios.get("http://localhost:8080/laptop-buy-with-accessories");
  }

  createPhone(phone) {
    return axios.post(Phone_API_BASE_URL, phone);
  }

  getProductById(phoneId) {
    return axios.get(Phone_API_BASE_URL + "/" + phoneId);
  }
  getReviewById(phoneId) {
    return axios.get(Review_API_BASE_URL_Watc + "/" + phoneId);
  }
  getProductDetail(phoneId) {
    return axios.get(Phone_API_BASE_URL_2 + "/" + phoneId);
  }
  updatePhone(phone, phoneId) {
    return axios.put(Phone_API_BASE_URL + "/" + phoneId, phone);
  }
  getlistRelated(phoneId) {
    return axios.get("http://localhost:8080/products/detail-product/" + phoneId);
  }
  getReview(reviewid) {
    return axios.get("http://localhost:8080/review-productid/" + reviewid);
  }
  deletePhone(phoneId) {
    return axios.delete(Phone_API_BASE_URL + "/" + phoneId);
  }

  findByName(name) {
    return axios.get(Phone_API_BASE_URL + "/" + `search?name=${name}`);
  }

  getSearch(name) {
    return axios.get("http://localhost:8080/search", {
      params: {
        name,
      },
    });
  }
  getFilter(price_small,price_large,brand) {
    return axios.get("http://localhost:8080/filter", {
      params: {
        price_small,
        price_large,
        brand,
      },
    });
  }
  //list Brand
  getFilterBrand(brand) {
    return axios.get("http://localhost:8080/filter/phone-brand", {
      params: {
        brand,
      },
    });
  }
}

export default new ProductService();
