import React, { Component } from "react";
import NewService from "../../../services/NewService";
import Carousel from "react-elastic-carousel";
import NumberFormat from "react-number-format";
import ReactHtmlParser, {
  processNodes,
  convertNodeToElement,
  htmlparser2,
} from "react-html-parser";
class NewsList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      newhigh: {},
      news: [],
      products: [],
      newpagenew: [],
      newpromotion: [],

      content: [],
      currentPage: 1,
      size: 4,
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
    this.AllProduct(this.state.currentPage);
    NewService.getNews().then((res) => {
      this.setState({ news: res.data });
    });

    NewService.getListNewHigh().then((res) => {
      this.setState({ listnew: res.data });
    });
    NewService.getNewHigh().then((res) => {
      this.setState({ newhigh: res.data });
    });
    NewService.getListProductOfNew().then((res) => {
      this.setState({ products: res.data });
    });
    NewService.getListNewRight().then((res) => {
      this.setState({ newpagenew: res.data });
    });
    NewService.getListNewPro().then((res) => {
      this.setState({ newpromotion: res.data });
    });
  }

  render() {
    return (
      <div >
        <div style={{height:"180px"}}></div>
      <div className="container" >
        
        <session class="section-content padding-y">
         
          {/* ============================ FILTER TOP END.// ================================= */}
          <div className="row" style={{ backgroundColor: "#fff" }}>
            <div className="col-md-5" style={{ paddingLeft: "20px" }}>
              <a
                href={"/detail-news-" + this.state.newhigh.id}
                className="img-wrap "
              >
                {" "}
                <img
                  width="100%"
                  src={
                    "http://localhost:8080/images/" +
                    this.state.newhigh.image
                  }
                />{" "}
              </a>
              <figcaption className="info-wrap">
                <div>
                  <h3 style={{ fontSize: "20px" }}>
                    <a
                      href={"/detail-news-" + this.state.newhigh.id}
                      className="title"
                    >
                      {this.state.newhigh.name}
                    </a>
                  </h3>
                </div>
              </figcaption>
              {/* <div className="info-wrap">
                    <p style={{fontSize:'20px'}}>{this.state.newhigh.description}</p>
                    </div> */}
            </div>
            <div className="col-md-4">
              {this.state.newpagenew.map((lstnew) => (
                <article className="media mb-2">
                  <img
                    className="img"
                    width="30%"
                    src={"http://localhost:8080/images/" + lstnew.image}
                  />

                  <div
                    className="media-body"
                    style={{ paddingLeft: "10px", paddingRight: "10px" }}
                  >
                    <a
                      style={{ fontSize: "15px" }}
                      href={
                        "http://localhost:3000/detail-news-" + lstnew.id
                      }
                    >
                      {lstnew.name}
                    </a>

                    {/* <p id="p1">{lstnew.description}</p> */}
                  </div>
                </article>
              ))}
            </div>
            <div className="col-md-3">
              <h5 className="title-section text-uppercase">Khuyến mãi</h5>
              {this.state.newpromotion.map((lstnew) => (
                <article className="media mb-2">
                  <div
                    className="media-body"
                    style={{ paddingLeft: "10px", paddingRight: "10px" }}
                  >
                    <a
                      style={{ fontSize: "15px" }}
                      href={
                        "http://localhost:3000/detail-news-" + lstnew.id
                      }
                    >
                      <i class="far fa-arrow-alt-circle-right"></i>{" "}
                      {lstnew.name}
                    </a>

                    {/* <p id="p1">{lstnew.description}</p> */}
                  </div>
                </article>
              ))}
            </div>
          </div>
          <div className="row">
            <main className="col-md-9">
              {this.state.content.map((listnew) => (
                <article className="card card-product-list" key={listnew.id}>
                  <div className="row no-gutters">
                    <aside className="col-md-4">
                      <a
                        href={
                          "http://localhost:3000/detail-news-" + listnew.id
                        }
                        className="img-wrap"
                      >
                        <img
                          src={
                            "http://localhost:8080/images/" + listnew.image
                          }
                          style={{ padding: "1.5rem 1rem" }}
                        />
                      </a>
                    </aside>{" "}
                    {/* col.// */}
                    <div className="col-md-8">
                      <div className="info-main">
                        <a
                          href={
                            "http://localhost:3000/detail-news-" +
                            listnew.id
                          }
                          className="h5 title"
                        >
                          {" "}
                          {listnew.name}
                        </a>
                        <div className="rating-wrap mb-2">
                          <ul className="rating-stars">
                            <li
                              style={{ width: "100%" }}
                              className="stars-active"
                            >
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
                          <div className="label-rating">9/10</div>
                        </div>{" "}
                        {/* rating-wrap.// */}
                        <p className="mb-3">
                        
                          <span className="tag"> 1 giờ </span>
                          <span className="tag"> 80 bình luận </span>
                        
                        </p>
                        <p id="p2"> {ReactHtmlParser(listnew.description)}</p>
                      </div>{" "}
                      {/* info-main.// */}
                    </div>{" "}
                    {/* col.// */}
                  </div>{" "}
                  {/* row.// */}
                </article>
              ))}
              <nav className="mb-4" aria-label="Page navigation sample">
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
              </nav>
            </main>{" "}
            {/* col.// */}
            <div className="col-md-3">
              <h5 className="title-section text-uppercase">
                Sản phẩm đang giảm giá
              </h5>

              {this.state.products.map((product) => (
                <article className="media mb-2">
                  <img
                    className="img"
                    width="30%"
                    src={
                      "http://localhost:8080/images/" + product.image
                    }
                  />

                  <div
                    className="media-body"
                    style={{ paddingLeft: "10px", paddingRight: "10px" }}
                  >
                    {(() => {
                      if (product.cateid == 1) {
                        return (
                          <a
                            href={
                              "http://localhost:3000/products/phone/detail-product/" +
                              product.id
                            }
                          >
                            {product.name}
                          </a>
                        );
                      } else if (product.cateid == 2) {
                        return (
                          <a
                            href={
                              "http://localhost:3000/products/laptop/detail-product/" +
                              product.id
                            }
                          >
                            {product.name}
                          </a>
                        );
                      } else if (product.cateid == 3) {
                        return (
                          <a
                            href={
                              "http://localhost:3000/products/watch/detail-product/" +
                              product.id
                            }
                          >
                            {product.name}
                          </a>
                        );
                      } else if (product.cateid == 4) {
                        return (
                          <a
                            href={
                              "http://localhost:3000/products/accessories/detail-product/" +
                              product.id
                            }
                          >
                            {product.name}
                          </a>
                        );
                      }
                    })()}

                    <br />
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
                    <h6 style={{ color: "red" }}>
                      <NumberFormat
                        value={
                          product.price -
                          (product.price_net / 100) * product.price
                        }
                        displayType={"text"}
                        thousandSeparator={true}
                      />
                      đ
                    </h6>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </session>
      </div>
      </div>
    );
  }
}

export default NewsList;
