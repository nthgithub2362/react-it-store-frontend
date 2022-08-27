import React, { Component } from "react";
import ProductService from "../../services/ProductService";
import Carousel from "react-elastic-carousel";
import "../style/styleCarousel.css";
import NumberFormat from "react-number-format";
import { total, list, quantity, add, onChange } from "cart-localstorage";

class SessionItemPhone extends Component {
  constructor(props) {
    super(props);

    this.state = {
      phones: [],
    };
  }


  componentDidMount() {
    ProductService.getListPhones().then((res) => {
      this.setState({ phones: res.data });
    });
  }
  

  render() {
    {
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
         
          
          <h2 className="title-section text-uppercase" style={{textAlign:'center'}}>
          <i class="fas fa-mobile-alt"></i> Điện thoại nổi bật nhất
          </h2>
         
          <div
            className="row no-gutters items-wrap"
            
          >
           
            <Carousel breakPoints={breakPoints}>
                {this.state.phones.map((phone) => (
                  <div
                    className="col-md"
                    key={phone.id}
                    style={{borderBottom:'1px dotted #ff6a00',marginBottom:'0px'}}
                  >
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
                        style={{ height: "200px" }}
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
                          {(() => {
                            if (phone.price_net > 0) {
                              return (
                                <del class="price-old">
                              <NumberFormat
                                value={phone.price}
                                displayType={"text"}
                                thousandSeparator={true}
                              />
                              đ
                            </del>
                              );
                            }
                          })()}
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

export default SessionItemPhone;
