import React, { Component } from "react";

import NumberFormat from "react-number-format";
import OrderService from "../../../services/OrderService";
import HeaderAdmin from "../HeaderAdmin";

class detailOrder extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: this.props.match.params.id,
      list_product: [],
      list_product_order:[],
      info: "",
    };
  }
  componentDidMount() {
    OrderService.ListOrderDetailProduct(this.state.id).then((res) => {
      this.setState({ list_product: res.data });
    });
    OrderService.ListOrderDetail(this.state.id).then((res) => {
      this.setState({ list_product_order: res.data });
      
      console.log(this.state.list_product_order);
      const result = this.state.list_product_order.reduce(
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
                 <HeaderAdmin />
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
          <h4 className="card-title mb-4">CÁC SẢN PHẨM ĐÃ ĐẶT </h4>
          <table class="table">
                  <thead >
                    <tr>
                  
                      <th>Hình ảnh</th>
                      <th>Sản phẩm</th>
                      <th>Đơn giá(VNĐ)</th>
                    
                    </tr>
                  </thead>
                 
                  <tbody>
                    {this.state.list_product.map((allproduct) => (
                      <tr key={allproduct.id}>
                   
                        
                        <td>
                          {" "}
                          <div className="aside">
                            <img
                              className="img-sm"
                              src={
                                "http://localhost:8080/images/" +
                                allproduct.image
                              }
                              alt="logo"
                            />
                          </div>
                        </td>
                        <td>{allproduct.name}  </td>

                        <td>
                          <NumberFormat
                            value={allproduct.price}
                            displayType={"text"}
                            thousandSeparator={true}
                          />
                        </td>
                     
                    
                       
                        
                      </tr>
                    ))}
                  </tbody>
                </table>
        
          </div>
        </div>
      </div>
    );
  }
}

export default detailOrder;
