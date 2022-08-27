import React, { Component } from 'react';
import axios from "axios";
import AdminService from "../../../services/AdminService";
import ProductService from "../../../services/ProductService";
import CategoriesService from "../../../services/CategoriesService";
import HeaderAdmin from "../HeaderAdmin";
import { Multiselect } from "multiselect-react-dropdown";
import { CKEditor } from "../../../../node_modules/@ckeditor/ckeditor5-react";
import ClassicEditor from "../../../../node_modules/@ckeditor/ckeditor5-build-classic";
class addCategories extends Component {
    constructor(props) {
        super(props);
        this.state = {
          // step 2
          id: this.props.match.params.id,
          name: "",
          id_parent:0,
          categorys: [],
         
        };
        this.changeNameHandler = this.changeNameHandler.bind(this);
        
        this.changeLevelHandler = this.changeLevelHandler.bind(this);
        
    
        this.saveOrupDateProduct = this.saveOrupDateProduct.bind(this);
      }
      // step 3
      componentDidMount() {
        CategoriesService.getCategoriesAll().then((res) => {
            this.setState({ categorys: res.data });
          });
        // step 4
        if (this.state.id === "_add") {
          return;
        } else {
          AdminService.getCateById(this.state.id).then((res) => {
            let category = res.data;
            this.setState({
              name: category.name,
              
              id_parent: category.id_parent,
             
            });
           
           
          });
       
        }
      }
      saveOrupDateProduct = (e) => {
        e.preventDefault();
        let category = {
          name: this.state.name,
          id_parent: this.state.id_parent,
         
        };
        console.log("category => " + JSON.stringify(category));
    
        /// step 5
        if (this.state.id === "_add") {
          AdminService.CreateCate(category).then((res) => {
            alert("Thêm danh mục thành công!");
          });
        } else {
          AdminService.updateCate(category, this.state.id).then((res) => {
            alert("Cập nhật danh mục thành công!");
          });
        
        }
      };
      
      changeNameHandler = (event) => {
        this.setState({ name: event.target.value });
      };
      changeLevelHandler = (event) => {
        this.setState({ id_parent: event.target.value });
      };
      cancel() {
        this.props.history.push("/manager-category/page="+localStorage.getItem("pagePresent"));
    localStorage.removeItem("pagePresent");
      }
      
      getTitle() {
        if (this.state.id === "_add") {
          return <h3 className="text-center">Thêm danh mục mới</h3>;
        } else {
          return <h3 className="text-center">Cập nhật danh mục</h3>;
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
                    <label> Tên </label>
                    <input
                      placeholder="Tên danh mục"
                      name="name"
                      className="form-control"
                      value={this.state.name}
                      onChange={this.changeNameHandler}
                    />
                  </div>
                  <div className="form-group">
                    <label> Cấp độ(con)</label>
                    <br/>
                    <select  class="form-control"
                  
                  value={this.state.id_parent}
                  onChange={this.changeLevelHandler}
                >
                    <option value={0}>Không</option>
                  {this.state.categorys.map((category) => {
                    return(
                      <div>
                      <option value={category.id}>{category.name}</option>
                      {this.state.categorys.map((category) => {
                        return(
                          <div>
                      <option value={category.id}>{category.name}</option>
                      
                    </div>
                        );
                         })
                        }
                    </div>
                    );
                      
                    
                  })
                }
                </select>
                  </div>
                 
                </div>
              </div>
            </div>
          </div>
        );
      }
    }
export default addCategories;