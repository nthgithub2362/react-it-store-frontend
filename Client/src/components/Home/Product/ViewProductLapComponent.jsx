import React, { Component } from "react";
import Carousel from "react-elastic-carousel";
import CategoriesService from "../../../services/CategoriesService";
import ProductService from "../../../services/ProductService";
import NewService from "../../../services/NewService";
import NumberFormat from "react-number-format";

import { add, onChange } from "cart-localstorage";
import 'react-inner-image-zoom/lib/InnerImageZoom/styles.css';
import InnerImageZoom from 'react-inner-image-zoom';
import ReactHtmlParser, {
  processNodes,
  convertNodeToElement,
  htmlparser2,
} from "react-html-parser";
class ViewProductLapComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.match.params.id,
      product: {},
      catepr: {},
      productRe: [],
      image:"",
      review: {},
      news: [],
      productimage: [],
      numb: 1,
      accessories: [],
    };
    this.handleValueChange = this.handleValueChange.bind(this);
    this.changeimage = this.changeimage.bind(this);
  }
  componentDidMount() {
    ProductService.getProductById(this.state.id).then((res) => {
      let product = res.data;
      this.setState({
        product: res.data,
        // productRe: product.productrelate,
        image:product.productimage[0].image,
        productimage:product.productimage,
        
      });
    });
    ProductService.getlistRelated(this.state.id).then((res) => {
      this.setState({ productRe: res.data });
      console.log(this.state.productRe);
    });
   
    ProductService.getReview(this.state.id).then((res) => {
      this.setState({ review: res.data });
    });
    CategoriesService.getCategories(this.state.id).then((res) => {
      this.setState({ catepr: res.data });
    });
    NewService.getListNewLaps().then((res) => {
      this.setState({ news: res.data });
    });
    ProductService.getlistLapBuyWithACE(this.state.id).then((res) => {
      this.setState({ accessories: res.data });
    });
  }
  changeimage(change) {
    this.setState({ image: change });
  }
  handleValueChange(e) {
    const value = e.target.value;
    this.setState({ numb: value });
  }
  AddCart(id, name, price, image) {
    const x = Number(this.state.numb);
    if (localStorage.getItem("cart_id") == null) {
      var crypto = require("crypto");
      var id_order = crypto.randomBytes(3).toString("hex");
      localStorage.setItem("cart_id", id_order);
    } else {
      id_order = localStorage.getItem("cart_id");
    }
    add(
      {
        id: id,
        name: name,
        price: price,
        image: image,
        id_order,
        type: "phone",
      },
      x
    );
    onChange();
    alert("Thêm vào giỏ hàng thành công!");
  }
  render() {
    


    console.log(this.state.phones);
    const breakPoints = [
      { width: 300, itemsToShow: 1 },
      { width: 400, itemsToShow: 2 },
      { width: 768, itemsToShow: 3 },
      { width: 900, itemsToShow: 5 },
      { width: 1200, itemsToShow: 5 },
      // { width: 1500, itemsToShow: 8 },
    ];

    return (
      <div>
        <div style={{height:"145px"}}></div>
        {/* ========================= SECTION CONTENT ========================= */}
        <section className="section-content bg-white padding-y">
          <div className="container">
            {/* ============================ ITEM DETAIL ======================== */}
            <div className="row">
              <aside className="col-md-6">

                         <InnerImageZoom width="100%" src={"http://localhost:8080/images/"+this.state.image} />
                       
                         {this.state.productimage.map((listimg) => (
                          <img
                            className="item-thumb" width="20%"
                            onClick={() => this.changeimage(listimg.image)}
                            src={`http://localhost:8080/images/${listimg.image}`}
                            alt="logo"
                          />
                        ))}
                       
                    
              </aside>
             
            
              <main className="col-md-6">
                <article className="product-info-aside">
              
                  <h2 className="title mt-3">{this.state.product.name} </h2>
                  <div className="rating-wrap my-3">
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
                    <small className="label-rating text-muted">
                      132 đánh giá
                    </small>
                    <small className="label-rating text-success">
                      {" "}
                      <i className="fa fa-clipboard-check" /> 154 đơn hàng{" "}
                    </small>
                  </div>{" "}
                  <div className="col-md-12">
                    <img
                      width="80%"
                      src="http://localhost:3000/images/gif/920x320-920x230-3.gif"
                    />
                  </div>
                  {/* rating-wrap.// */}
                  <div className="mb-3">
                    {(() => {
                      if (this.state.product.price_net > 0) {
                        return (
                          <div>
                            <var className="price h3">
                              <del>
                                <NumberFormat
                                  value={this.state.product.price}
                                  displayType={"text"}
                                  thousandSeparator={true}
                                />
                                đ
                              </del>
                            </var>
                            <span> -{this.state.product.price_net}% </span>
                          </div>
                        );
                      }
                    })()}

                    <var className="price h1" style={{ color: "red" }}>
                      <NumberFormat
                        value={
                          this.state.product.price -
                          (this.state.product.price_net / 100) *
                            this.state.product.price
                        }
                        displayType={"text"}
                        thousandSeparator={true}
                      />
                      đ
                    </var>
                  </div>{" "}
                  {(() => {
                    if (this.state.product.price > 10000000) {
                      return (
                        <a className="list-group-item" href="">
                          Mua online giảm ngay 300,000đ chỉ còn{" "}
                          <h2>
                            <NumberFormat
                              value={
                                this.state.product.price -
                                (this.state.product.price_net / 100) *
                                  this.state.product.price -
                                300000
                              }
                              displayType={"text"}
                              thousandSeparator={true}
                            />
                            đ
                          </h2>
                        </a>
                      );
                    }
                  })()}
                  {/* price-detail-wrap .// */}
                  <dl className="row">
                    <div className="col-sm-12">
                      <nav className="list-group">
                      <a className="list-group-item" href="">
                          {" "}
                          Thương hiệu: {this.state.product.brand}
                        </a>
                        <a className="list-group-item" href="">
                          Đã bán: {this.state.product.sold}
                        </a>
                        <a className="list-group-item" href="">
                          {" "}
                          Số lượng còn lại: {this.state.product.available}
                        </a>
                        <a className="list-group-item" href="">
                          {" "}
                          Bảo hành: 24 tháng
                        </a>
                        
                          {(() => {
                    if (this.state.gift > 0) {
                      return (

                        <a className="list-group-item" href="">
                          {" "}
                          Quà tặng trị giá{" "}
                          <NumberFormat
                            value={this.state.product.gift}
                            displayType={"text"}
                            thousandSeparator={true}
                          />
                          
                          đ
                          
                        </a>
                        );
                      }
                    })()}
                      </nav>
                    </div>
                  </dl>
                  {/* <div className="form-group col-md-6">
                    <input
                      type="number"
                      min={1}
                      value={this.state.numb}
                      className="form-control"
                      style={{
                        width: "100px",
                        marginTop: "5px",
                        marginLeft: "8px",
                        fontSize: "15px",
                      }}
                      onChange={this.handleValueChange}
                    />
                  </div>{" "} */}
                  {/* col.// */}
                  <br />
                  <div className="form-group col-md-4">
                    <button
                      className="btn btn-block btn-primary "
                      onClick={(e) =>
                        this.AddCart(
                          this.state.product.id,
                          this.state.product.name,
                          this.state.product.price -
                            (this.state.product.price_net / 100) *
                              this.state.product.price,
                          this.state.product.image
                        )
                      }
                    >
                      Mua ngay
                    </button>
                  </div>{" "}
                  {/* row.// */}
                </article>{" "}
                {/* product-info-aside .// */}
              </main>{" "}
              {/* col.// */}
            </div>{" "}
            {/* row.// */}
            {/* ================ ITEM DETAIL END .// ================= */}
          </div>{" "}
          {/* container .//  */}
        </section>
        {/* ========================= SECTION CONTENT END// ========================= */}
        {/* ========================= SECTION  ========================= */}
        <section
          className="section-name padding-y bg"
          style={{ background: "white" }}
        >
          <div className="container">
            <div className="row">
            <div className="col-md-8">
           
           <h2 class="card-title" style={{ color: "#ff6a00" }}>
             Đánh giá về sản phẩm
           </h2>
           <h4>{this.state.review.title_review}</h4>
           <aside className="col-md-3">
             <div className="">
               <img
                 src={
                   "http://localhost:8080/images/" +
                   this.state.review.image_review
                 }
               />
             </div>
           </aside>{" "} 
          
         <p style={{ fontSize: "18px" }}>
         {ReactHtmlParser(this.state.review.description_review)}
           </p>
       
         
   
   </div>
              <div className="col-md-4">
                <h5 className="title-description">Thông số kỹ thuật</h5>

                <table className="table table-striped">
                  {ReactHtmlParser(this.state.product.paramater)}
                </table>

                <h5 className="title-description">Tin tức về laptop</h5>
                {this.state.news.map((lstnew) => (
                  <article className="media mb-3">
                    <a
                      href={
                        "http://localhost:3000/detail-news-" + lstnew.id
                      }
                    >
                      <img
                        className="img-sm mr-3"
                        src={"http://localhost:3000/images/new/" + lstnew.image}
                      />
                    </a>
                    <div className="media-body">
                      <a
                        style={{ fontSize: "18px" }}
                        href={
                          "http://localhost:3000/detail-news-" + lstnew.id
                        }
                      >
                        {lstnew.name}
                      </a>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>
        {/* ========================= SECTION CONTENT END// ========================= */}
        <section
          className="padding-bottom-sm"
          style={{ backgroundColor: "#fff" }}
        >
          <h2 className="title-section text-uppercase">
            Phụ kiện thường mua cùng
          </h2>

          <div className="col-md-12">
            <Carousel breakPoints={breakPoints}>
              {this.state.accessories.map((phone) => (
                <div className="col-md" key={phone.id}>
                  <figure className="card card-sm card-product-grid">
                    {}
                    <a
                      type="button"
                      href={
                        "http://localhost:3000/products/accessories/detail-product/" +
                        phone.id
                      }
                      className="img-wrap"
                    >
                      <img
                        width="100%"
                        style={{ padding: "10px" }}
                        src={
                          "http://localhost:3000/images/product/" + phone.image
                        }
                      />
                    </a>
                    <a
                      type="button"
                      href={
                        "http://localhost:3000/products/accessories/detail-product/" +
                        phone.id
                      }
                    >
                      <div
                        className="text-wrap p-2"
                        style={{ height: "240px" }}
                      >
                        {(() => {
                          if (phone.event != "Không") {
                            return (
                              <div>
                                <span
                                  class="badge badge-danger"
                                  style={{
                                    fontSize: "10px",
                                    textTransform: "uppercase",
                                  }}
                                >
                                  <img
                                    width="12px"
                                    height="12px"
                                    src={
                                      "http://localhost:3000/images/icon1-50x50.png"
                                    }
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

                        <a href="">{phone.name}</a>
                        <br />
                        {(() => {
                          if (phone.promotion != "Không") {
                            return (
                              <span style={{ fontSize: "13px" }} class="price">
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
                        <br />
                        {(() => {
                          if (phone.gift != 0) {
                            return (
                              <span style={{ fontSize: "13px" }} class="price">
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
                            return (
                              <div>
                                <span style={{ color: "grey" }}>Hết hàng</span>
                              </div>
                            );
                          }
                        })()}
                        {(() => {
                          if (phone.available < 10 && phone.available > 0) {
                            return (
                              <div>
                                <span style={{ color: "grey" }}>
                                  Sắp hết hàng
                                </span>
                              </div>
                            );
                          }
                        })()}
                      </div>
                    </a>
                  </figure>
                </div>
              ))}
            </Carousel>
          </div>
        </section>
        <section
          className="padding-bottom-sm"
          style={{ backgroundColor: "#fff" }}
        >
          <h2 className="title-section text-uppercase">Sản phẩm liên quan</h2>

          <div className="col-md-12">
            <Carousel breakPoints={breakPoints}>
              {this.state.productRe.map((phone) => (
                <div className="col-md" key={phone.id}>
                  <figure className="card card-sm card-product-grid">
                    {}
                    <a
                      type="button"
                      href={
                        "http://localhost:3000/products/phone/detail-product/" +
                        phone.id
                      }
                      className="img-wrap"
                    >
                      <img
                        width="100%"
                        style={{ padding: "10px" }}
                        src={
                          "http://localhost:3000/images/product/" + phone.image
                        }
                      />
                    </a>
                    <a
                      type="button"
                      href={
                        "http://localhost:3000/products/phone/detail-product/" +
                        phone.id
                      }
                    >
                      <div
                        className="text-wrap p-2"
                        style={{ height: "200px" }}
                      >
                        {(() => {
                          if (phone.event != "Không") {
                            return (
                              <div>
                                <span
                                  class="badge badge-danger"
                                  style={{
                                    fontSize: "10px",
                                    textTransform: "uppercase",
                                  }}
                                >
                                  <img
                                    width="12px"
                                    height="12px"
                                    src={
                                      "http://localhost:3000/images/icon1-50x50.png"
                                    }
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

                        <a href="">{phone.name}</a>
                        <br />
                        {(() => {
                          if (phone.promotion != "Không") {
                            return (
                              <span style={{ fontSize: "13px" }} class="price">
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
                        <br />
                        {(() => {
                          if (phone.gift != 0) {
                            return (
                              <span style={{ fontSize: "13px" }} class="price">
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
                            return (
                              <div>
                                <span style={{ color: "grey" }}>Hết hàng</span>
                              </div>
                            );
                          }
                        })()}
                        {(() => {
                          if (phone.available < 10 && phone.available > 0) {
                            return (
                              <div>
                                <span style={{ color: "grey" }}>
                                  Sắp hết hàng
                                </span>
                              </div>
                            );
                          }
                        })()}
                      </div>
                    </a>
                  </figure>
                </div>
              ))}
            </Carousel>
          </div>
        </section>
        <div id="comment" className="border">
          <h5 style={{ fontWeight: "bold", marginLeft: "34px" }}>BÌNH LUẬN</h5>
          <div
            class="fb-comments"
            style={{ marginLeft: "30px" }}
            data-href="http://localhost:3000"
            data-width="1300"
            data-numposts="1"
          ></div>
        </div>
      </div>
    );
  }
}

export default ViewProductLapComponent;
