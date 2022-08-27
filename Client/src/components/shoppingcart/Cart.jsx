import React, { Component } from "react";
import {
  total,
  list,
  quantity,
  add,
  remove,
  onChange,
} from "cart-localstorage";
import NumberFormat from "react-number-format";
import { confirmAlert } from "react-confirm-alert";
import { Switch, Route, Link } from "react-router-dom";
import AuthService from "../../services/auth.service";
import OrderService from "../../services/OrderService";
import axios from "axios";

const tong = total();
const user = AuthService.getCurrentUser();
class Cart extends Component {
  constructor(props) {
    super(props);
    this.logOut = this.logOut.bind(this);
    this.state = {
      showModeratorBoard: false,
      showAdminBoard: false,
      currentUser: undefined,
      carts: list(),
    };
  }
  AddCart(id, name, price, image) {
    if (localStorage.getItem("cart_id") == null) {
      var crypto = require("crypto");
      var id_order = crypto.randomBytes(3).toString("hex");
      localStorage.setItem("cart_id", id_order);
    } else {
      id_order = localStorage.getItem("cart_id");
    }
    add({ id: id, name: name, price: price, image: image, id_order });
    onChange();
  }
  DeleteAddCart(id) {
    quantity(id, -1);
  }

  RemoveAddCart(id) {
   
    remove(id);
   
    if (localStorage.getItem("__cart") == "[]") {
      localStorage.removeItem("cart_id");
      localStorage.removeItem("__cart");
    }
    this.props.history.push("/cart");
    window.location.reload()
    
  }
  componentDidMount() {
    const user = AuthService.getCurrentUser();

    if (user) {
      this.setState({
        currentUser: user,
        showModeratorBoard: user.roles.includes("ROLE_MODERATOR"),
        showAdminBoard: user.roles.includes("ROLE_ADMIN"),
      });
    }
  }

  checkout() {
    if (user == null) {
      this.props.history.push(`/login`);
    } else {
      this.props.history.push(`/order`);
    }
  }
  logOut() {
    AuthService.logout();
  }
  submit = (id) => {
    confirmAlert({
      title: "Bạn có chắc không?",
      message: "Bạn muốn xóa sản phẩm này khỏi giỏ hàng không?.",
      buttons: [
        {
          label: "Xóa luôn",
          onClick: () => this.RemoveAddCart(id),
        },
        {
          label: "Đóng",
          onClick: () => this.onClose,
        },
      ],
    });
  };
  render() {
    const { currentUser, showModeratorBoard, showAdminBoard } = this.state;

    if (localStorage.getItem("__cart") != null) {
      return (
        <div>
          <div style={{height:"145px"}}></div>
          <div className="container">
            <div className="row">
              <main className="col-md-9">
                <div className="card">
                  <table className="table table-borderless table-shopping-cart">
                    <thead className="text-muted">
                      <tr className="small text-uppercase">
                        <th scope="col">Sản phẩm</th>
                        <th scope="col" >
                          Số lượng
                        </th>
                        <th scope="col" >
                          Đơn giá
                        </th>
                        <th scope="col" >
                          Thành tiền
                        </th>
                        <th scope="col" className="text-right" >
                          {" "}
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {this.state.carts.map((cat) => (
                        <tr>
                          <td>
                            <figure className="itemside">
                              <div className="aside">
                                <img
                                  className="img-sm"
                                  style={{ marginLeft: "42px" }}
                                  src={
                                    "http://localhost:3000/images/product/" +
                                    cat.image
                                  }
                                  alt="logo"
                                />
                              </div>
                              <figcaption className="info">
                                <a
                                  href={
                                    "http://localhost:3000/products/" +
                                    cat.type +
                                    "/detail-product/" +
                                    cat.id
                                  }
                                  className="title text-dark"
                                >
                                  {cat.name}
                                </a>
                              </figcaption>
                            </figure>
                          </td>
                          <td style={{ display: "flex" }}>
                            <a
                              className="btn btn-light"
                              href=""
                              onClick={(e) =>
                                this.AddCart(
                                  cat.id,
                                  cat.title,
                                  cat.price,
                                  cat.image,
                                  e
                                )
                              }
                            >
                              <i
                                class="fa fa-chevron-circle-up"
                                aria-hidden="true"
                              ></i>
                            </a>
                            <a className="btn btn">{cat.quantity}</a>
                            <a
                              className="btn btn-light"
                              href=""
                              onClick={(e) => this.DeleteAddCart(cat.id)}
                            >
                              <i
                                class="fa fa-chevron-circle-down"
                                aria-hidden="true"
                              ></i>
                            </a>
                          </td>
                          <td>
                            <div className="price-wrap">
                              <var className="price">
                                <NumberFormat
                                  value={cat.price}
                                  displayType={"text"}
                                  thousandSeparator={true}
                                />
                                đ
                              </var>
                            </div>{" "}
                            {/* price-wrap .// */}
                          </td>
                          <td>
                            <div className="price-wrap">
                              <var className="price">
                                <NumberFormat
                                  value={cat.price * cat.quantity}
                                  displayType={"text"}
                                  thousandSeparator={true}
                                />
                                đ
                              </var>
                            </div>{" "}
                            {/* price-wrap .// */}
                          </td>
                          <td className="text-right">
                            <button
                              className="btn" style={{background:'#c5c7ca87'}}
                              onClick={(e) => this.submit(cat.id)}
                            >
                             <i class="far fa-minus-square"></i> {" "}
                              Xóa
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <div className="card-body border-top">
                    <a href="#" className="float-md-right">
                      {/* {" "}///////////////////// */}
                      {currentUser ? (
                        <div>
                          <div className="btn btn-primary">
                            <a
                              style={{ color: "white" }}
                              href="http://localhost:3000/order"
                              onClick={() => this.order()}
                            >
                              Đặt hàng <i class="fa fa-chevron-right"></i>
                            </a>
                          </div>
                        </div>
                      ) : (
                        <div>
                          <Link to={"/login"}>
                            Vui lòng đăng nhập tài khoản!{" "}
                            <i class="fa fa-angle-right" aria-hidden="true"></i>
                          </Link>
                        </div>
                      )}
                    </a>
                    <a href="/" className="btn btn-light">
                      {" "}
                      <i class="fa fa-chevron-left"></i> Tiếp tục mua sắm{" "}
                    </a>
                  </div>
                </div>
                {/* card.// */}
                <div className="alert alert-success mt-3">
                  <p className="icontext">
                    <i className="icon text-success fa fa-truck" /> Miễn phí vẫn
                    chuyển
                  </p>
                </div>
              </main>
              {/* col.// */}
              <aside className="col-md-3">
                <div className="card mb-3 ">
                  <div className="card-body">
                    <form>
                      <div className="form-group">
                        <label>Bạn có dùng mã giảm giá không?</label>
                        <div className="input-group">
                          <input
                            
                            type="text"
                            className="form-control"
                            name
                            placeholder="Mã giảm giá"
                          />
                        
                          <span className="" style={{marginLeft:'5px'}}>
                          
                            <button className="btn btn-primary ">
                              Áp dụng
                            </button>
                          </span>
                        </div>
                      </div>
                    </form>
                  </div>{" "}
                  {/* card-body.// */}
                </div>{" "}
                {/* card .// */}
                <div className="card">
                  <div className="card-body">
                    <dl className="dlist-align">
                      <dt>Tổng giá trị:</dt>
                      <dd className="text-right">
                        <strong>
                          <NumberFormat
                            value={tong}
                            displayType={"text"}
                            thousandSeparator={true}
                          />
                          đ
                        </strong>
                      </dd>
                    </dl>
                    <dl className="dlist-align">
                      <dt>Khuyến mãi:</dt>
                      <dd className="text-right">0%</dd>
                    </dl>
                    <dl className="dlist-align">
                      <dt>Tổng:</dt>
                      <dd className="text-right  h5">
                        <strong>
                          <strong>
                            <NumberFormat
                              value={tong}
                              displayType={"text"}
                              thousandSeparator={true}
                            />
                            đ
                          </strong>
                        </strong>
                      </dd>
                    </dl>
                    <hr />
                    <p className="text-center mb-3">
                      <img
                        src="http://localhost:3000/images/misc/payments.png"
                        height={26}
                      />
                    </p>
                  </div>{" "}
                  {/* card-body.// */}
                </div>{" "}
                {/* card .// */}
              </aside>{" "}
              {/* col.// */}
            </div>
          </div>{" "}
          {/* container .//  */}
        </div>
      );
    } else {
      return (
        <div className="container">
           <div style={{height:"145px"}}></div>
          <div class="card-body border-top">
            <h1>Giỏ hàng hiện đang trống!</h1>
            <a href="/" class="btn btn-light">
              {" "}
              <i class="fa fa-chevron-left"></i> Tiếp tục mua hàng{" "}
            </a>
          </div>
        </div>
      );
    }
  }
}

export default Cart;
