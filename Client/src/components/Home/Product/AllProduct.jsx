import React, { Component } from 'react';
import ProductService from '../../../services/ProductService';
import Carousel from 'react-elastic-carousel';
import NumberFormat from 'react-number-format';
import { total,list, quantity, add } from 'cart-localstorage'
class AllProduct extends Component {
    constructor(props) {
        super(props);
        this.state = {
          content: [],
          currentPage: 1,
          size: 8,
          disabled1: "",
          disabled2: "",
        };
        this.nextPage = this.nextPage.bind(this);
        this.previousPage = this.previousPage.bind(this);
        this.AllProduct = this.AllProduct.bind(this);
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
        if (this.state.currentPage > 1) this.state.currentPage -= 1;
        this.AllProduct(this.state.currentPage);
        this.changcurrentPage(this.state.currentPage);
      }
      nextPage() {
        let condition = Math.ceil(this.state.totalElements / this.state.size);
        if (this.state.currentPage < condition) this.state.currentPage += 1;
        this.AllProduct(this.state.currentPage);
        this.changcurrentPage(this.state.currentPage);
      }
      AllProduct(currentPage) {
        currentPage -= 1;
        ProductService.getListAll(currentPage, this.state.size)
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
        this.AllProduct(this.state.currentPage);
      }
      AddCart(id, title, price, image, e) {
        if ((localStorage.getItem("cart_id")) == null) {
          var crypto = require("crypto");
          var id_order = crypto.randomBytes(3).toString("hex");
          localStorage.setItem("cart_id", id_order);
        } else {
           id_order =(localStorage.getItem("cart_id"));
        }
        add({
          id: id,
          title: title,
          price: price,
          image: image,
          id_order,
        });
      }
      render() {
        return (
          <div className="container">
            {/* =============== SECTION 1 =============== */}
            <section className="padding-bottom">
              <header className="section-heading heading-line">
                <h4 className="title-section text-uppercase">Tất cả sản phẩm</h4>
              </header>
              <div className="card card-home-category">
                <div className="row">

                  <div className="col-md-12">
                    <ul className="row no-gutters bordered-cols">
                    {this.state.content.map((product) => (
                       <div className="col-md-3">
                       <figure className="card card-product-grid">
                         <div className="img-wrap"> 
                         {(() => {
                              if (product.cateid == 1) {
                                return (
                                  <a
                                  href={"http://localhost:3000/products/phone/detail-product/" + product.id}
                                    className="img-wrap "
                                  >
                                    {" "}
                                    <img
                                      src={
                                        "http://localhost:3000/images/product/" +
                                        product.image
                                      }
                                    />{" "}
                                  </a>
                                );
                              }else if(product.cateid == 2)
                              {
                                return (
                                <a
                                href={"http://localhost:3000/products/laptop/detail-product/" + product.id}
                                className="img-wrap "
                              >
                                {" "}
                                <img
                                  src={
                                    "http://localhost:3000/images/product/" +
                                    product.image
                                  }
                                />{" "}
                              </a>
                                );
                              }else if(product.cateid == 3)
                              {
                                return (
                                <a
                                href={"http://localhost:3000/products/watch/detail-product/" + product.id}
                                className="img-wrap "
                              >
                                {" "}
                                <img
                                  src={
                                    "http://localhost:3000/images/product/" +
                                    product.image
                                  }
                                />{" "}
                              </a>  
                                );
                              }else if(product.cateid == 4)
                              {
                                return (
                                <a
                                href={"http://localhost:3000/products/accessories/detail-product/" + product.id}
                                className="img-wrap "
                              >
                                {" "}
                                <img
                                  src={
                                    "http://localhost:3000/images/product/" +
                                    product.image
                                  }
                                />{" "}
                              </a>  
                                );
                              }
                            })()}
                          </div>{" "}
                          {/* img-wrap.// */}
                          <figcaption className="info-wrap">
                            {(() => {
                              if (product.price_net > 0) {
                                return (
                                  <span class="badge badge-danger">
                                    {" "}
                                    -{product.price_net}%{" "}
                                  </span>
                                );
                              } else if (product.price_net == 0) {
                                return <br />;
                              }
                            })()}
                            <div
                              className="price mt-1"
                              style={{ color: "red" }}
                            >
                              <NumberFormat
                                value={
                                  product.price - (product.price_net / 100) * product.price
                                }
                                displayType={"text"}
                                thousandSeparator={true}
                              />
                              đ
                              {(() => {
                                if (product.price_net > 0) {
                                  return (
                                    <del className="price-old">
                                      <NumberFormat
                                        value={product.price}
                                        displayType={"text"}
                                        thousandSeparator={true}
                                      />
                                      đ
                                    </del>
                                  );
                                }
                              })()}
                          
                         </div> {/* img-wrap.// */}
                   
                    
                                       
                                            
                                            <div style={{ height: '30px' }}><a href={"products/phone/detail-product/" + product.id} className="title" >{product.name}</a>
                                            </div>

                                        </figcaption>
                                        <div style={{ padding: '0px 5px 5px 5px' }}><a href="" className="btn btn-block btn-primary " onClick={(e) => this.AddCart(product.id, product.name, product.price - (product.price_net / 100) * product.price,product.image)}>Thêm vào giỏ hàng</a></div>
                               
                       </figure>
                     </div> 
                     
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </section>
            
            <nav className="mb-4" aria-label="Page navigation sample">
  <ul className="pagination">
  <li className={"page-item " + this.state.disabled1}>
                <button className="page-link" href="#" onClick={this.previousPage}>
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
</nav>
          </div>

        );
    }
}

export default AllProduct;
