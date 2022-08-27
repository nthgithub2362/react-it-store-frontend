import React from "react";
import AuthService from "../../services/auth.service";
import { form } from "react-validation/build/form";
import NumberFormat from "react-number-format";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { isEmail } from "validator";
import UserService from "../../services/user.service";
const user = JSON.parse(localStorage.getItem('user'));
const required = value => {
    if (!value) {
      return (
        <div className="alert alert-danger" role="alert">
          Bắt buộc!
        </div>
      );
    }
  };  
  const vpassword = value => {
    if (value.length < 6 || value.length > 40) {
      return (
        <div className="alert alert-danger" role="alert">
        Mật khẩu phải từ 6 đến 40 kí tự!
        </div>
      );
    }
  };
  const vnPass = value => {
    if (value.length < 6 || value.length > 40) {
      return (
        <div className="alert alert-danger" role="alert">
        Mật khẩu phải từ 6 đến 40 kí tự!
        </div>
      );
    }
  };
  
class ChangePassword extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: null,
      userReady: false,
      id:'',
      loading: false,
      message: "",
      password:'',
      newpassword:'',
      user:[]
    };
    this.updateUser = this.updateUser.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.onChangeNewPass = this.onChangeNewPass.bind(this);
  }
  componentDidMount() {
    const currentUser = AuthService.getCurrentUser();
    this.setState({ currentUser: currentUser, userReady: true});
    UserService.getUserById(currentUser.id).then((response) => {
      let user = response.data;
      this.setState({id:user.id, user:user});
  });
}
  onChangeNewPass(e){
    this.setState({
      newpassword: e.target.value
    });
}
  onChangePassword(e){
    this.setState({
      password: e.target.value
    });
}
updateUser=(e)=> {
  e.preventDefault(); 
      console.log('user => '+ JSON.stringify(this.state.user));
      this.setState({
        message: "",
        loading: true
      });
  
      this.form.validateAll();
  
      if (this.checkBtn.context._errors.length === 0) {
        UserService.updatePassword1(this.state.id,user.name,this.state.password,this.state.newpassword).then(
          () => {
            this.props.history.push('/user');
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
cancel(){
  this.props.history.push('/user');
}
  render() {
    const vpasswordconfig = value => {
        if (value !== this.state.newpassword) {
          return (
            <div className="alert alert-danger" role="alert">
              Xác nhận mật khẩu không hợp lệ!
            </div>
          );
        }
      };
    return (
        <section className="section-content padding-y">
          <div style={{height:"145px"}}></div>
        {/* ============================ COMPONENT REGISTER   ================================= */}
        <div className="card mx-auto" style={{maxWidth: '520px', marginTop: '40px'}}>
          <article className="card-body">
            <header className="mb-4"><h4 className="card-title">Đổi mật khẩu</h4></header>
      
              <Form
                onSubmit={this.updateUser}
                ref={c => {
                  this.form = c;
                }}
              >
                {!this.state.successful && (
                  <div>
                    
                    <div className="form-group">
                      <label htmlFor="Mật khẩu hiện tại">Mật khẩu hiện tại</label>
                      <Input
                        type="password"
                        className="form-control"
                        name="password"
                        value={this.state.password}
                        onChange={this.onChangePassword}
                        validations={[required, vpassword]}
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="Mật khẩu mới">Mật khẩu mới </label>
                      <Input
                        type="password"
                        className="form-control"
                        name="newpass"
                        value={this.state.newpass}
                        onChange={this.onChangeNewPass}
                        validations={[required, vnPass]}
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="Nhập lại mật khẩu">Xác nhận mật khẩu</label>
                      <Input
                        type="password"
                        className="form-control"
                        name="passwordconfig"
                        onChange={this.onChangePasswordConfig}
                        validations={[required, vpasswordconfig]}
                      />
                    </div>
      
                    <div className="form-group">
                      <button className="btn btn-primary btn-block">Lưu mật khẩu</button>
                      <button className="btn btn-light btn-block" onClick={this.cancel.bind(this)}>Trở về</button>
                    </div>
                  </div>
                )}
      
                {this.state.message && (
                  <div className="form-group">
                    <div
                      className={
                        this.state.successful
                          ? "alert alert-success"
                          : "alert alert-danger"
                      }
                      role="alert"
                    >
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
              </Form>
              </article>{/* card-body.// */}
        </div> {/* card .// */}      
        <br /><br />
        {/* ============================ COMPONENT REGISTER  END.// ================================= */}
      </section>
    
    )}
}
export default ChangePassword