import React, { Component } from "react";
import NumberFormat from "react-number-format";
import { total, list, quantity, add, onChange } from "cart-localstorage";
import { Redirect } from "react-router-dom";
import LogoService from "../../../services/LogoService";
export default class Filter extends Component {
  constructor(props) {
    super(props);

    this.state = {
      phones: [],
      price_small: 0,
      price_large: 0,
      brand: "none",
      redirect: false,
    };
    this.onPriceSmall = this.onPriceSmall.bind(this);
    this.onPriceLarge = this.onPriceLarge.bind(this);
    this.onBrand = this.onBrand.bind(this);
    this.onPriceAuto = this.onPriceAuto.bind(this);

    this.handleSubmit = this.handleSubmit.bind(this);
  }
  componentDidMount() {
    LogoService.getLogoPhone().then((res) => {
      this.setState({
        phones: res.data,
      });
    });

    // ProductService.getlistRelated(this.state.id).then((res) => {
    //   this.setState({ productRe: res.data });
    // });
    // ProductService.getReviewById(this.state.id).then((res) => {
    //   this.setState({ review: res.data });
    // });
    // CategoriesService.getCategories(this.state.id).then((res) => {
    //   this.setState({ catepr: res.data });
    // });
    // NewService.getListNewPhones(this.state.id).then((res) => {
    //   this.setState({ news: res.data });
    // });
    // ProductService.getlistBuyWithACE(this.state.id).then((res) => {
    //   this.setState({ accessories: res.data });
    // });
  }
  onPriceSmall(e) {
    const value = e.target.value;
    var lowerCaseName = value.toLowerCase();
    this.setState({
      price_small: lowerCaseName,
    });
  }
  onPriceLarge(e) {
    const value = e.target.value;
    var lowerCaseName = value.toLowerCase();
    this.setState({
      price_large: lowerCaseName,
    });
  }
  onBrand(e) {
    const value = e.target.value;
    var lowerCaseName = value.toLowerCase();
    this.setState({
        brand: lowerCaseName,
    });
  }
  onPriceAuto(e) {
    const value = e.target.value;
    if(value==0)
   {
    this.setState({
        price_small:0,
        price_large:0,
      });
   }
   if(value==1)
   {
    this.setState({
        price_small:0,
        price_large:2000000,
      });
   }
   if(value==2)
   {
    this.setState({
        price_small:2000000,
        price_large:4000000,
      });
   }
    if(value==3)
   {
    this.setState({
        price_small:4000000,
        price_large:7000000,
      });
   }
   if(value==4)
   {
    this.setState({
        price_small:7000000,
        price_large:13000000,
      });
   }
   if(value==5)
   {
    this.setState({
        price_small:13000000,
        price_large:20000000,
      });
   }
   if(value==6)
   {
    this.setState({
        price_small:20000000,
        price_large:100000000,
      });
   }
   
  }
  handleSubmit() {

    this.setState({ redirect: true });
    
  }
  render() {
    const { redirect, price_small, price_large,brand } = this.state;
    if (redirect) {
      return <Redirect to={`/phone/ps=${price_small}/pl=${price_large}/br=${brand}`} />;
    }
    return (
      <div className="container" style={{ marginTop: "20px" }}>
        <form onSubmit={this.handleSubmit}>
          <div className="form-row">
            <div class="form-group col-md-3">
              <select class="form-control" onChange={this.onBrand}>
                <option value={localStorage.getItem('brand')} selected>
                  {localStorage.getItem('brand')}
                </option>
                {this.state.phones.map((phone) => (
                  <option value={phone.title}>{phone.title}</option>
                ))}
              </select>
            </div>
            <div class="form-group col-md-3">
              <select class="form-control" onChange={this.onPriceAuto}>
              <option value={localStorage.getItem('price_large')} selected>
                  {localStorage.getItem('price_large')}
                </option>

                <option value="1">Dưới 2 triệu</option>
                <option value="2">Từ 2-4 triệu</option>
                <option value="3">Từ 4-7 triệu</option>
                <option value="4">Từ 7-13 triệu</option>
                <option value="5">Từ 13-20 triệu</option>
                <option value="6">Trên 20 triệu</option>
              </select>
            </div>
            {/* <div class="form-group col-md-3">
              <div className="form-group">
                <label> Giá thấp nhất </label>
                <input
                  placeholder="Giá thấp nhất"
                  className="form-control"
                  onChange={this.onPriceSmall}
                />
              </div>
              <div className="form-group">
                <label> Giá cao nhất nhất </label>
                <input
                  placeholder="Giá cao nhất"
                  className="form-control"
                  onChange={this.onPriceLarge}
                />
              </div>
            </div> */}
            <div class="form-group col-md-3">
            <a
              href={`/phone/ps=${price_small}/pl=${price_large}/br=${brand}`}
              className="btn btn-primary"
              type="submit "
              value="Submit"
            >
              <i className="fa fa-search" /> Lọc
            </a>
            </div>
          </div>
        </form>
      </div>
    );
  }
}
