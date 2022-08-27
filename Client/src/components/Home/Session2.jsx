import React, { Component } from 'react';

class Session2 extends Component {
    render() {
        return (
            <section className="padding-bottom">
  <header className="section-heading heading-line">
    <h4 className="title-section text-uppercase">Apparel</h4>
  </header>
  <div className="card card-home-category">
    <div className="row no-gutters">
      <div className="col-md-3">
        <div className="home-category-banner bg-light-orange">
          <h5 className="title">Best trending clothes only for summer</h5>
          <p>Consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. </p>
          <a href="#" className="btn btn-outline-primary rounded-pill">Source now</a>
          <img src="http://localhost:3000/style/images/items/2.jpg" className="img-bg" />
        </div>
      </div> {/* col.// */}
      <div className="col-md-9">
        <ul className="row no-gutters bordered-cols">
          <li className="col-6 col-lg-3 col-md-4">
            <a href="#" className="item"> 
              <div className="card-body">
                <h6 className="title">Well made women clothes with trending collection</h6>
                <img className="img-sm float-right" src="http://localhost:3000/style/images/items/1.jpg" /> 
                <p className="text-muted"><i className="fa fa-map-marker-alt" /> Guanjou, China</p>
              </div>
            </a>
          </li>
          <li className="col-6 col-lg-3 col-md-4">
            <a href="#" className="item"> 
              <div className="card-body">
                <h6 className="title">Great clothes with trending collection</h6>
                <img className="img-sm float-right" src="http://localhost:3000/style/images/items/2.jpg" /> 
                <p className="text-muted"><i className="fa fa-map-marker-alt" /> Beijing, China</p>
              </div>
            </a>
          </li>
          <li className="col-6 col-lg-3 col-md-4">
            <a href="#" className="item"> 
              <div className="card-body">
                <h6 className="title">Demo clothes with sample collection</h6>
                <img className="img-sm float-right" src="http://localhost:3000/style/images/items/3.jpg" /> 
                <p className="text-muted"><i className="fa fa-map-marker-alt" /> Tokyo, Japan</p>
              </div>
            </a>
          </li>
          <li className="col-6 col-lg-3 col-md-4">
            <a href="#" className="item"> 
              <div className="card-body">
                <h6 className="title">Home and kitchen electronic  stuff collection</h6>
                <img className="img-sm float-right" src="http://localhost:3000/style/images/items/4.jpg" /> 
                <p className="text-muted"><i className="fa fa-map-marker-alt" /> Tashkent, Uzb</p>
              </div>
            </a>	
          </li>
          <li className="col-6 col-lg-3 col-md-4">
            <a href="#" className="item"> 
              <div className="card-body">
                <h6 className="title">Home and kitchen electronic  stuff collection</h6>
                <img className="img-sm float-right" src="http://localhost:3000/style/images/items/5.jpg" /> 
                <p className="text-muted"><i className="fa fa-map-marker-alt" /> London, Britain</p>
              </div>
            </a>
          </li>
          <li className="col-6 col-lg-3 col-md-4">
            <a href="#" className="item"> 
              <div className="card-body">
                <h6 className="title">Home and kitchen electronic  stuff collection</h6>
                <img className="img-sm float-right" src="http://localhost:3000/style/images/items/6.jpg" /> 
                <p className="text-muted"><i className="fa fa-map-marker-alt" /> Guanjou, China</p>
              </div>
            </a>
          </li>
          <li className="col-6 col-lg-3 col-md-4">
            <a href="#" className="item"> 
              <div className="card-body">
                <h6 className="title">Well made clothes with trending collection </h6>
                <img className="img-sm float-right" src="http://localhost:3000/style/images/items/7.jpg" /> 
                <p className="text-muted"><i className="fa fa-map-marker-alt" /> Hong Kong, China</p>
              </div>
            </a>
          </li>
          <li className="col-6 col-lg-3 col-md-4">
            <a href="#" className="item"> 
              <div className="card-body">
                <h6 className="title">Home and kitchen interior  stuff collection </h6>
                <img className="img-sm float-right" src="http://localhost:3000/style/images/items/6.jpg" /> 
                <p className="text-muted"><i className="fa fa-map-marker-alt" /> Guanjou, China</p>
              </div>
            </a>
          </li>
        </ul>
      </div> {/* col.// */}
    </div> {/* row.// */}
  </div> {/* card.// */}
</section>

        );
    }
}

export default Session2;