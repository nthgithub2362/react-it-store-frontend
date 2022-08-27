import axios from "axios";
class AdminService {
  getAllAdmin(page) {
    return axios.get("http://localhost:8080/admin/all-product?page=" + page);
  }
  CreateProduct(product) {
    return axios.post("http://localhost:8080/admin/addProduct", product);
  }
  async addProductImage(imageData, productId, type) {
    const response = await axios.post(
      `http://localhost:8080/admin/add-product-image/${productId}`,
      imageData,
      {
        onUploadProgress: (progressEvent) => {
          console.log(
            "Uploading : " +
              ((progressEvent.loaded / progressEvent.total) * 100).toString() +
              "%"
          );
        },
        params: {
          type,
        },
      }
    );
  }
  getProductById(productId) {
    return axios.get("http://localhost:8080/admin" + "/" + productId);
  }
  updateProduct(product, productId) {
    return axios.put("http://localhost:8080/admin/" + productId, product);
  }
  deleteProduct(productId) {
    return axios.delete("http://localhost:8080/admin" + "/" + productId);
  }
  getAllProductNoPaginiton() {
    return axios.get("http://localhost:8080/all-product");
  }
  updateprolated(productrelated, id) {
    return axios.put(
      "http://localhost:8080/admin/productrelated/" + id,
      productrelated
    );
  }
  updateimages(productimages,id) {
    return axios.put(
      "http://localhost:8080/admin/product-images/"+id,
      productimages
    );
  }
  updateReview(review,id) {
    return axios.put(
      "http://localhost:8080/admin/admin-review/"+id,
      review
    );
  }
  ///Part New
  CreateNew(news) {
    return axios.post("http://localhost:8080/addNew", news);
  }
  getNewById(newid) {
    return axios.get("http://localhost:8080/new/" + newid);
  }
  updateNew(news, newid) {
    return axios.put("http://localhost:8080/updateNew/" + newid, news);
  }
  deleteNew(newid) {
    return axios.delete("http://localhost:8080/deleteNew" + "/" + newid);
  }
  ///Part Category
  getAllCategory(page) {
    return axios.get("http://localhost:8080/admin-categories?page=" + page);
  }
  CreateCate(cate) {
    return axios.post("http://localhost:8080/addCategories", cate);
  }
  getCateById(cateid) {
    return axios.get("http://localhost:8080/categories/" + cateid);
  }
  updateCate(cate, cateid) {
    return axios.put("http://localhost:8080/updateCategories/" + cateid, cate);
  }
  deleteCate(cateid) {
    return axios.delete("http://localhost:8080/deleteCategories/" + cateid);
  }
}
export default new AdminService();
