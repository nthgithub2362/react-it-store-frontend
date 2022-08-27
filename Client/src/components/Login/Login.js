import React, { Component } from "react";
import Form from "react-validation/build/form";
import { Redirect } from "react-router-dom";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";

import AuthService from "../../services/auth.service";

const required = value => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        Trường này bắt buộc nhập!
      </div>
    );
  }
};

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.handleLogin = this.handleLogin.bind(this);
    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);

    this.state = {
      username: "",
      password: "",
      loading: false,
      message: "",
    
    };
  }
 
  onChangeUsername(e) {
    this.setState({
      username: e.target.value
    });
  }

  onChangePassword(e) {
    this.setState({
      password: e.target.value
    });
  }

  handleLogin(e) {
    e.preventDefault();

    this.setState({
      message: "",
      loading: true
    });

    this.form.validateAll();

    if (this.checkBtn.context._errors.length === 0) {
      AuthService.login(this.state.username, this.state.password).then(
        () => {
          this.props.history.push("/");
          window.location.reload();
        },
        error => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();

          this.setState({
            loading: false,
            message: resMessage
          });
        }
      );
    } else {
      this.setState({
        loading: false
      });
    }
   
  }
  render() {
    
    
   if(JSON.parse(localStorage.getItem('user'))!=null)
   {
     return <Redirect to={"/home"} />
   }else{
    return (

    <div>
      <div style={{height:"145px"}}></div>
        <Form
        onSubmit={this.handleLogin}
        ref={c => {
          this.form = c;
        }}
      ><div className="card mx-auto" style={{maxWidth: '380px',marginTop: '30px',marginBottom: '30px'}}>
      <div className="card-body">
        <h4 className="card-title mb-4">Đăng nhập</h4>
        <div className="form-group">
        
          <label htmlFor="username">Tên tài khoản</label>
          <Input
            type="text"
            className="form-control"
            name="username"
            value={this.state.username}
            onChange={this.onChangeUsername}
            validations={[required]}
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Mật khẩu</label>
          <Input
            type="password"
            className="form-control"
            name="password"
            value={this.state.password}
            onChange={this.onChangePassword}
            validations={[required]}
          />
        </div>

        <div className="form-group">
          <button
            className="btn btn-primary btn-block"
            disabled={this.state.loading}
          >
            {this.state.loading && (
              <span className="spinner-border spinner-border-sm"></span>
            )}
            <span>Đăng nhập</span>
          </button>
        </div>

        {this.state.message && (
          <div className="form-group">
            <div className="alert alert-danger" role="alert">
              {this.state.message}
            </div>
          </div>
        )}
        <CheckButton
          style={{ display: "none" }}
          ref={c => {
            this.checkBtn = c;
          }}
        />
         </div> 
</div> 
      </Form>
      
      
 
    </div>

    );
 
      
    

 
     
    

  
    
  }
}

}
