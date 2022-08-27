import React, { Component } from "react";
import axios from "axios";
import AdminService from "../../../services/AdminService";
import ProductService from "../../../services/ProductService";
import CategoriesService from "../../../services/CategoriesService";
import HeaderAdmin from "../HeaderAdmin";
import { Multiselect } from "multiselect-react-dropdown";
import { CKEditor } from "../../../../node_modules/@ckeditor/ckeditor5-react";
import ClassicEditor from "../../../../node_modules/@ckeditor/ckeditor5-build-classic";
import Select from "react-select";
import UploadService from "../../../services/UploadService";

var image = [];
var imagereview = [];
var imaged = [];
var arrayrelated = [];
var image_reviewed = [];
var selectedImage = [];

const date = new Date().toLocaleDateString();
class addProduct extends Component {
  fileObj = [];
  fileArray = [];
  constructor(props) {
    super(props);
    this.state = {
      // step 2
      id: this.props.match.params.id,
      name: "",
      title: "",
      description: "",
      paramater: "",
      image: "",
      brand: "",
      price: 0,
      price_net: 0,
      available: "",
      sold: "",
      deal_timer: "",
      event: "Không",
      gift: 0,
      promotion: "Không",
      cateid: 1,

      categorys: [],
      selectedFile: null,
      selectedValueProduct: [],
      imageDatas: [],

      selectedImage: [],
      IdproductNews: " ",
      //part review
      review: {},
      title_review: "",
      description_review: "",
      image_review: "",
      listImaged:[]
      //
    };

    this.onSelectPro = this.onSelectPro.bind(this);
    this.onRemovePro = this.onRemovePro.bind(this);

    this.changeNameHandler = this.changeNameHandler.bind(this);
    this.changeTitleHandler = this.changeTitleHandler.bind(this);
    this.changeDesCrHandler = this.changeDesCrHandler.bind(this);
    this.changeParaHandler = this.changeParaHandler.bind(this);
    this.changeBrandHandler = this.changeBrandHandler.bind(this);
    this.changePriceHandler = this.changePriceHandler.bind(this);
    this.changePriceNetHandler = this.changePriceNetHandler.bind(this);
    this.changeAvaiHandler = this.changeAvaiHandler.bind(this);
    this.changeSoldHandler = this.changeSoldHandler.bind(this);
    this.changeDateHandler = this.changeDateHandler.bind(this);
    this.changeCateHandler = this.changeCateHandler.bind(this);
    this.changeEventHandler = this.changeEventHandler.bind(this);
    this.changeGiftHandler = this.changeGiftHandler.bind(this);
    this.changeProMoHandler = this.changeProMoHandler.bind(this);
    this.saveOrupDateProduct = this.saveOrupDateProduct.bind(this);
    this.changeImageHandler = this.changeImageHandler.bind(this);
    this.changeProductImage = this.changeProductImage.bind(this);
    this.addProductImage = this.addProductImage.bind(this);
    //Part Review//
    this.changeProductImageReview = this.changeProductImageReview.bind(this);

    this.changeReviewDes = this.changeReviewDes.bind(this);
    this.changeReviewTitle = this.changeReviewTitle.bind(this);
  }

  // step 3
  componentDidMount() {
    console.log("review_image => " + JSON.stringify(imagereview));
    CategoriesService.getCategories().then((res) => {
      this.setState({ categorys: res.data });
    });
    // step 4
    if (this.state.id === "_add") {
      AdminService.getAllProductNoPaginiton().then((response) => {
        this.setState({ product: response.data });
      });
      return;
    } else {
      AdminService.getProductById(this.state.id).then((res) => {
        let product = res.data;
        this.setState({
          name: product.name,
          title: product.title,
          description: product.description,
          paramater: product.paramater,
          image: product.image,
          brand: product.brand,
          price: product.price,
          price_net: product.price_net,
          available: product.available,
          sold: product.sold,
          deal_timer: product.deal_timer,
          price: product.price,
          cateid: product.cateid,
          event: product.event,
          gift: product.gift,
          promotion: product.promotion,
        });
        this.setState({
          selectedValueProduct: product.productrelate,
        });

        ProductService.getReview(this.state.id).then((response) => {
          let review = response.data;
          this.setState({
            description_review: review.description_review,
            title_review: review.title_review,
            image_review: review.image_review,
          });
        });
        this.setState({
        listImaged : product.productimage
      });
        arrayrelated = product.productrelate;
        console.log("HÌnh ảnh liên quan => " + JSON.stringify(this.state.listImaged));
        console.log("Hình ảnh đã dùng => " + JSON.stringify(selectedImage));
      });
      AdminService.getAllProductNoPaginiton().then((response) => {
        this.setState({ product: response.data });
      });

      console.log("product_re => " + this.state.product);
    }
  }
  saveOrupDateProduct = (e) => {
    e.preventDefault();
    let product = {
      name: this.state.name,
      title: this.state.title,
      image: this.state.image,
      description: this.state.description,
      paramater: this.state.paramater,
      brand: this.state.brand,
      price: this.state.price,
      price_net: this.state.price_net,
      available: this.state.available,
      sold: this.state.sold,
      deal_timer: this.state.deal_timer,
      price: this.state.price,
      cateid: this.state.cateid,
      event: this.state.event,
      gift: this.state.gift,
      promotion: this.state.promotion,
    };
    let review = {
      description_review: this.state.description_review,
      image_review: this.state.image_review,
      title_review: this.state.title_review,
    };
    console.log("product => " + JSON.stringify(product));
    console.log("review => " + JSON.stringify(review));

    /// step 5
    if (this.state.id === "_add") {
      AdminService.CreateProduct(product).then(async (res) => {
        for (const f of this.state.imageDatas) {
          this.addProductImage(f);
        }
        this.addProductImage(image);
        this.addProductImageReview(imagereview);

        let ProductNew = res.data;
        this.setState({ IdproductNews: ProductNew.id });
        console.log("id =>" + this.state.IdproductNews);

        await AdminService.updateimages(
          selectedImage,
          this.state.IdproductNews
        ).then((res) => {});
        await AdminService.updateprolated(
          arrayrelated,
          this.state.IdproductNews
        ).then((res) => {});
        await AdminService.updateReview(review, this.state.IdproductNews).then(
          (res) => {}
        );
        console.log("review =>" + this.state.review);
      });

      alert("Thêm sản phẩm thành công!");
    } else {
      AdminService.updateProduct(product, this.state.id).then((res) => {});
      
        for (const f of this.state.imageDatas) {
          this.addProductImage(f);
        }
      
      
        this.addProductImage(image);
      
    
        this.addProductImageReview(imagereview);
      
      if (selectedImage !== []) {
        AdminService.updateimages(selectedImage, this.state.id).then(
          (res) => {}
        );
      }

      AdminService.updateprolated(arrayrelated, this.state.id).then(
        (res) => {}
      );
      this.addProductImageReview(imagereview);
      AdminService.updateReview(review, this.state.id).then((res) => {});
      alert("Cập nhật sản phẩm thành công");
    }
  };
  addProductImage = async (productId) => {
    await UploadService.addImage(productId);
  };
  addProductImageReview = async (productId) => {
    await UploadService.addImage(productId);
  };
  changeNameHandler = (event) => {
    this.setState({ name: event.target.value });
  };

  changeTitleHandler = (event) => {
    this.setState({ title: event.target.value });
  };
  changeDesCrHandler = (event, editor) => {
    const data = editor.getData();
    this.setState({ description: data });
  };
  changeParaHandler = (event, editor) => {
    const data = editor.getData();
    this.setState({ paramater: data });
  };

  changeProductImage = (e) => {
    image = [];
    let file = e.target.files[0];
    const imageData = new FormData();
    imageData.append("imageFile", file);
    this.setState({ image: file.name });
    image = imageData;
  };

  changeImageHandler = (event) => {
    let files = event.target.files;

    let imageArrays = [];
    selectedImage = [];
    for (const f of files) {
      const imageData = new FormData();
      imageData.append("imageFile", f);
      imageArrays.push(imageData);
      selectedImage.push({
        image: f.name,
      });
    }
    this.setState({ imageDatas: imageArrays });
   
  };
  changeBrandHandler = (event) => {
    this.setState({ brand: event.target.value });
  };
  changePriceHandler = (event) => {
    this.setState({ price: event.target.value });
  };
  changePriceNetHandler = (event) => {
    this.setState({ price_net: event.target.value });
  };
  changeAvaiHandler = (event) => {
    this.setState({ available: event.target.value });
  };
  changeSoldHandler = (event) => {
    this.setState({ sold: event.target.value });
  };
  changeDateHandler = (event) => {
    this.setState({ deal_timer: event.target.value });
  };
  changeCateHandler = (event) => {
    this.setState({ cateid: event.target.value });
  };
  changeEventHandler = (event) => {
    this.setState({ event: event.target.value });
  };
  changeGiftHandler = (event) => {
    this.setState({ gift: event.target.value });
  };
  changeProMoHandler = (event) => {
    this.setState({ promotion: event.target.value });
  };
  //Part review
  changeProductImageReview = (e) => {
    imagereview = [];
    let file = e.target.files[0];
    const imageData = new FormData();
    imageData.append("imageFile", file);
    this.setState({ image_review: file.name });
    imagereview = imageData;
  };
  changeReviewDes = (event, editor) => {
    const data = editor.getData();
    this.setState({ description_review: data });
  };
  changeReviewTitle = (event) => {
    this.setState({ title_review: event.target.value });
  };

  //End review
  cancel() {
    this.props.history.push(
      "/manager-product/page=" + localStorage.getItem("pagePresent")
    );
    localStorage.removeItem("pagePresent");
  }
  onSelectPro = (selectedValueProduct) => {
    arrayrelated = [];
    if (selectedValueProduct) {
      selectedValueProduct.forEach((se) => {
        arrayrelated.push({
          product_id: se.id,
          name: `${se.name}`,
        });
      });
    }
  };
  onRemovePro = (selectedValueProduct) => {
    arrayrelated = [];
    if (selectedValueProduct) {
      selectedValueProduct.forEach((se) => {
        arrayrelated.push({
          product_id: se.id,
          name: `${se.name}`,
        });
      });
      console.log(arrayrelated);
    }
  };
  getTitle() {
    if (this.state.id === "_add") {
      return <h3 className="text-center">THÊM SẢN PHẨM MỚI</h3>;
    } else {
      return <h3 className="text-center">CẬP NHẬT SẢN PHẨM</h3>;
    }
  }

  render() {
    return (
      <div>
        <HeaderAdmin />
        <nav className="navbar navbar-main navbar-expand-lg border-bottom">
          <div className="container">
            <div className="collapse navbar-collapse" id="main_nav">
              <ul className="navbar-nav">
                <li className="nav-item">
                  <button
                    className="btn btn-success"
                    onClick={this.saveOrupDateProduct}
                  >
                    <i class="fas fa-plus-circle"></i> Lưu
                  </button>
                </li>

                <li className="nav-item">
                  <button
                    className="btn btn-danger"
                    onClick={this.cancel.bind(this)}
                    style={{ marginLeft: "10px" }}
                  >
                    <i class="fas fa-ban"></i> Đóng
                  </button>
                </li>
              </ul>
            </div>{" "}
            {/* collapse .// */}
          </div>{" "}
          {/* container .// */}
        </nav>
        <div className="container">
          <h2>{this.getTitle()}</h2>

          <div className="row">
            <div className="col-md-9">
              <div className="form-group">
                <label> Ảnh đại diện </label>
                <input
                  name="image"
                  type="file"
                  className="form-control"
                  onChange={this.changeProductImage}
                />
              </div>
            
                    <div className="form-group">
                      <p>Ảnh đang sử dụng</p>
                      <img
                        width="20%"
                        src={"http://localhost:8080/images/" + this.state.image}
                        alt=""
                      />
                    </div>
           

              <div className="form-group">
                <label>
                  {" "}
                  Hình ảnh liên quan:{" "}
                  <p style={{ float: "right", marginLeft: "10px" }}>
                    (Giữ Ctrl để chọn nhiều ảnh)
                  </p>
                </label>
                <input
                  name="image"
                  type="file"
                  placeholder="Giữ Ctrl để chọn nhiều ảnh"
                  multiple
                  className="form-control"
                  onChange={this.changeImageHandler}
                />
              </div>
            
                    <div className="form-group">
                      <p>Ảnh đang sử dụng</p>
                      {this.state.listImaged.map((listimg) => (
                        <img
                          width="20%"
                          src={"http://localhost:8080/images/" + listimg.image}
                          alt=""
                        />
                      ))}
                    </div>
        
              <div className="form-group">
                <label> Tên sản phẩm: </label>
                <input
                  placeholder="Tên sản phẩm"
                  name="name"
                  className="form-control"
                  value={this.state.name}
                  onChange={this.changeNameHandler}
                />
              </div>
              <div className="form-group">
                <label> Tiêu đề </label>
                <input
                  placeholder="Tiêu đề"
                  name="title"
                  className="form-control"
                  value={this.state.title}
                  onChange={this.changeTitleHandler}
                />
              </div>
              <div className="form-group">
                <label> Mô tả </label>
                <CKEditor
                  editor={ClassicEditor}
                  onInit={(editor) => {
                    //// Here the editor is ready to be used
                  }}
                  data={this.state.description}
                  onChange={this.changeDesCrHandler}
                  config={{
                    // plugins: [ Essentials ],
                    ckfinder: {
                      // The URL that the images are uploaded to.
                      uploadUrl: "/upload",

                      // Enable the XMLHttpRequest.withCredentials property.
                      withCredentials: true,

                      // Headers sent along with the XMLHttpRequest to the upload server.
                      headers: {
                        "X-CSRF-TOKEN": "CSFR-Token",
                        Authorization: "Bearer <JSON Web Token>",
                      },
                    },
                  }}
                />
              </div>
              <div className="form-group">
                <label> Thông số kỹ thuật </label>
                <CKEditor
                  editor={ClassicEditor}
                  onInit={(editor) => {
                    //// Here the editor is ready to be used
                  }}
                  data={this.state.paramater}
                  onChange={this.changeParaHandler}
                  config={{
                    // plugins: [ Essentials ],
                    ckfinder: {
                      // The URL that the images are uploaded to.
                      uploadUrl: "/upload",

                      // Enable the XMLHttpRequest.withCredentials property.
                      withCredentials: true,

                      // Headers sent along with the XMLHttpRequest to the upload server.
                      headers: {
                        "X-CSRF-TOKEN": "CSFR-Token",
                        Authorization: "Bearer <JSON Web Token>",
                      },
                    },
                  }}
                />
              </div>

              <h3>PHẦN ĐÁNH GIÁ GIÁ SẢN PHẨM</h3>
              <div className="form-group">
                <label> Hình ảnh đánh giá </label>
                <input
                  name="image_review"
                  type="file"
                  className="form-control"
                  onChange={this.changeProductImageReview}
                />
              </div>
              
                    <div className="form-group">
                      <p>Ảnh đang sử dụng</p>

                      <img
                        width="20%"
                        src={
                          "http://localhost:8080/images/" +
                          this.state.image_review
                        }
                        alt=""
                      />
                    </div>
              
              <div className="form-group">
                <label> Tiêu đề đánh giá </label>
                <input
                  placeholder="Tiêu đề"
                  name="title"
                  className="form-control"
                  value={this.state.title_review}
                  onChange={this.changeReviewTitle}
                />
              </div>
              <div className="form-group">
                <label> Nội dung đánh giá </label>
                <CKEditor
                  editor={ClassicEditor}
                  onInit={(editor) => {
                    //// Here the editor is ready to be used
                  }}
                  data={this.state.description_review}
                  onChange={this.changeReviewDes}
                  config={{
                    // plugins: [ Essentials ],
                    ckfinder: {
                      // The URL that the images are uploaded to.
                      uploadUrl: "/upload",

                      // Enable the XMLHttpRequest.withCredentials property.
                      withCredentials: true,

                      // Headers sent along with the XMLHttpRequest to the upload server.
                      headers: {
                        "X-CSRF-TOKEN": "CSFR-Token",
                        Authorization: "Bearer <JSON Web Token>",
                      },
                    },
                  }}
                />
              </div>
              <div></div>
            </div>
            <div className="col-md-3 ">
              <div className="form-group">
                <label> Số lượng tồn </label>
                <input
                  placeholder="Số lượng tồn"
                  name="available"
                  type="number"
                  className="form-control"
                  value={this.state.available}
                  onChange={this.changeAvaiHandler}
                />
              </div>
              <div className="form-group">
                <label> Đã bán</label>
                <input
                  type="number"
                  placeholder="Đã bán"
                  name="sold"
                  className="form-control"
                  value={this.state.sold}
                  onChange={this.changeSoldHandler}
                />
              </div>
              <div className="form-group">
                <label> Thương hiệu</label>
                <br />
                <select
                  class="form-control"
                  value={this.state.brand}
                  onChange={this.changeBrandHandler}
                >
                  <option value="iPhone">iPhone</option>
                  <option value="Samsung">SamSung</option>
                  <option value="Xiaomi">Xiaomi</option>
                  <option value="Macbook">Macbook</option>

                  <option value="Apple Watch">Apple Watch</option>
                  <option value="Oppo">Oppo</option>
                  <option value="Vivo">Vivo</option>
                  <option value="Vsmart">Vsmart</option>
                  <option value="Realme">Realme</option>
                  <option value="Nokia">Nokia</option>
                  <option value="Msi">MSI</option>
                  <option value="Asus">ASUS</option>
                  <option value="Lenovo">LENOVO</option>
                  <option value="Acer">ACER</option>

                  <option value="Sony">SONY</option>
                  <option value="Anker">ANKER</option>
                  <option value="Hp">HP</option>
                  <option value="Hp">DELL</option>
                </select>
              </div>
              <div className="form-group">
                <label> Phương thức khuyến mãi</label>
                <br />
                <select
                  className="form-control"
                  value={this.state.promotion}
                  onChange={this.changeProMoHandler}
                >
                  <option value="Không">Không</option>
                  <option value="Mua online">Mua online</option>
                  <option value="Chỉ bán online">Chỉ bán online</option>
                </select>
              </div>
              <div className="form-group">
                <label> Sự kiện</label>
                <br />
                <select
                  className="form-control"
                  value={this.state.event}
                  onChange={this.changeEventHandler}
                >
                  <option value="Không">Không</option>
                  <option value="Sinh nhật">Sinh nhật</option>
                  <option value="Giảm giá đầu năm">Giảm giá đầu năm</option>
                </select>
              </div>
              <div className="form-group">
                <label> Quà</label>
                <input
                  placeholder="Quà"
                  name="gift"
                  type="number"
                  className="form-control"
                  value={this.state.gift}
                  onChange={this.changeGiftHandler}
                />
              </div>
              <div className="form-group">
                <label> Giá gốc </label>
                <input
                  placeholder="Giá gốc"
                  name="price"
                  className="form-control"
                  value={this.state.price}
                  onChange={this.changePriceHandler}
                />
              </div>
              <div className="form-group">
                <label> Khuyến mãi (%)</label>
                <input
                  type="number"
                  placeholder=" Khuyến mãi"
                  name="price_net"
                  className="form-control"
                  value={this.state.price_net}
                  max={80}
                  min={0}
                  default={0}
                  onChange={this.changePriceNetHandler}
                />
              </div>

              <div className="form-group">
                <label> Danh mục </label>
                <br></br>
                <select
                  className="form-control"
                  onChange={this.changeCateHandler}
                  value={this.state.cateid}
                >
                  {this.state.categorys.map((category) => (
                    <option value={category.id}>{category.name}</option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label>Chọn sản phẩm liên quan</label>
                <Multiselect
                  options={this.state.product} // Options to display in the dropdown
                  selectedValues={this.state.selectedValueProduct} // Preselected value to persist in dropdown
                  onSelect={this.onSelectPro} // Function will trigger on select event
                  onRemove={this.onRemovePro} // Function will trigger on remove event
                  displayValue="name" // Property name to display in the dropdown options
                  selectionLimit="10"
                />
              </div>

              <div className="form-group">
                <label> Ngày tạo </label>
                <input
                  type="date"
                  placeholder="Ngày tạo"
                  name="deal_timer"
                  className="form-control"
                  value={this.state.deal_timer}
                  onChange={this.changeDateHandler}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default addProduct;
