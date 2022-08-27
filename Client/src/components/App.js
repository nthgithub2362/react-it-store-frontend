import "./App.css";
import React, { Component } from "react";
import { Router, Switch, Route, Link } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import ViewProductComponent from "./Home/Product/ViewProductComponent";
import ViewProductLapComponent from "./Home/Product/ViewProductLapComponent";
import HomeComponent from "./Home/HomeComponent";
import Login from "./Login/Login";
import Register from "./Login/Register";
import AuthService from "../services/auth.service";
import Profile from "../components/profile.component";
import ViewProductWatc from "./Home/Product/ViewProductWatc";
import NewsList from "./Home/News/NewsList";
import Cart from "./shoppingcart/Cart";
import Order from "./shoppingcart/Order";
import AllProduct from "./Home/Product/AllProduct";
import MainAdmin from "./Admin/MainAdmin";
import ManagerProduct from "./Admin/Admin_Product/ManagerProduct";
import addProductPhone from "./Admin/Admin_Product/addProduct";
import MyUser from "./User/MyUser";
import OrderDetail from "./User/OrderDetail";
import ChangeUser from "./User/ChangeUser";

import SearchAll from "./Search/SearchAll";

import ChangPassComponent from "./User/ChangePassword";
import NewDetail from "./Home/News/NewDetail";
import BestSelling from "./Home/BestSelling";
import ViewProductAccessories from "./Home/Product/ViewProductAccessories";
import ProductPhone from "./Home/Page/ProductPhone";
import ProductLaptop from "./Home/Page/ProductLaptop";
import ProductWatch from "./Home/Page/ProductWatch";
import ProductAccessories from "./Home/Page/ProductAccessories";
import ContactComponent from "./Contact/ContactComponent";
import addNew from "./Admin/Manager_News/addNew";
import ManagerNews from "./Admin/Manager_News/ManagerNews";
import ManagerOrder from "./Admin/Manager_Order/ManagerOrder";
import ManagerCategory from "./Admin/Manager_Category/ManagerCategory";
import addCategories from "./Admin/Manager_Category/addCategories";
import detailOrder from "./Admin/Manager_Order/detailOrder";
import ProductFilter from "./Home/Page/ProductFilter";
import ProductListBrand from "./Home/Page/ProductListBrand";
import LoginAdmin from "./Login/LoginAdmin";
import ManagerUser from "./Admin/ManagerUser/ManagerUser";
import addUser from "./Admin/ManagerUser/addUser";
import updateUser from "./Admin/ManagerUser/updateUser";

class App extends Component {
  constructor(props) {
    super(props);
    this.logOut = this.logOut.bind(this);

    this.state = {
      showModeratorBoard: false,
      showAdminBoard: false,
      currentUser: undefined,
    };
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

  logOut() {
    AuthService.logout();
  }

  render() {
    return (
      <Switch>
        {/* user */}

        <Route path="/login-admin" component={LoginAdmin}></Route>
        <Route path="/update-user/:id" component={ChangeUser}></Route>
        {/* end user */}
        {/* product */}
        <Route path="/admin" component={MainAdmin}></Route>
        <Route
          path="/manager-product/page=:page"
          component={ManagerProduct}
        ></Route>
        <Route path="/product-:id" component={addProductPhone}></Route>

        {/* product */}
        {/* new */}
        <Route path="/manager-news/page=:page" component={ManagerNews}></Route>
        <Route path="/news-:id" component={addNew}></Route>

        {/* new */}
        {/* user-admin */}
        <Route path="/manager-user/page=:page" component={ManagerUser}></Route>
        <Route path="/users-add" component={addUser}></Route>
        <Route path="/update-user-:id" component={updateUser}></Route>
        {/* user-admin */}

        {/* category */}
        <Route
          path="/manager-category/page=:page"
          component={ManagerCategory}
        ></Route>
        <Route path="/categories-:id" component={addCategories}></Route>
        {/* category */}

        {/* order */}
        <Route
          path="/manager-order/page=:page"
          component={ManagerOrder}
        ></Route>
        <Route path="/order-id=:id" component={detailOrder}></Route>
        {/* order*/}

        <div id="tg-wrapper" className="tg-wrapper tg-haslayout">
          <Header />
          <Route exact path={["/it-store","/trang-chu"]} component={HomeComponent} />
          <Route
            path="/products/phone/detail-product/:id"
            component={ViewProductComponent}
          ></Route>
          <Route
            path="/products/laptop/detail-product/:id"
            component={ViewProductLapComponent}
          ></Route>
          <Route
            path="/products/watch/detail-product/:id"
            component={ViewProductWatc}
          ></Route>
          <Route
            path="/products/accessories/detail-product/:id"
            component={ViewProductAccessories}
          ></Route>
          <Route path="/detail-news-:id" component={NewDetail}></Route>

          {/* page category */}
          <Route path="/product/phone" component={ProductPhone}></Route>
          <Route path="/product/laptop" component={ProductLaptop}></Route>
          <Route path="/product/watch" component={ProductWatch}></Route>
          <Route
            path="/product/accessories"
            component={ProductAccessories}
          ></Route>
          {/* page category */}

          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/profile" component={Profile} />
          <Route exact path="/change-password" component={ChangPassComponent} />
          <Route exact path="/news" component={NewsList} />
          <Route exact path="/cart" component={Cart} />

          <Route exact path="/order" component={Order} />
          <Route exact path="/all-product" component={AllProduct} />
          <Route exact path="/user" component={MyUser} />
          <Route path="/user/order/details/:id" component={OrderDetail}></Route>
          <Route path="/search/:name" component={SearchAll}></Route>
          {/* page contact */}
          <Route path="/contact/:id" component={ContactComponent}></Route>
          {/* page contact */}

          <Route
            path="/phone/ps=:price_small/pl=:price_large/br=:brand"
            component={ProductFilter}
          ></Route>
          <Route path="/phone/br=:brand" component={ProductListBrand}></Route>

          <Footer />
        </div>
      </Switch>
    );
  }
}

export default App;
