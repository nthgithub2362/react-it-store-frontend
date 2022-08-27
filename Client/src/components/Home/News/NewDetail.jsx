import React, { Component } from 'react';
import NewService from '../../../services/NewService';
import ReactHtmlParser, {
  processNodes,
  convertNodeToElement,
  htmlparser2,
} from "react-html-parser";
class NewDetail extends Component {
    constructor(props) {
        super(props);

        this.state = {
            id: this.props.match.params.id,
            news: {},
            newpagenew: [],
            tips: [],
            


        };
    }
    componentDidMount() {
        NewService.getNewById(this.state.id).then((res) => {
          
            this.setState({ news: res.data});
        });
        NewService.getListNewRight(this.state.id).then((res) => {
          
          this.setState({ newpagenew: res.data});
      });
      NewService.getListNewTips().then((res) => {
        this.setState({ tips: res.data });
      });
    
    }
    render() {
        return (
            <div>
              
                 <section className="section-name padding-y bg" style={{background:'white'}}>
          <div className="container">
            <div className="row">
              
              <div className="col-md-8">
                <h1 style={{fontSize:'26px'}}>{this.state.news.name}</h1>
                
               
              
                 
             
           
            
          
           
                <p style={{ fontSize: "16px",marginLeft:'50px',marginRight:'150px',lineHeight:'28px' }}>
                {ReactHtmlParser(this.state.news.description)}
                </p>
          
               
              </div>
             
             
              <div className="col-md-4">
              <h5 className="title-section text-uppercase">Tin khác</h5>
              {this.state.newpagenew.map((lstnew) => (
                <article className="media mb-2">
                  <img
                    className="img"
                    width="30%"
                    src={"http://localhost:8080/images/" + lstnew.image}
                  />

                  <div
                    className="media-body"
                    style={{ paddingLeft: "10px", paddingRight: "10px" }}
                  >
                    <a
                      style={{ fontSize: "15px" }}
                      href={
                        "http://localhost:3000/detail-news-" + lstnew.id
                      }
                    >
                      {lstnew.name}
                    </a>

                    {/* <p id="p1">{lstnew.description}</p> */}
                  </div>
                </article>
              ))}
             <h5 className="title-section text-uppercase">Mẹo hay sử dụng</h5>
              {this.state.tips.map((lstnew) => (
              <article className="media mb-2">
                <img
                  className="img"
                  width="30%"
                  src={"http://localhost:8080/images/" + lstnew.image}
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
              </div>
            </div>{" "}
            {/* row.// */}
          </div>{" "}
          {/* container .//  */}

        </section>
        {/* ========================= SECTION CONTENT END// ========================= */}
        
            </div>
        );
    }
}

export default NewDetail;