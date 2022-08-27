import React, { Component } from "react";
import OrderService from "../../services/OrderService";
import axios from 'axios';
const userid=JSON.parse(localStorage.getItem("user"));

class Order extends Component {
  constructor(props) {
    super(props);
    var today = new Date(),
    date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    this.state = {
      id: this.props.match.params.id,
      fullname: userid.username,
      phone: userid.phone,
      address: userid.address,
      id_order: (localStorage.getItem("cart_id")),
      user_id:userid.id,
      status:true,
      date:date,
    };
    this.changeFullNameHandler = this.changeFullNameHandler.bind(this);
    this.changePhoneHandler = this.changePhoneHandler.bind(this);
    this.changeAddressHandler = this.changeAddressHandler.bind(this);
    this.saveOrupDateInfo = this.saveOrupDateInfo.bind(this);
  }
  saveOrupDateInfo = (e) => {
    e.preventDefault();
    let info = {
      fullname: this.state.fullname,
      phone: this.state.phone,
      address: this.state.address,
      id_order:this.state.id_order,
      user_id:this.state.user_id,
      status:this.state.status,
      date:this.state.date
    };
    console.log("info => " + JSON.stringify(info));
    OrderService.CreateInfo(info).then((res) => {
      alert("Thành công");
    });
    // let data=localStorage.getItem("__cart");
    // axios.post("http://localhost:8080/order", JSON.parse(data)).then(res => console.log("Đặt hàng thành công!"))
    // .catch(e => console.log("Đặt hàng thất bại!"));

      localStorage.removeItem("__cart")
      localStorage.removeItem("cart_id")
  };

  changeFullNameHandler = (event) => {
    this.setState({ fullname: event.target.value });
  };

  changePhoneHandler = (event) => {
    this.setState({ phone: event.target.value });
  };

  changeAddressHandler = (event) => {
    this.setState({ address: event.target.value });
  };

  render() {
    return (
      <div>
     
        <div>
        <div style={{height:"145px"}}></div>
          <div className="container">
            <div className="row">
              <div className="card col-md-6 offset-md-3 offset-md-3">
                <div className="card-body">
                  <form>
                    <div className="form-group">
                      <label htmlFor="username"> Tên người đặt</label>
                      <input
                        className="form-control"
                        placeholder="fullname"
                        type="text"
                        id="fullname"
                        name="fullname"
                        value={this.state.fullname}
                        onChange={this.changeFullNameHandler}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="phone"> Số điện thoại:</label>
                      <input
                        className="form-control"
                        placeholder="phone"
                        type="text"
                        id="phone"
                        name="phone"
                        value={this.state.phone}
                        onChange={this.changePhoneHandler}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="username"> Địa chỉ nhận hàng</label>
                      <input
                        className="form-control"
                        placeholder="address"
                        type="text"
                        id="address"
                        name="address"
                        value={this.state.address}
                        onChange={this.changeAddressHandler}
                        required
                      />
                    </div>
            
               
                    <button  className="btn btn-success"
                      onClick={this.saveOrupDateInfo}
                    >
                      Đặt hàng</button>
                  </form>

                </div>
              </div>
            </div>
          </div>
        </div>


      </div>
    );
  }
}

export default Order;
