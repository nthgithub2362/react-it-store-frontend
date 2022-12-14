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

                <option value="1">D?????i 2 tri???u</option>
                <option value="2">T??? 2-4 tri???u</option>
                <option value="3">T??? 4-7 tri???u</option>
                <option value="4">T??? 7-13 tri???u</option>
                <option value="5">T??? 13-20 tri???u</option>
                <option value="6">Tr??n 20 tri???u</option>
              </select>
            </div>
            {/* <div class="form-group col-md-3">
              <div className="form-group">
                <label> Gi?? th???p nh???t </label>
                <input
                  placeholder="Gi?? th???p nh???t"
                  className="form-control"
                  onChange={this.onPriceSmall}
                />
              </div>
              <div className="form-group">
                <label> Gi?? cao nh???t nh???t </label>
                <input
                  placeholder="Gi?? cao nh???t"
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
              <i className="fa fa-search" /> L???c
            </a>
            </div>
          </div>
        </form>
      </div>
    );
  }
}
