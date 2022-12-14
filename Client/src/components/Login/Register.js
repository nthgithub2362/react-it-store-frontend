import React, { Component } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { isEmail } from "validator";
import authService from "../../services/auth.service";

const required = (value) => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        This field is required!
      </div>
    );
  }
};

const email = (value) => {
  if (!isEmail(value)) {
    return (
      <div className="alert alert-danger" role="alert">
        This is not a valid email.
      </div>
    );
  }
};

const vusername = (value) => {
  if (value.length < 3 || value.length > 20) {
    return (
      <div className="alert alert-danger" role="alert">
        The username must be between 3 and 20 characters.
      </div>
    );
  }
};

const vpassword = (value) => {
  if (value.length < 6 || value.length > 40) {
    return (
      <div className="alert alert-danger" role="alert">
        The password must be between 6 and 40 characters.
      </div>
    );
  }
};
const vaddress = (value) => {
  if (value.length < 6 || value.length > 300) {
    return (
      <div className="alert alert-danger" role="alert">
        The Adress must be between 6 and 40 characters.
      </div>
    );
  }
};
const vphone = (value) => {
  if (value.length < 6 || value.length > 40) {
    return (
      <div className="alert alert-danger" role="alert">
        The phone must be between 6 and 40 characters.
      </div>
    );
  }
};


export default class Register extends Component {
  constructor(props) {
    super(props);
    this.handleRegister = this.handleRegister.bind(this);
    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.onChangeAddress = this.onChangeAddress.bind(this);
    this.onChangePhone = this.onChangePhone.bind(this);

    this.state = {
      username: "",
      email: "",
      password: "",
      address: "",
      phone: "",
      successful: false,
      message: "",
    };
  }

  onChangeUsername(e) {
    this.setState({
      username: e.target.value,
    });
  }

  onChangeEmail(e) {
    this.setState({
      email: e.target.value,
    });
  }

  onChangePassword(e) {
    this.setState({
      password: e.target.value,
    });
  }
  onChangeAddress(e) {
    this.setState({
      address: e.target.value,
    });
  }
  onChangePhone(e) {
    this.setState({
      phone: e.target.value,
    });
  }
  handleRegister(e) {
    e.preventDefault();

    this.setState({
      message: "",
      successful: false,
    });

    this.form.validateAll();

    if (this.checkBtn.context._errors.length === 0) {
      authService
        .register(this.state.username, this.state.email, this.state.password,this.state.address,this.state.phone)
        .then(
          (response) => {
            this.setState({
              message: response.data.message,
              successful: true,
            });
          },
          (error) => {
            const resMessage =
              (error.response &&
                error.response.data &&
                error.response.data.message) ||
              error.message ||
              error.toString();

            this.setState({
              successful: false,
              message: resMessage,
            });
          }
        );
    }
  }

  render() {
    return (
      <div>
        <div style={{height:"145px"}}></div>
        <section className="section-content">
          {/* ============================ COMPONENT REGISTER   ================================= */}
          <div
            className="card mx-auto"
            style={{ maxWidth: "520px"}}
          >
            <article className="card-body">
              <header className="mb-4">
                <h4 className="card-title">????ng k?? t??i kho???n</h4>
              </header>
              <Form
                onSubmit={this.handleRegister}
                ref={(c) => {
                  this.form = c;
                }}
              >
                {!this.state.successful && (
                  <div>
                    <div className="form-group">
                      <label htmlFor="username">T??n ????ng nh???p</label>
                      <Input
                        type="text"
                        className="form-control"
                        name="username"
                        value={this.state.username}
                        onChange={this.onChangeUsername}
                        validations={[required, vusername]}
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="email">Email</label>
                      <Input
                        type="text"
                        className="form-control"
                        name="email"
                        value={this.state.email}
                        onChange={this.onChangeEmail}
                        validations={[required, email]}
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="password">M???t kh???u</label>
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
                      <label htmlFor="address">?????a ch???</label>
                      <Input
                        type="text"
                        className="form-control"
                        name="address"
                        value={this.state.address}
                        onChange={this.onChangeAddress}
                        validations={[required, vaddress]}
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="phone">??i???n tho???i</label>
                      <Input
                        type="text"
                        className="form-control"
                        name="phone"
                        value={this.state.phone}
                        onChange={this.onChangePhone}
                        validations={[required, vphone]}
                      />
                    </div>
                    <div className="form-group">
                      <button className="btn btn-primary btn-block">
                        ????ng k??
                      </button>
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
                  ref={(c) => {
                    this.checkBtn = c;
                  }}
                />
              </Form>
            </article>
            {/* card-body.// */}
          </div>{" "}
          {/* card .// */}
          <p className="text-center mt-4">
            Have an account? <a href="/login">Log In</a>
          </p>
          <br />
          <br />
          {/* ============================ COMPONENT REGISTER  END.// ================================= */}
        </section>
     
      </div>
    );
  }
}
