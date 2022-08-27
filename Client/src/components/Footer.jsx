import React, { Component } from 'react';

class Footer extends Component {
    render() {
        return (
          <footer className="section-footer border-top">
  <section className="footer-main border-top padding-y">
    <div className="container">
      <div className="row">
      
        <aside className="col-md">
          <h6 className="title">Công ty</h6>
          <ul className="list-unstyled">
            <li> <a href="#">Thông tin</a></li>
            <li> <a href="#">Nghề nghiệp</a></li>
            <li> <a href="#">Tìm trong kho</a></li>
            <li> <a href="#">Quy tắc và điều khoản</a></li>
            <li> <a href="#">Web site</a></li>
          </ul>
        </aside>
        <aside className="col-md">
          <h6 className="title">Trợ giúp</h6>
          <ul className="list-unstyled">
            <li> <a href="#">Liên hệ</a></li>
            <li> <a href="#">Hoàn tiền</a></li>
            <li> <a href="#">Tình trạng đơn hàng</a></li>
            <li> <a href="#">Thông tin vận chuyển</a></li>
          
          </ul>
        </aside>
        <aside className="col-md">
          <h6 className="title">Tài khoản</h6>
          <ul className="list-unstyled">
            <li> <a href="#"> Đăng ký </a></li>
            <li> <a href="#"> Đăng nhập </a></li>
            <li> <a href="#"> Cài đặt tài khoản </a></li>
            <li> <a href="#"> Đơn hàng của tôi </a></li>
          </ul>
        </aside>
        <aside className="col-md">
          <h6 className="title">Dữ liệu</h6>
          <ul className="list-unstyled">
            <li><a href="#"> Tài liệu </a> </li>
            <li><a href="#"> Hội thảo</a> </li>
            <li><a href="#"> Sản phẩm mẫu </a></li>
          </ul>
        </aside>
      </div> {/* row.// */}
    </div>{/* //container */}
  </section>	{/* footer-top.// */}
  <section className="footer-bottom border-top">
    <div className="container">
      <div className="row">
        <div className="col-md-6">
          <span className="pr-2">© 2019 Company name</span>
          <span className="pr-2"><a href="#">Privacy policy</a></span>
          <span className="pr-2"><a href="#">Terms of use</a></span>
        </div>
        <div className="col-md-6 text-md-right">
          <a href="#"><img src="http://localhost:3000/style/images/misc/appstore.png" height={30} /></a>
          <a href="#"><img src="http://localhost:3000/style/images/misc/playmarket.png" height={30} /></a>
        </div>
      </div> {/* row.// */}
    </div>{/* //container */}
  </section>
</footer>

        
        );
    }
}

export default Footer;