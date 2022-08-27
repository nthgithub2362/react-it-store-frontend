import React, { Component } from "react";
import { confirmAlert } from 'react-confirm-alert'
import HeaderAdmin from "../HeaderAdmin";
import NumberFormat from "react-number-format";
import AdminService from "../../../services/AdminService";
import ProductService from "../../../services/ProductService";

import NewService from "../../../services/NewService";
import ReactHtmlParser, { processNodes, convertNodeToElement, htmlparser2 } from 'react-html-parser';
class ManagerNews extends Component {
  constructor(props) {
    super(props);
    this.state = {
      content: [],
      currentPage: this.props.match.params.page,
      size: 4,
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
    if (this.state.currentPage > 1) this.props.history.push("/manager-news/page="+(this.state.currentPage -= 1));
    this.findAll(this.state.currentPage);
    this.changcurrentPage(this.state.currentPage);
  }
  nextPage() {
    let condition = Math.ceil(this.state.totalElements / this.state.size);
    if (this.state.currentPage < condition) this.props.history.push("/manager-news/page="+(this.state.currentPage += 1));
    this.findAll(this.state.currentPage);
    this.changcurrentPage(this.state.currentPage);
  }
  findAll(currentPage) {
    currentPage -= 1;
    NewService.getNews(currentPage, this.state.size)
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
    this.props.history.push("/news-_add");
    localStorage.setItem("pagePresent",this.state.currentPage);
  }
  editEmployee(id) {
    this.props.history.push(`/news-${id}`);
    localStorage.setItem("pagePresent",this.state.currentPage);
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
      message: 'Bạn muốn xóa tin này không.',
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
                  <i className="fas fa-table me-1" />
                  Tin Tức
                </h3>{" "}
                <button
                  type="text"
                  className="btn btn-primary"
                  onClick={this.addProduct}
                >
                  <i class="fa fa-plus" aria-hidden="true"></i> Thêm mới(Tin tức)
                </button>
              </div>

              <div className="">
                <table class="table table-hover">
                  <thead class="thead-light">
                    <tr>
              
                      <th>Hình ảnh</th>
                      <th>Tiêu đề</th>
                      
                      <th style={{width:'200px'}}>Lựa chọn</th>
                    </tr>
                  </thead>
                  <tfoot class="thead-light">
                    <tr>
               
                      <th style={{width:'200px'}}>Hình ảnh</th>
                  
                      <th>Tiêu đề</th>
                      <th style={{width:'200px'}}>Lựa chọn</th>
                    </tr>
                  </tfoot>
                  <tbody>
                    {this.state.content.map((allproduct) => (
                      <tr key={allproduct.id}>
                    
                        
                        <td>
                          {" "}
                          <div className="aside">
                            <img
                              width="100%"
                              src={
                                "http://localhost:8080/images/" +
                                allproduct.image
                              }
                              alt="logo"
                            />
                          </div>
                        </td>
                        <td>{allproduct.title}  </td>

                        
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

export default ManagerNews;
