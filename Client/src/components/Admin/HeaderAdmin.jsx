import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import AuthService from "../../services/auth.service";
import {
  total,
  list,
  quantity,
  add,
  remove,
  onChange,
} from "cart-localstorage";
const user = JSON.parse(localStorage.getItem("user"));
const numproduct = list().length;
class HeaderAdmin extends Component {
  constructor(props) {
    super(props);
    this.logOut = this.logOut.bind(this);

    this.state = {
      showAdminBoard: false,
      currentUser: undefined,
    };
  }

  componentDidMount() {
    const user = AuthService.getCurrentUser();

    if (user) {
      this.setState({
        currentUser: user,
        showAdminBoard: user.roles.includes("ROLE_ADMIN"),
      });
    }
    if (user !== null) {
      if (user.roles.includes("ROLE_ADMIN") === false) {
        AuthService.logout();
        
      }
    }
    
  }

  logOut() {
    AuthService.logout();
  }

  render() {
    const { currentUser, showAdminBoard } = this.state;
    return (
      <div className="container">
        <header className="section-header">
          <nav className="navbar navbar-main navbar-expand-lg border-bottom">
            <div className="container">
              <button
                className="navbar-toggler"
                type="button"
                data-toggle="collapse"
                data-target="#main_nav"
                aria-controls="main_nav"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <span className="navbar-toggler-icon" />
              </button>
              <div className="collapse navbar-collapse" id="main_nav">
                <ul className="navbar-nav">
                  <li className="nav-item dropdown">
                    <a
                      className="nav-link dropdown-toggle"
                      data-toggle="dropdown"
                      href="#"
                    >
                      {" "}
                      <i className="fa fa-bars text-muted mr-2" /> Danh mục{" "}
                    </a>
                    <div className="dropdown-menu dropdown-large">
                      <nav className="row">
                        <div className="col-4">
                          <a href="http://localhost:3000/manager-product/page=1">
                            Sản phẩm
                          </a>
                          <a href="http://localhost:3000/manager-category/page=1">
                            Danh mục
                          </a>
                          <a href="http://localhost:3000/manager-news/page=1">
                            Tin tức
                          </a>
                          <a href="http://localhost:3000/manager-user/page=1">
                            Người dùng
                          </a>
                          <a href="http://localhost:3000/manager-order/page=1">
                            Đơn hàng
                          </a>
                        </div>
                        <div className="col-4">
                          <a href="page-profile-main.html">Chi tiết sản phẩm</a>
                          <a href="page-profile-orders.html">Thông số</a>
                          <a href="manager-orders">Đơn hàng</a>
                          <a href="page-profile-wishlist.html">Yêu thích</a>
                          <a href="page-profile-setting.html">Tiện ích</a>
                        </div>
                        <div className="col-4">
                          <a href="page-profile-main.html">Khuyến mãi</a>
                          <a href="page-profile-orders.html">
                            Chi tiết đơn hàng
                          </a>
                          <a href="page-profile-seller.html">Đăng ký</a>
                          <a href="page-profile-wishlist.html">Tài khoản</a>
                          <a href="page-profile-setting.html">Cài đặt</a>
                        </div>
                        <div className="widgets-wrap float-md-left">
                          {currentUser ? (
                            <div className="widget-header mr-3">
                              <a
                                href="http://localhost:3000/user"
                                className="widget-view"
                              >
                                <div className="icon-area">
                                  <i class="fas fa-user"></i>
                                </div>
                                <small className="text">
                                  Tài khoản:{currentUser.username}
                                </small>
                              </a>
                              <a
                                href="/login"
                                className="widget-view"
                                onClick={this.logOut}
                              >
                                <div className="icon-area">
                                  <i class="fas fa-sign-out-alt"></i>
                                </div>
                                <small className="text"> Đăng xuất </small>
                              </a>
                            </div>
                          ) : (
                            <div className="widget-header mr-3">
                              <a href="/login" className="widget-view">
                                <div className="icon-area">
                                  <i class="fas fa-sign-in-alt"></i>
                                </div>
                                <small className="text"> Đăng nhập </small>
                              </a>
                              <a href="/register" className="widget-view">
                                <div className="icon-area">
                                  <i class="fas fa-user-plus"></i>
                                </div>
                                <small className="text"> Đăng ký </small>
                              </a>
                            </div>
                          )}
                        </div>
                      </nav>
                    </div>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="http://localhost:3000/home">
                      Hệ thống Website
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="http://localhost:3000/news">
                      Thành viên
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="#">
                      Mở rộng
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="#">
                      Trợ giúp
                    </a>
                  </li>
                </ul>
              </div>{" "}
              {/* collapse .// */}
            </div>{" "}
            {/* container .// */}
          </nav>
        </header>
      </div>
    );
  }
}

export default HeaderAdmin;
