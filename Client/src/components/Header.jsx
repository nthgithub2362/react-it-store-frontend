import React, { Component } from 'react';
import {Link } from "react-router-dom";
import AuthService from "../services/auth.service";
import { total,list, quantity, add,remove,onChange } from 'cart-localstorage'
import Search from '../components/Home/Search';
import CategoriesService from '../services/CategoriesService';
const numproduct=list().length;
class Header extends Component {
    constructor(props) {
        super(props);
        this.logOut = this.logOut.bind(this);
    
        this.state = {
          showModeratorBoard: false,
          showAdminBoard: false,
          currentUser: undefined,
          cp:[],
          cl:[],
          cs:[],
          cm:[],
          ck:[],
          cb:[],
        };
      }
    
      componentDidMount() {
        CategoriesService.getCb().then((res) => {
          this.setState({ cb: res.data });
        });
        CategoriesService.getCk().then((res) => {
          this.setState({ ck: res.data });
        });
        CategoriesService.getCs().then((res) => {
          this.setState({ cs: res.data });
        });
        CategoriesService.getCm().then((res) => {
          this.setState({ cm: res.data });
        });
        CategoriesService.getCp().then((res) => {
          this.setState({ cp: res.data });
        });
        CategoriesService.getCl().then((res) => {
          this.setState({ cl: res.data });
        });
      
        const user = AuthService.getCurrentUser();
    
        if (user) {
          this.setState({
            currentUser: user,
            showModeratorBoard: user.roles.includes("ROLE_MODERATOR"),
            showAdminBoard: user.roles.includes("ROLE_ADMIN"),
          });
        }
      }
    
      logOut() {
        AuthService.logout();
      }
    
      render() {
        const { currentUser, showModeratorBoard, showAdminBoard } = this.state;
 
     
        return ( 
          <div className="container" >
            <header className="section" style={{backgroundColor:'white'}}>
  <section className="header-main border-bottom">
    <div className="container">
      <div className="row align-items-center">
        <div className="col-xl-4 col-lg-3 col-md-12">
          <a href="http://localhost:3000/it-store" className="brand-wrap">
            
            <img width="60%"src="http://localhost:3000/images/logo/logo1.jpg" />
          </a> {/* brand-wrap.// */}
        </div>
        <div className="col-xl-5 col-lg-5 col-md-6" >
          < Search/>
        </div> {/* col.// */}
        <div className="col-xl-3 col-lg-4 col-md-6">
          <div className="widgets-wrap float-md-right">
         
       
            <div className="widget-header">
              <a href="http://localhost:3000/cart" className="widget-view" >
                <div className="icon-area">
                  <i className="fa fa-shopping-cart" />
                  <span className="notify">{numproduct}</span>
                </div>

                <small className="text" > Giỏ hàng </small>
              </a>
            </div>
            {currentUser ? (
              
            <div className="widget-header mr-3">
              <a href="http://localhost:3000/user" className="widget-view">
                <div className="icon-area">
                <i class="fas fa-user"></i>
                  {/* <span className="notify">3</span> */}
                </div>
                <small className="text">   {currentUser.username} </small>
              </a>
              <a href="/login" className="widget-view" onClick={this.logOut}>
                <div className="icon-area">
                <i class="fas fa-sign-out-alt"></i>
                  {/* <span className="notify">3</span> */}
                </div>
                <small className="text"> Đăng xuất </small>
              </a>
              
            </div>
            
          
            ) : (
              <div className="widget-header mr-3">
              <a href="/login" className="widget-view">
                <div className="icon-area">
                <i class="fas fa-sign-in-alt"></i>
                  {/* <span className="notify">3</span> */}
                </div>
                <small className="text"> Đăng nhập </small>
              </a>
              <a href="/register" className="widget-view">
                <div className="icon-area">
                <i class="fas fa-user-plus"></i>
                  {/* <span className="notify">3</span> */}
                </div>
                <small className="text"> Đăng ký </small>
              </a>
            </div>
             )}
          </div> {/* widgets-wrap.// */}
        </div> {/* col.// */}
      </div> {/* row.// */}
    </div> {/* container.// */}
  </section> {/* header-main .// */}
  <nav className="navbar navbar-main navbar-expand-lg border-bottom">
    <div className="container">
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#main_nav" aria-controls="main_nav" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon" />
      </button>
      <div className="collapse navbar-collapse" id="main_nav">
        <ul className="navbar-nav">
         
          <li className="nav-item">
            <a className="nav-link" href="http://localhost:3000/product/phone"><i class="fas fa-mobile-alt"></i> Điện thoại</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="http://localhost:3000/product/laptop"><i class="fas fa-laptop"></i> Laptop</a>
          </li>
          <li className="nav-item">
          

      <div className="collapse navbar-collapse" id="main_nav">
        <ul className="navbar-nav">
          <li className="nav-item dropdown">
            <a className="nav-link dropdown-toggle" data-toggle="dropdown" href="#"> <i class="fas fa-headphones"></i> Phụ kiện</a>
            <div className="dropdown-menu dropdown-large" style={{width:"700px"}}>
              <nav className="row">
                <div className="col-4">
                  <h6 style={{borderBottom:'1px solid grey'}}>PHỤ KIỆN DI ĐỘNG</h6>
                  {this.state.cp.map((p)=>(
                     <a href="http://localhost:3000/manager-product/page=1">{p.name}</a>
                  ))}
                 
                 
                  
                  
                </div>
                <div className="col-4">
                <h6 style={{borderBottom:'1px solid grey'}}>PHỤ KIỆN LAPTOP</h6>
                {this.state.cl.map((p)=>(
                     <a href="http://localhost:3000/manager-product/page=1">{p.name}</a>
                  ))}
                  
                </div> 
                <div className="col-4">
                <h6 style={{borderBottom:'1px solid grey'}}>THƯƠNG HIỆU HÀNG ĐẦU</h6>
                {this.state.cb.map((p)=>(
                     <a href="http://localhost:3000/manager-product/page=1">{p.name}</a>
                  ))}
                  
                </div> 
                <div className="col-4">
                <h6 style={{borderBottom:'1px solid grey'}}>THIẾT BỊ ÂM THANH</h6>
                {this.state.cs.map((p)=>(
                     <a href="http://localhost:3000/manager-product/page=1">{p.name}</a>
                  ))}
                  
                </div> 
                <div className="col-4">
                <h6 style={{borderBottom:'1px solid grey'}}>THIẾT BỊ LƯU TRỮ</h6>
                {this.state.cm.map((p)=>(
                     <a href="http://localhost:3000/manager-product/page=1">{p.name}</a>
                  ))}
                  
                </div> 
                <div className="col-4">
                <h6 style={{borderBottom:'1px solid grey'}}>PHỤ KIỆN KHÁC</h6>
                {this.state.ck.map((p)=>(
                     <a href="http://localhost:3000/accessorie/">{p.name}</a>
                  ))}
                  
                </div> 
               
              </nav> 
            </div> 
          </li>
          
        </ul>
      
      </div> {/* collapse .// */}
    
          </li>
          <li className="nav-item">
            <a className="nav-link" href="http://localhost:3000/product/watch"><i class="fas fa-clock"></i> Đồng hồ</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="http://localhost:3000/news"><i class="fas fa-newspaper"></i> Tin tức</a>
          </li>
        
          <li className="nav-item">
            <a className="nav-link" href="http://localhost:3000/contact/send"><i class="fas fa-phone-volume"></i> Liên hệ</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#"><i class="fas fa-sim-card"></i> Sim, Thẻ cào</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#"><i class="fas fa-undo-alt"></i> Máy cũ giá rẻ</a>
          </li>
          {/* <li className="nav-item">
            <a className="nav-link" href="#"><i class="fas fa-percent"></i> Trả góp 0%</a>
          </li> */}
        </ul>
        <ul className="navbar-nav ml-md-auto">
          {/* <li className="nav-item">
            <a className="nav-link" href="#">Get the app</a>
          </li> */}
          {/* <li className="nav-item dropdown">
            <a className="nav-link dropdown-toggle" href="http://example.com" data-toggle="dropdown">English</a>
            <div className="dropdown-menu dropdown-menu-right">
              <a className="dropdown-item" href="#">Russian</a>
              <a className="dropdown-item" href="#">French</a>
              <a className="dropdown-item" href="#">Spanish</a>
              <a className="dropdown-item" href="#">Chinese</a>
            </div>
          </li> */}
        </ul>
      </div> {/* collapse .// */}
    </div> {/* container .// */}
  </nav>
 
</header> 
</div>
);
    }
}

export default Header;