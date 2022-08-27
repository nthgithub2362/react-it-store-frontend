import React, { Component } from "react";
import { Router, Switch, Route, Link } from "react-router-dom";
import ProductService from "../../services/ProductService";
import Carousel from "react-elastic-carousel";
import NumberFormat from "react-number-format";
import { total, list, quantity, add } from "cart-localstorage";
import CountdownTimer from "./CountdownTimer";
import { Redirect } from "react-router-dom";
class BestSelling extends Component {
  constructor(props) {
    super(props);

    this.state = {
      product: {},
      phones: [],
    };
  }

  componentDidMount() {
    ProductService.getListSale().then((res) => {
      this.setState({ phones: res.data });
    });
  }

  Check(idr) {
    ProductService.getProductById(idr).then((res) => {
      this.setState({ product: res.data });
      if (this.state.product.cateid == 1) {
        this.props.history.push(
          "/products/phone/detail-product/" + this.state.product.id
        );
      }
      if (this.state.product.cateid == 2) {
        this.props.history.push(
          "/products/laptop/detail-product/" + this.state.product.id
        );
      }
      if (this.state.product.cateid == 3) {
        this.props.history.push(
          "/products/watch/detail-product/" + this.state.product.id
        );
      }
      if (this.state.product.cateid == 4) {
        this.props.history.push(
          "/products/accessories/detail-product/" + this.state.product.id
        );
      }
    });
  }

  render() {
    {
      console.log(this.state.phones);
      const breakPoints = [
        { width: 300, itemsToShow: 1 },
        { width: 400, itemsToShow: 2 },
        { width: 768, itemsToShow: 3 },
        { width: 900, itemsToShow: 5 },
        { width: 1200, itemsToShow: 5 },
        { width: 1500, itemsToShow: 8 },
      ];
      return (
        <section className="padding-bottom-sm"  style={{ backgroundColor: "#fff"}}>
      
          <h2 className="title-section text-uppercase" style={{textAlign:'center',color:'#ff6a00'}}>
          <i class="fas fa-angle-double-left"></i> Săn sale mỗi ngày <i class="fas fa-angle-double-right"></i>
          </h2>

        <div
          className="row container-sm"
         
        >
              <Carousel breakPoints={breakPoints}>
                {this.state.phones.map((phone) => (
                  <div
                    className="col-md"
                    key={phone.id}
                    style={{ background: "white" ,borderBottom:'3px solid #ff6a00',borderTop:'3px solid #ff6a00', paddingTop:'20px',marginBottom:'0px'}}
                  >
                    <figure
                      className="card card-sm card-product-grid"
                  
                    >
                      {}
                      <a
                        type="button"
                        onClick={() => this.Check(phone.id)}
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
                        onClick={() => this.Check(phone.id)}
                      
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
                        
                          <a href="">{phone.name}</a>
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
              </Carousel>
            </div>
            </section>
   
      );
    }
  }
}
export default BestSelling;
