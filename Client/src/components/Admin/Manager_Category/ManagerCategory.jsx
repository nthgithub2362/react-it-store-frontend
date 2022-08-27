import React, { Component } from "react";
import { confirmAlert } from 'react-confirm-alert'
import HeaderAdmin from "../HeaderAdmin";
import NumberFormat from "react-number-format";
import AdminService from "../../../services/AdminService";
import ProductService from "../../../services/ProductService";

import NewService from "../../../services/NewService";
import ReactHtmlParser, { processNodes, convertNodeToElement, htmlparser2 } from 'react-html-parser';
class ManagerCategory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      content: [],
      currentPage: this.props.match.params.page,
      size: 6,
      disabled1: "",
      disabled2: "",
      product:'',
      isDialogOpen: false
    };

    this.nextPage = this.nextPage.bind(this);
    this.previousPage = this.previousPage.bind(this);
    this.findAll = this.findAll.bind(this);
    this.addProduct = this.addProduct.bind(this);
    this.deleteProduct = this.deleteProduct.bind(this);
    this.submit = this.submit.bind(this);
  }
  changcurrentPage(currentPage) {
    let condition = Math.ceil(this.state.totalElements / this.state.size);
    if (this.state.currentPage < condition)
      if (currentPage === 1) this.setState({ disabled1: "disabled" });
      else this.setState({ disabled1: " " });
    if (currentPage === condition) this.setState({ disabled2: "disabled" });
    else this.setState({ disabled2: " " });
  }
  previousPage() {
    if (this.state.currentPage > 1) this.props.history.push("/manager-category/page="+(this.state.currentPage -= 1));
    this.findAll(this.state.currentPage);
    this.changcurrentPage(this.state.currentPage);
  }
  nextPage() {
    let condition = Math.ceil(this.state.totalElements / this.state.size);
    if (this.state.currentPage < condition) this.props.history.push("/manager-category/page="+(this.state.currentPage += 1));
    this.findAll(this.state.currentPage);
    this.changcurrentPage(this.state.currentPage);
  }
  findAll(currentPage) {
    currentPage -= 1;
    AdminService.getAllCategory(currentPage, this.state.size)
      .then((response) => response.data)
      .then((data) => {
        this.setState({
          content: data.content,
          totalPages: data.totalPages,
          totalElements: data.totalElements,
          currentPage: data.number + 1,
        });
      });
  }
  componentDidMount() {
    this.changcurrentPage(this.state.currentPage);
    this.findAll(this.state.currentPage);
  }
  addProduct() {
    localStorage.setItem("pagePresent",this.state.currentPage);
    this.props.history.push("/add-categories/_add");
  }
  editEmployee(id) {
    localStorage.setItem("pagePresent",this.state.currentPage);
    this.props.history.push(`/add-categories/${id}`);
   
  }
  deleteProduct(id) {

   
   
    AdminService.deleteNew(id).then((res) => {
      this.setState({
        content: this.state.content.filter((product) => product.id !== id),
      });
    });
    
    
    
  }
  
 
 
  submit = (id,idr) =>{
    confirmAlert({
      title: 'Bạn có chắc không?',
      message: 'Bạn muốn xóa danh mục này không.',
      buttons: [
        {
          label: 'Xóa luôn',
          onClick: () => this.deleteProduct(id,idr)
        },
        {
          label: 'Đóng',
          onClick: () => this.onClose
        }
      ]
    });
  };

  render() {
    
    return (
      <div>
        <HeaderAdmin />
        <div className='container'>
        
      </div >
        <main className="container">
          <div >
            <div className="card mb-12">
              <div className="card-header">
           
               
                <h3>
                
                  Danh mục
                </h3>{" "}
                <button
                  type="text"
                  className="btn btn-primary"
                  onClick={this.addProduct}
                >
                  <i class="fa fa-plus" aria-hidden="true"></i> Thêm Danh Mục Mới
                </button>
              </div>

              <div className="">
                <table class="table table-hover">
                  <thead class="thead-light">
                    <tr>
              
                      <th>Mã</th>
                      <th>Tên</th>
                     
                      <th style={{width:'200px'}}>Lựa chọn</th>
                    </tr>
                  </thead>
                 
                  <tbody>
                    {this.state.content.map((allproduct) => (
                      <tr key={allproduct.id}>
                    
                        
                        <td>
                        {allproduct.id}
                        </td>
                        <td>{allproduct.name}  </td>

                     
                        <td>
                      
                       
                        <button
                        
                          className="btn btn-success"
                          onClick={() => this.editEmployee(allproduct.id)}
                        >
                         
                        <i class="fas fa-edit"></i>
                        </button>
                        
                      
                        <button
                        style={{marginLeft:'20px'}}
                          onClick={() => this.submit(allproduct.id)}
                          className="btn btn-danger"
                        >
                         <i class="fa fa-trash" aria-hidden="true"></i>{" "}
                        </button>
                       
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div style={{ paddingBottom: "10px",float: "right" }}>
                  <nav aria-label="Page navigation example">
                    <ul className="pagination">
                      <li className={"page-item " + this.state.disabled1}>
                        <button
                          className="page-link"
                          href="#"
                          onClick={this.previousPage}
                        >
                          <i class="fa fa-arrow-left" aria-hidden="true"></i>
                        </button>
                      </li>
                      <li className="page-item active">
                        <a
                          className="page-link"
                          value={this.state.currentPage}
                          onChange={this.changcurrentPage}
                        >
                          {this.state.currentPage}
                        </a>
                      </li>
                      <li className={"page-item " + this.state.disabled2}>
                        {" "}
                        <button className="page-link" onClick={this.nextPage}>
                          <i class="fa fa-arrow-right" aria-hidden="true"></i>
                        </button>
                      </li>
                    </ul>
                  </nav>
                </div>
              </div>
            </div>
          </div>
        </main>

        
      </div>
    );
  }
}

export default ManagerCategory;
