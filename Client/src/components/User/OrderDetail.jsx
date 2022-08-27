import React, { Component } from "react";
import OrderService from "../../services/OrderService";
import ProductService from "../../services/ProductService";
import NumberFormat from "react-number-format";
import { total } from "cart-localstorage";

class OrderDetail extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: this.props.match.params.id,
      list_product: [],
      info: "",
    };
  }

  componentDidMount() {
    OrderService.ListOrderDetail(this.state.id).then((res) => {
      this.setState({ list_product: res.data });
      console.log(this.state.list_product);
      const result = this.state.list_product.reduce(
        (total, currentValue) =>
          (total = total + currentValue.price * currentValue.quantity),
        0
      );
      console.log(result);
      this.setState({ result: result });
    });
    OrderService.getInfoOrder(this.state.id).then((res) => {
      this.setState({ info: res.data });
    });
  }

  render() {
    return (
      <div className="container">
        <div style={{height:"145px"}}></div>
        <div className="row">
          <div className="col-md-5">
            <h1 className="card-title mb-4">THÔNG TIN KHÁCH HÀNG </h1>
            <table class="table table-borderless">
             
                <tr className="text-uppercase">
                  <th scope="col">Tên khách hàng: {this.state.info.fullname}</th>
                
                </tr>
                <tr className=" text-uppercase">
                  <th scope="col">Địa chỉ nhận hàng: {this.state.info.address}</th>
           
                </tr>
                <tr className=" text-uppercase">
                  <th scope="col">Số điện thoại: {this.state.info.phone}</th>
                
                </tr>
           
            </table>
          </div>
          
          <div className="col-md-7">
          <h1 className="card-title mb-4">Danh sách sản phẩm </h1>
            <table class="table table-borderless">
              <thead class="thead-light">
                <tr className="small text-uppercase">
                  <th scope="col" style={{fontSize:'18px',textAlign:'center'}}>Mã sản phẩm</th>
                  <th scope="col"style={{fontSize:'18px',textAlign:'center'}}>Đơn giá</th>
                  <th scope="col"style={{fontSize:'18px',textAlign:'center'}}>Số lượng</th>
                  <th scope="col"style={{fontSize:'18px',textAlign:'center'}}>Thành tiền</th>
                 
                </tr>
              </thead>
              <tbody>
                {this.state.list_product.map((lstpr, i) => (
                  <tr>
                    <td style={{fontSize:'18px',textAlign:'center'}}>{lstpr.id}</td>
                    <td style={{fontSize:'18px',textAlign:'center'}}>
                      <NumberFormat
                        value={lstpr.price}
                        displayType={"text"}
                        thousandSeparator={true}
                      />
                      đ
                    </td >
                    <td style={{fontSize:'18px',textAlign:'center'}}>{lstpr.price}</td>
                    <td style={{fontSize:'18px',textAlign:'center'}}>
                      <NumberFormat
                        value={lstpr.quantity * lstpr.price}
                        displayType={"text"}
                        thousandSeparator={true}
                      />
                      đ
                    </td>
              
                  </tr>
                ))}
                <tr>
                  <td colspan="3" style={{fontSize:'18px',textAlign:'center'}}>Tổng giá trị</td>
                  <td style={{fontSize:'18px',textAlign:'center'}}>
                    {" "}
                    <NumberFormat
                      value={this.state.result}
                      displayType={"text"}
                      thousandSeparator={true}
                    />
                    đ
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}

export default OrderDetail;
