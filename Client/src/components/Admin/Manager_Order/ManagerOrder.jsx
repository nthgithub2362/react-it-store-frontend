import React, { Component } from "react";
import { confirmAlert } from "react-confirm-alert";
import HeaderAdmin from "../HeaderAdmin";
import NumberFormat from "react-number-format";
import AdminService from "../../../services/AdminService";
import ProductService from "../../../services/ProductService";

import NewService from "../../../services/NewService";
import ReactHtmlParser, {
  processNodes,
  convertNodeToElement,
  htmlparser2,
} from "react-html-parser";
import OrderService from "../../../services/OrderService";

class ManagerOrder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      content: [],
      currentPage: this.props.match.params.page,
      size: 4,
      disabled1: "",
      disabled2: "",
      product: "",
      isDialogOpen: false,
    };

    this.nextPage = this.nextPage.bind(this);
    this.previousPage = this.previousPage.bind(this);
    this.findAll = this.findAll.bind(this);

    this.Huy = this.Huy.bind(this);
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
    if (this.state.currentPage > 1)
      this.props.history.push(
        "/manager-order/page=" + (this.state.currentPage -= 1)
      );
    this.findAll(this.state.currentPage);
    this.changcurrentPage(this.state.currentPage);
  }
  nextPage() {
    let condition = Math.ceil(this.state.totalElements / this.state.size);
    if (this.state.currentPage < condition)
      this.props.history.push(
        "/manager-order/page=" + (this.state.currentPage -= 1)
      );
    this.findAll(this.state.currentPage);
    this.changcurrentPage(this.state.currentPage);
  }
  findAll(currentPage) {
    currentPage -= 1;
    OrderService.ListAllOrder(currentPage, this.state.size)
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
    this.findAll(this.state.currentPage);
  }

  Huy(id, fullname, id_order, phone, user_id, address, status) {
    let order = {
      fullname: fullname,
      id_order: id_order,
      phone: phone,
      user_id: user_id,
      address: address,
    };
    localStorage.setItem("pagePresent", this.state.currentPage);
    if (status == true) {
      OrderService.CancelOrder(order, id).then((res) => {});
    }
    if (status == false) {
      OrderService.NoCancelOrder(order, id).then((res) => {});
    }
  }

  render() {
    return (
      <div>
        <HeaderAdmin />
        <div className="container"></div>
        <main className="container">
          <div>
            <div className="card mb-12">
              <div className="card-header">
                <h3>
                  <i className="fas fa-table me-1" />
                  Danh sách đơn hàng
                </h3>{" "}
                {/* <button
                  type="text"
                  className="btn btn-primary"
                  onClick={this.addProduct}
                >
                  <i class="fa fa-plus" aria-hidden="true"></i> Thêm mới(Tin tức)
                </button> */}
              </div>

              <div className="">
                <table class="table table-hover">
                  <thead class="thead-light">
                    <tr>
                      <th>Mã đơn hàng</th>
                      <th>Tên khách hàng</th>
                      <th>Điện thoại</th>
                      <th>Email</th>
                      <th>Tình trạng</th>
                      <th colspan="2" style={{ width: "200px" }}>Lựa chọn</th>
                    </tr>
                  </thead>

                  <tbody>
                    {this.state.content.map((allproduct) => (
                      <tr key={allproduct.id_order}>
                        <td>{allproduct.id_order} </td>
                        <td>{allproduct.fullname} </td>
                        <td>{allproduct.phone} </td>
                        <td>{allproduct.address} </td>
                        <td>
                          {" "}
                          {(() => {
                            if (allproduct.status == false) {
                              return (
                                <span style={{ color: "red" }}>Đã hủy đơn</span>
                              );
                            } else {
                              return (
                                <span style={{ color: "green" }}>
                                  Đang đặt hàng
                                </span>
                              );
                            }
                          })()}{" "}
                        </td>
                        <td>
                          {(() => {
                            if (allproduct.status == true) {
                              return (
                                <a
                                  type="button"
                                  href={
                                    "http://localhost:3000/manager-order/page=" +
                                    localStorage.getItem("pagePresent")
                                  }
                                  style={{ marginLeft: "20px" }}
                                  onClick={() =>
                                    this.Huy(
                                      allproduct.id,
                                      allproduct.fullname,
                                      allproduct.id_order,
                                      allproduct.phone,
                                      allproduct.user_id,
                                      allproduct.address,
                                      allproduct.status
                                    )
                                  }
                                  className="btn btn-danger"
                                >
                                  <i class="far fa-window-close"></i> Hủy đơn
                                </a>
                              );
                            }
                          })()}
                          {(() => {
                            if (allproduct.status == false) {
                              return (
                                <a
                                  type="button"
                                  href={
                                    "http://localhost:3000/manager-order/page=" +
                                    localStorage.getItem("pagePresent")
                                  }
                                  style={{ marginLeft: "20px" }}
                                  onClick={() =>
                                    this.Huy(
                                      allproduct.id,
                                      allproduct.fullname,
                                      allproduct.id_order,
                                      allproduct.phone,
                                      allproduct.user_id,
                                      allproduct.address,
                                      allproduct.status
                                    )
                                  }
                                  className="btn btn-success"
                                >
                                  <i class="fas fa-undo-alt"></i> Phục hồi đơn
                                </a>
                              );
                            }
                          })()}
                        </td>
                        <td>
                        <a
                                  type="button"
                                  href={
                                    "http://localhost:3000/order-id="+
                                    allproduct.id_order
                                  }
                              
                                  className="btn btn-primary"
                                >
                                 <i class="fas fa-eye"></i>
                                </a>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div style={{ paddingBottom: "10px", float: "right" }}>
                  <nav aria-label="Page navigation example">
                    <ul className="pagination">
                      <li className={"page-item " + this.state.disabled1}>
                        <button
                          className="page-link"
                          href="#"
                          onClick={this.previousPage}
                        >
                          <i class="fa fa-arrow-left" aria-hidden="true"></i>
                        </button>
                      </li>
                      <li className="page-item active">
                        <a
                          className="page-link"
                          value={this.state.currentPage}
                          onChange={this.changcurrentPage}
                        >
                          {this.state.currentPage}
                        </a>
                      </li>
                      <li className={"page-item " + this.state.disabled2}>
                        {" "}
                        <button className="page-link" onClick={this.nextPage}>
                          <i class="fa fa-arrow-right" aria-hidden="true"></i>
                        </button>
                      </li>
                    </ul>
                  </nav>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }
}

export default ManagerOrder;
