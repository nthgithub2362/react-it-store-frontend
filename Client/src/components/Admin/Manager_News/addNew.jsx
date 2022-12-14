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
import NewService from "../../../services/NewService";
import UploadService from "../../../services/UploadService";
var image = [];
class addNew extends Component {
 
  constructor(props) {
    super(props);
    this.state = {
      // step 2
      id: this.props.match.params.id,
      name: "",
      title: "",
      description: "",
      image: "",
      type: "phone",
 
    };

    this.changeNameHandler = this.changeNameHandler.bind(this);
    this.changeTitleHandler = this.changeTitleHandler.bind(this);
    this.changeDesCrHandler = this.changeDesCrHandler.bind(this);
  
    this.changeTypeHandler = this.changeTypeHandler.bind(this);
    this.changeProductImage = this.changeProductImage.bind(this);
    this.addProductImage = this.addProductImage.bind(this);

    this.saveOrupDateProduct = this.saveOrupDateProduct.bind(this);
  }
  // step 3
  componentDidMount() {
    // step 4
    if (this.state.id === "_add") {
      return;
    } else {
      AdminService.getNewById(this.state.id).then((res) => {
        let product = res.data;
        this.setState({
          name: product.name,
          title: product.title,
          description: product.description,
          image: product.image,
          type: product.type,
        });
      });
      console.log("image => " + JSON.stringify(image));
    }
  }
  saveOrupDateProduct = (e) => {
    e.preventDefault();
    let product = {
      name: this.state.name,
      title: this.state.title,
      description: this.state.description,
      image: this.state.image,
      type: this.state.type,
    };
    console.log("image => " + JSON.stringify(image));

    /// step 5
    if (this.state.id === "_add") {
      AdminService.CreateNew(product).then((res) => {
        this.addProductImage(image);
      });
      
     
    
      alert("Th??m tin t???c th??nh c??ng!");
    } else {
      AdminService.updateNew(product, this.state.id).then((res) => {
        if (image !== "[]") {
          this.addProductImage(image);
        }
      });
   
      alert("C???p nh???t tin t???c th??nh c??ng!");
    }
  };
  addProductImage = async (productId) => {
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
  changeProductImage = (e) => {
    image = [];
    let file = e.target.files[0];
    const imageData = new FormData();
    imageData.append("imageFile", file);
    this.setState({ image: file.name });
    image = imageData;
    console.log(image);
  };

  changeTypeHandler = (event) => {
    this.setState({ type: event.target.value });
  };
  cancel() {
    this.props.history.push(
      "/manager-news/page=" + localStorage.getItem("pagePresent")
    );
    localStorage.removeItem("pagePresent");
  }

  getTitle() {
    if (this.state.id === "_add") {
      return <h3 className="text-center">TH??M TIN T???C M???I</h3>;
    } else {
      return <h3 className="text-center">C???P NH???T TIN T???C</h3>;
    }
  }

  render() {
    return (
      <div className="container">
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
                    <i class="fas fa-plus-circle"></i> L??u
                  </button>
                </li>

                <li className="nav-item">
                  <button
                    className="btn btn-danger"
                    onClick={this.cancel.bind(this)}
                    style={{ marginLeft: "10px" }}
                  >
                    <i class="fas fa-ban"></i> ????ng
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
                <label> T??n </label>
                <input
                  placeholder="T??n s???n ph???m"
                  name="name"
                  className="form-control"
                  value={this.state.name}
                  onChange={this.changeNameHandler}
                />
              </div>
              <div className="form-group">
                <label> Ti??u ????? </label>
                <input
                  placeholder="Ti??u ?????"
                  name="title"
                  className="form-control"
                  value={this.state.title}
                  onChange={this.changeTitleHandler}
                />
              </div>
              <div className="form-group">
                <label> H??nh ???nh ?????i di???n </label>
                <div className="form-control">
                  <input type="file" onChange={this.changeProductImage} />
                </div>
               
              </div>
              
                      <div className="form-group">
                        <p>???nh ??ang s??? d???ng</p>
                        <img
                          width="30%"
                          src={
                            "http://localhost:8080/images/" + this.state.image
                          }
                          alt=""
                        />
                      </div>
             
            </div>
            <div className="col-md-3 ">
              <div className="form-group">
                <label> Tin t???c v???</label>
                <br />
                <select
                  className="form-control"
                  value={this.state.type}
                  onChange={this.changeTypeHandler}
                >
                  <option value="phone">??i???n Tho???i</option>
                  <option value="laptop">Laptop</option>
                  <option value="watch">?????ng H???</option>
                  <option value="promotion">Khuy???n m??i</option>
                  <option value="tips">Th??? thu???t</option>
                  <option value="accessories">Ph??? ki???n</option>
                </select>
              </div>
            </div>
          </div>
        </div>
        <div className="form-group">
          <label> M?? t??? </label>
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
      </div>
    );
  }
}
export default addNew;
