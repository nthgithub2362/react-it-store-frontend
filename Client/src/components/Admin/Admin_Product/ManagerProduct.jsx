import React, { Component } from "react";
import { confirmAlert } from 'react-confirm-alert'
import HeaderAdmin from "../HeaderAdmin";
import NumberFormat from "react-number-format";
import AdminService from "../../../services/AdminService";
import ProductService from "../../../services/ProductService";

class ManagerProduct extends Component {
  constructor(props) {
    super(props);
    this.state = {
      content: [],
      currentPage: this.props.match.params.page,
      size: 10,
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
    if (this.state.currentPage > 1) this.props.history.push("/manager-product/page="+(this.state.currentPage -= 1));
    this.findAll(this.state.currentPage);
    this.changcurrentPage(this.state.currentPage);
  }
  nextPage() {
    let condition = Math.ceil(this.state.totalElements / this.state.size);
    if (this.state.currentPage < condition) 
    this.props.history.push("/manager-product/page="+(this.state.currentPage += 1))
    // this.state.currentPage += 1;
    this.findAll(this.state.currentPage);
    this.changcurrentPage(this.state.currentPage);
  }
  findAll(currentPage) {
    currentPage -= 1;
    AdminService.getAllAdmin(currentPage, this.state.size)
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
    this.props.history.push("/product-_add");
    
  }
  editEmployee(id) {
    this.props.history.push(`/product-${id}`);
    localStorage.setItem("pagePresent",this.state.currentPage);
  }
  deleteProduct(id,idr) {

    
   
    AdminService.deleteProduct(id).then((res) => {
      this.setState({
        content: this.state.content.filter((product) => product.id !== id),
      });
    });
    
    
    
  }

  Check(id)
  {
    ProductService.getProductById(id).then((res) => {
      this.setState({ product: res.data });
      if(this.state.product.cateid==1)
      {
      this.props.history.push("/products/phone/detail-product/"+this.state.product.id);
      window.location.reload();
    }
    if(this.state.product.cateid==2)
    {
    this.props.history.push("/products/laptop/detail-product/"+this.state.product.id);
    window.location.reload();
  }
  if(this.state.product.cateid==3)
      {
      this.props.history.push("/products/watch/detail-product/"+this.state.product.id);
      window.location.reload();
    }
    });
   
  
  }
  submit = (id,idr) =>{
    confirmAlert({
      title: 'B???n c?? ch???c kh??ng?',
      message: 'B???n mu???n x??a s???n ph???m n??y kh??ng.',
      buttons: [
        {
          label: 'X??a lu??n',
          onClick: () => this.deleteProduct(id,idr)
        },
        {
          label: '????ng',
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
                  S???n ph???m
                </h3>{" "}
                <button
                  type="text"
                  className="btn btn-primary"
                  onClick={this.addProduct}
                >
                  <i class="fa fa-plus" aria-hidden="true"></i> Th??m m???i(SP)
                </button>
              </div>

              <div className="">
                <table class="table table-hover">
                  <thead class="thead-light">
                    <tr>
                      <th>M?? SP</th>
                      <th>H??nh ???nh</th>
                      <th>T??n SP</th>
                      <th>????n gi??(VN??)</th>
                      <th>L???a ch???n</th>
                    </tr>
                  </thead>
                  <tfoot class="thead-light">
                    <tr>
                      <th>M?? SP</th>
                      <th>H??nh ???nh</th>
                      <th>T??n SP</th>
                      <th>????n gi??</th>
                      <th>L???a ch???n</th>
                    </tr>
                  </tfoot>
                  <tbody>
                    {this.state.content.map((allproduct) => (
                      <tr key={allproduct.id}>
                        <td >{allproduct.id}</td>
                        
                        <td>
                          {" "}
                          <div className="aside">
                            <img
                              className="img-sm"
                              src={
                                "http://localhost:8080/images/" +
                                allproduct.image
                              }
                              alt="logo"
                            />
                          </div>
                        </td>
                        <td>{allproduct.name}  </td>

                        <td>
                          <NumberFormat
                            value={allproduct.price}
                            displayType={"text"}
                            thousandSeparator={true}
                          />
                        </td>
                        <td>
                        {/* <button
                         
                          onClick={(e) => this.Check(allproduct.id)}
                          className="btn btn-warning"
                        >
                          <i class="fa fa-eye" aria-hidden="true"></i>{" "}
                        </button> */}
                       
                        <button
                         style={{ marginLeft: "10px" }}
                          className="btn btn-success"
                          onClick={() => this.editEmployee(allproduct.id)}
                        >
                         
                        <i class="fas fa-edit"></i>
                        </button>
                        
                      
                        <button
                          style={{ marginLeft: "10px" }}
                          onClick={() => this.submit(allproduct.id,allproduct.cateid)}
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
                          value={this.state.currentPage-1}
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

export default ManagerProduct;
