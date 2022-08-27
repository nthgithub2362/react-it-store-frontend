import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import AuthService from "../../services/auth.service";
import OrderService from "../../services/OrderService";
import { confirmAlert } from 'react-confirm-alert'
const user = JSON.parse(localStorage.getItem("user"));

class MyUser extends Component {
  constructor(props) {
    super(props);

    this.state = {
      redirect: null,
      userReady: false,
      currentUser: { username: "" },
      list_order: [],
      list_order_detail:[],
    };
   
    this.submit = this.submit.bind(this);
  }

  componentDidMount() {
    const currentUser = AuthService.getCurrentUser();

    if (!currentUser) this.setState({ redirect: "/home" });
    this.setState({ currentUser: currentUser, userReady: true });

    OrderService.ListOrder(user.id).then((res) => {
      this.setState({ list_order: res.data });
     
    });
  }
  Huy(id, fullname, id_order, phone, user_id, address, status,date) {
    let order = {
      fullname: fullname,
      id_order: id_order,
      phone: phone,
      user_id: user_id,
      address: address,
      date: date,
    };

      OrderService.CancelOrder(order, id).then((res) => {
       
      });

 
  }

  changeUser(id)
  {
    this.props.history.push(`update-user/${id}`);
  }
  submit = (id, fullname, id_order, phone, user_id, address, status,date) =>{
    confirmAlert({
      title: 'Bạn có chắc không?',
      message: 'Bạn muốn hủy đơn hàng này không?.',
      buttons: [
        {
          label: 'Hủy luôn',
          onClick: () => this.Huy(id, fullname, id_order, phone, user_id, address, status,date)
        },
        {
          label: 'Đóng',
          onClick: () => this.onClose
        }
      ]
    });
  };
  
  render() {
    const count_order=this.state.list_order.length;
    if (this.state.redirect) {
      return <Redirect to={this.state.redirect} />;
    } else {
      const { currentUser } = this.state;
      return (
        <section className="section-content padding-y">
          <div style={{height:"145px"}}></div>
          <div className="container">
            <div className="row">
              <main className="col-md-12">
                <article className="card mb-3">
                  <div className="card-body">
                    <figure className="icontext">
                      <div className="icon">
                        <img
                          className="rounded-circle img-sm border"
                          src="http://localhost:3000/images/avatars/avatar3.jpg"
                        />
                      </div>
                      <div className="text">
                      Tên tài khoản:<strong style={{color:'#ff6a00'}}>  {currentUser.username} </strong>{" "}
                        <br />
                        <br />
                        Email:<strong style={{color:'#ff6a00'}}> {currentUser.email}</strong> <br />
                        <br />
                        <a href={"update-user/"+currentUser.id} className="btn btn-light btn-sm">
                          Thay đổi thông tin
                        </a>
                        <br />
                        <br />
                        <a href="change-password" className="btn btn-light btn-sm">
                          Đổi mật khẩu
                        </a>
                      </div>
                    </figure>
                    <hr />
                    <p>
                      <i className="fa fa-map-marker text-muted" /> &nbsp; Địa
                      chỉ:  {currentUser.address} &nbsp;
                      
                     
                    </p>
                    <article className="card-group card-stat">
                      <figure className="card bg">
                        <div className="p-3">
                          <h4 className="title">{count_order}</h4>
                          <span>Đơn hàng</span>
                        </div>
                      </figure>
                      {/* <figure className="card bg">
                        <div className="p-3">
                          <h4 className="title">5</h4>
                          <span>Yêu thích</span>
                        </div>
                      </figure>
                       */}
                    </article>
                  </div>{" "}
                  {/* card-body .// */}
                </article>{" "}
                {/* card.// */}
                <article className="card  mb-3">
                  <div className="card-body">
                    <h5 className="card-title mb-4">Danh sách đơn hàng ({count_order}) </h5>
                    <div className="row">
                    <div className="col-md-12">
                      <table class="table">
                        <thead class="">
                          <tr className="small text-uppercase">
                          <th scope="col" style={{width:'200px'}}>STT</th>
                            <th scope="col" style={{width:'200px'}}>Mã đơn hàng</th>
                            <th scope="col" style={{width:'200px'}}>Ngày đặt</th>
                            <th scope="col" style={{width:'200px'}}>Tình trạng</th>
                            <th scope="col" style={{width:'200px'}}>Lựa chọn</th>
                          </tr>
                         
                        </thead>
                        <tbody>
                            
                        {this.state.list_order.map((lstor,i) => (
                            <tr key={i}>
                              <td style={{width:'200px'}}>{i+1}</td>
                              <td style={{width:'200px'}}>{lstor.id_order}</td>
                              <td style={{width:'200px'}}>{lstor.date}</td>
                              <td>
                          {" "}
                          {(() => {
                            if (lstor.status == false) {
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
                              <td style={{width:'200px'}}><a href={"http://localhost:3000/user/order/details/"+lstor.id_order}>Xem chi tiết</a></td>
                            <td style={{width:'200px'}}>
                            {(() => {
                            if (lstor.status == true) {
                              return (
                                <a type="button"
                                href=""
                                onClick={() =>
                                  this.submit(
                                    lstor.id,
                                    lstor.fullname,
                                    lstor.id_order,
                                    lstor.phone,
                                    lstor.user_id,
                                    lstor.address,
                                    lstor.status,
                                    lstor.date
                                  )
                                  
                                }
                                  
                                  style={{ marginLeft: "20px" }}
                                 
                                 
                                  className="btn btn-danger"
                                >
                                  <i class="far fa-window-close"></i> Hủy đơn
                                </a>
                              );
                            }
                          })()}
                             </td>
                            </tr>
                         
                          ))}
                      
                        </tbody>
                      </table>
                   
                      </div>
                    </div>{" "}
                    {/* row.// */}
                  </div>{" "}
                  {/* card-body .// */}
                </article>{" "}
            
                {/* card.// */}
              </main>{" "}
              {/* col.// */}
            </div>
          </div>{" "}
          {/* container .//  */}
        </section>
      );
    }
  }
}

export default MyUser;
