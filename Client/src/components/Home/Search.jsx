import React, { Component } from "react";
import NumberFormat from "react-number-format";
import ProductService from "../../services/ProductService";
import { total, list, quantity, add, onChange } from "cart-localstorage";
import { Redirect } from "react-router-dom";
export default class Search extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      redirect: false,
    };
    this.onSearch = this.onSearch.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  onSearch(e) {
    const value = e.target.value;
    var lowerCaseName = value.toLowerCase();
    this.setState({
      name: lowerCaseName,
    });
  }
  handleSubmit() {
   
    
 
      this.setState({ redirect: true });
 
      
    
    
    
    
    
  }
  render() {
    const { redirect, name } = this.state;
    if (redirect) {
      return <Redirect to={`/search/${name}`} />;
    }
    return (
    
     
          <form
            
            className="search-header"
            onSubmit={this.handleSubmit}
          >
              <div className="input-group w-100">
            <input
              type="search"
              required="required"
              className="form-control"
              value={this.state.name}
              onChange={this.onSearch}
    
              placeholder="Bạn tìm sản phẩm nào?"
            />

            <div className="input-group-append">
            <a
              href={`/search/${name}`}
              className="btn btn-primary"
              type="submit "
              
              value="Submit"
            >
               <i className="fa fa-search" /> Tìm kiếm
            </a>
            </div>
            </div>
          </form>
      
       
   
  
    );
  }
}
