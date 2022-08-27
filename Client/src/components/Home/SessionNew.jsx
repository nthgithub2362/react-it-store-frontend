import React, { Component } from "react";
import ProductService from "../../services/ProductService";
import Carousel from "react-elastic-carousel";
import "../style/styleCarousel.css";
import NumberFormat from "react-number-format";
import { total, list, quantity, add, onChange } from "cart-localstorage";
import NewService from "../../services/NewService";
import "./cut-string.css";


class SessionItemPhone extends Component {
  constructor(props) {
    super(props);

    this.state = {
      newhight: {},
      listnew: [],
    };
  }

  componentDidMount() {
    NewService.getListNewHigh().then((res) => {
      this.setState({ listnew: res.data });
    });
    NewService.getNewHigh().then((res) => {
      this.setState({ newhight: res.data });
    });
  }

  render() {
    {
      

      return (
        <section className="padding-bottom-sm"  style={{ backgroundColor: "#fff"}}>
      <div className="container">
      <a style={{float:"right",color:'blue'}} href="/news"><i>Xem nhiều hơn <i class="fas fa-angle-double-right"></i></i></a>
          <h2 className="title-section text-uppercase">
          <i class="far fa-newspaper"></i> Tin Công Nghệ 24h
          </h2>
         
          </div>
          <div className="row">
              <div className='col-md-7'>
              <a
                      href={"/new/detail-new/" + this.state.newhight.id}
                      className="img-wrap "
                    >
                      {" "}
                      <img width="100%"
                        src={
                          "http://localhost:8080/images/" + this.state.newhight.image
                        }
                      />{" "}
                    </a>
                    <figcaption className="info-wrap">
                      
                      <div>
                        <h3 style={{fontSize:'18px'}} ><a
                          href={"news/detail-new/" + this.state.newhight.id}
                          className="title"
                        >
                          {this.state.newhight.name}
                        </a>
                        </h3>
                        
                      </div>
                    </figcaption> 
                    {/* <div className="info-wrap">
                    <p style={{fontSize:'15px'}} id="p2">{this.state.newhight.description}</p>
                    </div> */}
              </div>
              <div className="col-md-5">
                
                
                  {this.state.listnew.map((lstnew) => (
                    <article className="media mb-2">
                      
                        <img
                          className="img"
                           width="30%"
                          src={
                            "http://localhost:8080/images/" + lstnew.image
                          }
                        />
                   
                      <div className="media-body" style={{paddingLeft:'10px',paddingRight:'10px'}}>
                        
                          <a style={{fontSize:'15px'}}
                            href={
                              "http://localhost:3000/news/detail-new/" +
                              lstnew.id
                            }
                          >
                            {lstnew.name}
                          </a>
                         
                      
                        {/* <p id="p1">{lstnew.description}</p> */}
                        
                      </div>
                      
                    </article>
                    
                  ))}
                
              </div>
          </div>
        </section>
      );
    }
  }
}

export default SessionItemPhone;
