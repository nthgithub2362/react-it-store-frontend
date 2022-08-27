import React, { Component } from "react";
import userService from "../../../services/user.service";
import HeaderAdmin from "../HeaderAdmin";

class updateUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // step 2
      id: this.props.match.params.id,
      username: "",
      email: "",
      password: "",
      address: "",
      phone: "",
    };
    this.changeUserNameHandler = this.changeUserNameHandler.bind(this);
    this.changeEmailHandler = this.changeEmailHandler.bind(this);
    this.changeAddressHandler = this.changeAddressHandler.bind(this);
    this.changePhoneHandler = this.changePhoneHandler.bind(this);
    this.changePassHandler = this.changePassHandler.bind(this);
    this.saveOrupDateProduct = this.saveOrupDateProduct.bind(this);
  }
  // step 3
  componentDidMount() {
    // step 4
 
      userService.getUserById(this.state.id).then((res) => {
        let user = res.data;
        this.setState({
          username: user.username,
          email: user.email,
          password:user.password,
          address: user.address,
          phone: user.phone,
        });
      });
    
  }
  saveOrupDateProduct = (e) => {
    e.preventDefault();
    let user = {
      username: this.state.username,
      email: this.state.email,
      password:this.state.password,
      address: this.state.address,
      phone: this.state.phone,
    };
    console.log("user => " + JSON.stringify(user));

    userService.updateUserAdmin(user, this.state.id).then((res) => {
        alert("Cập nhật thành công!")
    });
  };
  changeUserNameHandler = (event) => {
    this.setState({ username: event.target.value });
  };
  changeEmailHandler = (event) => {
    this.setState({ email: event.target.value });
  };
  changeAddressHandler = (event) => {
    this.setState({ address: event.target.value });
  };
  changePassHandler = (event) => {
    this.setState({ password: event.target.value });
  };
  changePhoneHandler = (event) => {
    this.setState({ phone: event.target.value });
  };

  cancel() {
    this.props.history.push(
      "/manager-user/page=" + localStorage.getItem("pagePresent")
    );
    localStorage.removeItem("pagePresent");
  }
  render() {
    return (
      <div>
          <HeaderAdmin></HeaderAdmin>
        <div className="container">
          <div className="row">
            <div className="card col-md-6 offset-md-3 offset-md-3">
            <h3 className="text-center">CẬP NHẬT THÔNG TIN TÀI KHOẢN</h3>
              <div className="card-body">
                <form>
                  <div className="form-group">
                    <label>Tên đăng nhập </label>
                    <input
                      placeholder="Username"
                      name="username"
                      className="form-control"
                      value={this.state.username}
                      onChange={this.changeUserNameHandler}
                    />
                  </div>
                  <div className="form-group">
                    <label>Mật khẩu </label>
                    <input
                      placeholder="Username"
                      name="username"
                      type="password"
                      className="form-control"
                      value={this.state.password}
                      onChange={this.changePassHandler}
                    />
                  </div>
                  <div className="form-group">
                    <label> Email </label>
                    <input
                      placeholder="Email"
                      name="email"
                      className="form-control"
                      value={this.state.email}
                      onChange={this.changeEmailHandler}
                    />
                  </div>
              
                  <div className="form-group">
                    <label> Địa chỉ </label>
                    <input
                      placeholder="Address"
                      name="address"
                      className="form-control"
                      value={this.state.address}
                      onChange={this.changeAddressHandler}
                    />
                  </div>
                  <div className="form-group">
                    <label> Số điện thoại </label>
                    <input
                      placeholder="Phone"
                      name="phone"
                      className="form-control"
                      value={this.state.phone}
                      onChange={this.changePhoneHandler}
                    />
                  </div>
                  <button
                    className="btn btn-success"
                    onClick={this.saveOrupDateProduct}
                  >
                    Lưu
                  </button>
                  <button
                    className="btn btn-danger"
                    onClick={this.cancel.bind(this)}
                    style={{ marginLeft: "10px" }}
                  >
                    Hủy
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default updateUser;
