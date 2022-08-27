import React, { Component } from "react";
import ContactService from "../../services/ContactService";
import NewService from "../../services/NewService";

class ContactComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // step 2
      id: this.props.match.params.id,

      title: "",
      content: "",
      image: "",
      name: "",
      email: "",
      phone: "",
      tips: [],
      contactnew:[],
      anser:'none',
    };

    this.changeTitleHandler = this.changeTitleHandler.bind(this);
    this.changeContentHandler = this.changeContentHandler.bind(this);
    this.changeImgHandler = this.changeImgHandler.bind(this);
    this.changeNameHandler = this.changeNameHandler.bind(this);
    this.changeEmailHandler = this.changeEmailHandler.bind(this);
    this.changePhoneHandler = this.changePhoneHandler.bind(this);

    this.saveContact = this.saveContact.bind(this);
  }
  componentDidMount() {
    NewService.getListNewTips().then((res) => {
      this.setState({ tips: res.data });
    });
    ContactService.getContactNew().then((res) => {
        this.setState({ contactnew: res.data });
      });
    // step 4
    if (this.state.id === "send") {
      return;
    }
  }
  saveContact = (e) => {
    e.preventDefault();
    let contact = {
      title: this.state.title,
      content: this.state.content,
      image: this.state.image,
      name: this.state.name,
      email: this.state.email,
      phone: this.state.phone,
      anser: this.state.anser,
    };
    console.log("product => " + JSON.stringify(contact));

    /// step 5
    if (this.state.id === "send") {
      ContactService.CreateContact(contact).then((res) => {
        alert('Phản hồi của bạn đã được gửi đi.')
      });
    }
  };

  changeTitleHandler = (event) => {
    this.setState({ title: event.target.value });
  };
  changeContentHandler = (event) => {
    this.setState({ content: event.target.value });
  };
  changeImgHandler = (event) => {
    this.setState({ image: event.target.value });
  };
  changeNameHandler = (event) => {
    this.setState({ name: event.target.value });
  };
  changeEmailHandler = (event) => {
    this.setState({ email: event.target.value });
  };
  changePhoneHandler = (event) => {
    this.setState({ phone: event.target.value });
  };
  cancel() {
    this.props.history.push("/home");
  }
  render() {
    return (
      <div className="container">
        <div style={{height:"150px"}}></div>
        <div className="row">
          <div
            className="col-md-8"
            style={{
              fontSize: "14px",
              textTransform: "uppercase",
              paddingTop: "20px",
              paddingBottom: "20px",
            }}
          >
            <h4 style={{ textAlign: "center" }}>THÔNG TIN LIÊN HỆ</h4>
            <div className="row">
              <div className="col-md-6">
                <div className="form-group">
                  <label>Họ và tên </label>
                  <input
                    type="text"
                    placeholder="Họ và tên"
                    name="name"
                    className="form-control"
                    value={this.state.name}
                    onChange={this.changeNameHandler}
                  />
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group">
                  <label> Email </label>
                  <input
                    type="text"
                    placeholder="Email"
                    name="email"
                    className="form-control"
                    value={this.state.email}
                    onChange={this.changeEmailHandler}
                  />
                </div>
              </div>
            </div>

            <div className="form-group">
              <label> Số điện thoại </label>
              <input
                type="number"
                placeholder="Số điện thoại"
                name="phone"
                className="form-control"
                value={this.state.phone}
                onChange={this.changePhoneHandler}
              />
            </div>
            <div className="form-group">
              <label> Tiêu đề </label>
              <input
                placeholder="Tiêu đề"
                name="title"
                className="form-control"
                value={this.state.title}
                onChange={this.changeTitleHandler}
              />
            </div>
            <div className="form-group">
              <label> Nội dung </label>
              <textarea
                rows="9"
                cols="70"
                placeholder="Nội dung"
                name="description"
                className="form-control"
                value={this.state.content}
                onChange={this.changeContentHandler}
              />
            </div>
            <div className="form-group">
              <label> File </label>
              <div>
                <input type="file" onChange={this.changeImgHandler} />
              </div>
            </div>

            <a
              type="btn"
              href="http://localhost:3000/contact/send"
              style={{ fontSize: "20px", float: "right" }}
              onClick={this.saveContact}
            >
              <i class="fas fa-share"></i> Gửi
            </a>
          </div>
          <div
            className="col-md-4"
            style={{
              fontSize: "14px",
              paddingTop: "20px",
              paddingBottom: "20px",
            }}
          >
              <h5 className="title-section text-uppercase">Một số thủ thuật</h5>
            {this.state.tips.map((lstnew) => (
              <article className="media mb-2">
                <img
                  className="img"
                  width="30%"
                  src={"http://localhost:3000/images/new/" + lstnew.image}
                />

                <div
                  className="media-body"
                  style={{ paddingLeft: "10px", paddingRight: "10px" }}
                >
                  <a
                    style={{ fontSize: "15px" }}
                    // href={"http://localhost:3000/news/detail-new/" + lstnew.id}
                  >
                    {lstnew.name}
                  </a>

                  {/* <p id="p1">{lstnew.description}</p> */}
                </div>
              </article>
            ))}

<h5 className="title-section text-uppercase">Câu hỏi mới nhất</h5>
            {this.state.contactnew.map((lstnew) => (
              <article className="media mb-2" style={{borderBottom:'1px solid grey'}}>
              <div
                className="media-body"
                style={{ paddingLeft: "10px", paddingRight: "10px" }}
              >
                <a id="ques1"
                  style={{ fontSize: "15px" }}
                  href={
                    "http://localhost:3000/news/detail-new/" + lstnew.id
                  }
                >
                  <i class="fas fa-question"></i>{" "}
                  {lstnew.content}
                </a>
                <span style={{color:"gray",paddingLeft:'20px'}}>{lstnew.name}</span>

                {/* <p id="p1">{lstnew.description}</p> */}
              </div>
            </article>
            ))}
          </div>
        </div>
      </div>
    );
  }
}

export default ContactComponent;
