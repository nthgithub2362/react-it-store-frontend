import React, { Component } from "react";
import NumberFormat from "react-number-format";
import ProductService from "../../../services/ProductService";
import Carousel from "react-bootstrap/Carousel";
import SliderService from "../../../services/SliderService";
import LogoService from "../../../services/LogoService";
class ProductLaptop extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
          laps: [],
          slider: [],
          logo:[],
        }
    
    
      }
    
      
      componentDidMount() {
        ProductService.getListLaps().then((res) => {
          this.setState({ laps: res.data });
        });
        SliderService.getSiderLaptop().then((res) => {
          this.setState({ slider: res.data });
        });
        LogoService.getLogoLaptop().then((res) => {
          this.setState({ logo: res.data });
        });
      }

    
    render() {
        return (
          <div className="container" >
     
        <div className="row" >
      
          <div className="col-md-8"  >
            <Carousel>
              {this.state.slider.map((slide) => (
                <Carousel.Item interval={2000} key={slide.id}>
                  <img
                    className="d-block "
                    style={{padding:'0 auto',margin:"0 auto"}}
                    src={"http://localhost:3000/images/slider/" + slide.image}
                    alt={"http://localhost:3000/images/slider/" + slide.image}
                  />
                  <Carousel.Caption>
                    {/* <h3>First slide label</h3>
                                <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p> */}
                  </Carousel.Caption>
                </Carousel.Item>
              ))}
            </Carousel>
          </div>

          <div className="col-md-4">
            <div className="col-md-6">
              <img src="http://localhost:3000/images/slider/SN-note20-390-97-390x97.png" />
            </div>
            <div className="col-md-6" style={{ marginTop: "10px" }}>
              <img src="http://localhost:3000/images/slider/Evogen11-390x97-1.png" />
            </div>
          </div>
        </div>
        {/* =============== SECTION 1 =============== */}
        <section
          className="padding-bottom-sm"
          style={{ backgroundColor: "#fff" }}
        >
           
    <div className="container">
    <div className="row">
        {this.state.logo.map((logo) => (
        <div className="col-md-2" style={{marginTop:'20px'}}>
            <a  className="nav-link alogo" href={"http://localhost:3000/product/laptop/"+logo.title}>
              <img
                width="80%"
               
                src={"http://localhost:3000/images/logo-product/" + logo.image}
              />
              </a>
              </div>
              ))}

       </div>
    
    </div>

  
     
            
              <div className="row">

                <div className="col-md-12">
                  <ul className="row no-gutters bordered-cols">
                  {this.state.laps.map((phone) => (
                     <div className="col-md-3">
                      <figure
                      className="card card-sm card-product-grid" 
                  
                    >
                      {}
                      <a
                        type="button"
                        href={'http://localhost:3000/products/laptop/detail-product/'+phone.id}
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
                        href={'http://localhost:3000/products/laptop/detail-product/'+phone.id}
                      
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
                  </ul>
                </div>
              </div>
         
          </section>
          </div>
        );
    }
}

export default ProductLaptop;