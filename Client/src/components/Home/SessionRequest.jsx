import React, { Component } from 'react';

class SessionRequest extends Component {
  render() {
    return (
      <section className="padding-bottom">
        <header className="section-heading heading-line">
          <h4 className="title-section text-uppercase">YÊU CẦU BÁO GIÁ</h4>
        </header>
        <div className="row">
          <div className="col-md-8">
            <div className="card-banner banner-quote overlay-gradient" style={{ backgroundImage: 'url("http://localhost:3000/style/images/banners/banner9.jpg")' }}>
              <div className="card-img-overlay white">
                <h3 className="card-title">Một cách dễ dàng để gửi yêu cầu đến nhà cung cấp</h3>
                <p className="card-text" style={{ maxWidth: '400px' }}></p>
                <a href="#" className="btn btn-primary rounded-pill">Xem nhiều hơn</a>
              </div>
            </div>
          </div> {/* col // */}
          <div className="col-md-4">
            <div className="card card-body">
              <h4 className="title py-3">Một yêu cầu, nhiều trích dẫn</h4>
              <form>
                <div className="form-group">
                  <input className="form-control" name="search" placeholder="Bạn tìm kiếm gì?" type="text" />
                </div>
                <div className="form-group">
                  <div className="input-group">
                    <input className="form-control" placeholder="Quantity" name="quantity" type="text" />
                    <select className="custom-select form-control">
                      <option>Giá</option>
                      <option>Cấu hình</option>
                      <option>Loại</option>

                    </select>
                  </div>
                </div>
                <div className="form-group text-muted">
                  <p>Lựa chọn:</p>
                  <label className="form-check form-check-inline">
                    <input className="form-check-input" type="checkbox" defaultValue="option1" />
                    <span className="form-check-label">Yêu cầu giá</span>
                  </label>
                  <label className="form-check form-check-inline">
                    <input className="form-check-input" type="checkbox" defaultValue="option2" />
                    <span className="form-check-label">Yêu cầu 1 mẫu
                    </span></label>
                </div>
                <div className="form-group">
                  <button className="btn btn-warning">Gửi yêu cầu</button>
                </div>
              </form>
            </div>
          </div> {/* col // */}
        </div> {/* row // */}
      </section>

    );
  }
}

export default SessionRequest;