import React, { Component } from "react";
import ProductService from "../../services/ProductService";
import NumberFormat from "react-number-format";
import { add, onChange } from "cart-localstorage";
class SearchAll extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
    };
  }
  componentDidMount() {
    const name = this.props.match.params.name;
    ProductService.getSearch(name).then((res) =>
      this.setState({ data: res.data })
    );
  }

  AddCart(id, name, price, image, idcate) {
    if (localStorage.getItem("cart_id") == null) {
      var crypto = require("crypto");
      var id_order = crypto.randomBytes(3).toString("hex");
      localStorage.setItem("cart_id", id_order);
    } else {
      id_order = localStorage.getItem("cart_id");
    }
    if (idcate == 1) {
      add({
        id: id,
        name: name,
        price: price,
        image: image,
        id_order,
        type: "phone",
      });
    }
    if (idcate == 2) {
      add({
        id: id,
        name: name,
        price: price,
        image: image,
        id_order,
        type: "laptop",
      });
    }
    if (idcate == 3) {
      add({
        id: id,
        name: name,
        price: price,
        image: image,
        id_order,
        type: "watch",
      });
    }
    onChange();
    alert("Thêm vào giỏ hàng thành công!");
  }
  render() {
    if (this.state.data != "") {
      return (
        <div className="container">
          <div style={{height:"180px"}}></div>
          {/* =============== SECTION 1 =============== */}
          <section className="padding-bottom">
            <h5 style={{ marginLeft:'right',color:'blue'}}>
              Kết quả tìm kiếm từ khóa: {this.props.match.params.name}
            </h5>

            <div className="card card-home-category">
              <div className="row">
                <div className="col-md-12">
                  <ul className="row no-gutters bordered-cols">
                  {this.state.data.map((phone) => (
                     <div className="col-md-2">
                      <figure
                      className="card card-sm card-product-grid" 
                  
                    >
                      {}
                      <a
                        type="button"
                        href={'http://localhost:3000/products/phone/detail-product/'+phone.id}
                        className="img-wrap"
                      >
                        <img
                          width="100%"
                          style={{ padding: "10px" }}
                          src={"http://localhost:8080/images/" + phone.image}
                        />
                      </a>
                      <a
                        type="button"
                        href={'http://localhost:3000/products/phone/detail-product/'+phone.id}
                      
                      >
                      <div
                        className="text-wrap p-2"
                        style={{ height: "240px" }}
                      >
                        {(() => {
                          if (phone.event!='Không') {
                            return (
                              <div> 
                               
                                <span class="badge badge-danger" style={{fontSize:'10px',textTransform:'uppercase'}}>
                                <img
                          
                          width="12px" height="12px"
                          src={"http://localhost:3000/images/icon1-50x50.png"}
                        />{" "}
                                  {phone.event}{" "}
                                </span>

                              
                              </div>
                            );
                          }
                        })()}
                      
                        {(() => {
                          if (phone.price_net > 0) {
                            return (
                              <div>
                                <span class="badge badge-danger">
                                  {" "}
                                  -{phone.price_net}%{" "}
                                </span>

                                <span
                                  style={{ float: "right" }}
                                  class="badge badge-success"
                                >
                                  {" "}
                                  Trả góp 0%{" "}
                                </span>
                              </div>
                            );
                          }
                        })()}
                        
                          <a href={'http://localhost:3000/products/phone/detail-product/'+phone.id}>{phone.name}</a>
                       <br/>
                        {(()=>{
                          if(phone.promotion!='Không')
                          {
                            return (
                              <span style={{fontSize:'13px' }} class="price">
                         {phone.promotion}
                           
                        </span>
                            );
                          }
                        })()}
                        
                        <div class="price-wrap my-2">
                          <span style={{ color: "red" }} class="price">
                            <NumberFormat
                              value={
                                phone.price -
                                (phone.price_net / 100) * phone.price
                              }
                              displayType={"text"}
                              thousandSeparator={true}
                            />
                            đ
                          </span>
                          <del class="price-old">
                            <NumberFormat
                              value={phone.price}
                              displayType={"text"}
                              thousandSeparator={true}
                            />
                            đ
                          </del>
                        </div>
                        <ul className="rating-stars">
                          <li style={{ width: "80%" }} className="stars-active">
                            <i className="fa fa-star" />{" "}
                            <i className="fa fa-star" />
                            <i className="fa fa-star" />{" "}
                            <i className="fa fa-star" />
                            <i className="fa fa-star" />
                          </li>
                          <li>
                            <i className="fa fa-star" />{" "}
                            <i className="fa fa-star" />
                            <i className="fa fa-star" />{" "}
                            <i className="fa fa-star" />
                            <i className="fa fa-star" />
                          </li>
                        </ul>
                        <br/>
                        {(()=>{
                          if(phone.gift!=0)
                          {
                            return (
                              
                              <span style={{fontSize:'13px' }} class="price">
                          Quà{" "}
                          <NumberFormat
                            value={phone.gift}
                            displayType={"text"}
                            thousandSeparator={true}
                          />
                          đ
                        </span>
                            );
                          }
                        })()}
                       
                        {(() => {
                          if (phone.available == 0) {
                            return (<div>
                            <span style={{ color: "grey" }}>Hết hàng</span>
                            </div>);
                          }
                        })()}
                        {(() => {
                          if (phone.available < 10 && phone.available > 0) {
                            return (
                              <div>
                              <span style={{ color: "grey" }}>Sắp hết hàng</span>
                              </div>
                            );
                          }
                        })()}
                       
                      </div>
                      </a>
                    </figure>
                   </div> 
                   
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* <nav className="mb-4" aria-label="Page navigation sample">
          <ul className="pagination">
            <li className={"page-item " + this.state.disabled1}>
              <button
                className="page-link"
                href="#"
                onClick={this.previousPage}
              >
                Trang Trước
              </button>
            </li>
            <li className="page-item active">
              <a
                className="page-link"
                href="#"
                value={this.state.currentPage}
                onChange={this.changcurrentPage}
              >
                {this.state.currentPage}
              </a>
            </li>
            <li className={"page-item " + this.state.disabled2}>
              {" "}
              <button className="page-link" onClick={this.nextPage}>
                Trang Sau
              </button>
            </li>
          </ul>
        </nav> */}
        </div>
      );
    } else if(this.state.data == ""){
      return (
        <div>
          <h4 style={{ textAlign: "center" }}>
            Kết quả tìm kiếm từ khóa: [{this.props.match.params.name}]
          </h4>
          <h1 style={{ textAlign: "center" }}>Không tìm thấy sản phẩm nào </h1>
          <h1 style={{ textAlign: "center", fontSize: "200px" }}>
            <i class="fas fa-not-equal"></i>
          </h1>
        </div>
      );
    }
  }
}

export default SearchAll;
