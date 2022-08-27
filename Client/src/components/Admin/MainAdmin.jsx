import React, { Component } from "react";
import HeaderAdmin from "./HeaderAdmin";
import { Redirect } from "react-router-dom";
import AuthService from "../../services/auth.service";

class MainAdmin extends Component {
  constructor(props) {
    super(props);
    this.logOut = this.logOut.bind(this);

    this.state = {
      showAdminBoard: false,
      currentUser: undefined,
    };
  }

  componentDidMount() {
    const user = AuthService.getCurrentUser();

    if (user) {
      this.setState({
        currentUser: user,
        showAdminBoard: user.roles.includes("ROLE_ADMIN"),
      });
    }
    if (user !== null) {

      if (user.roles.includes("ROLE_ADMIN") === false) {
        AuthService.logout();
        this.props.history.push("/login-admin");
        
       
      }
    //   if (user.roles.includes("ROLE_ADMIN") === false) {
    //  
    // }
    }else{
      this.props.history.push("/login-admin");
    }
    
  }

  logOut() {
    AuthService.logout();
  }

  render() {
    return (
      <div>
     
          <HeaderAdmin />
  
          
      
              <main>
               
              </main>
       
          
        
    

      </div>
    );
  }
}

export default MainAdmin;
