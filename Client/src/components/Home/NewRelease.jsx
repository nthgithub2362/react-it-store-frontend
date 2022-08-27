import React, { Component } from 'react';
import ReactCardCarousel from "react-card-carousel";
import ProductService from '../../services/ProductService';
import CategoriesService from '../../services/CategoriesService';
import SliderComponent from './SliderComponent';
class NewRelease extends Component {
  constructor(props) {
    super(props);

    this.state = {
        categories: []
    }


}


componentDidMount() {

    CategoriesService.getCategories().then((res) => {
        this.setState({ categories: res.data });
        console.log(this.state.categories)
    });
}
render() {
    return (
<div>
<section className="section-main padding-y" style={{backgroundColor:'white'}}>
 <div className="container">


      <div className="row">
        
        <div className="col-md-8 col-xl-8 col-lg-8">
         
          
            
            <SliderComponent></SliderComponent>
          
         
        </div> 
        <div className="col-md-4">
        
          <div className="col-md-6">
          <img src="http://localhost:3000/images/slider/SN-note20-390-97-390x97.png" />
          </div>
          <div className="col-md-6" style={{marginTop:'10px'}}>
          <img src="http://localhost:3000/images/slider/Evogen11-390x97-1.png" />
          </div>
          <div className="col-md-6" style={{marginTop:'10px'}}>
          <img src="http://localhost:3000/images/slider/sticky-pk-390-97-copy2-390x97.png"/>
          </div>
          {/* <div className="col-md-6" style={{marginTop:'10px'}}>
          <img src="http://localhost:3000/images/slider/sticky-xk-390-97-390x97.png"/>
        
          </div> */}
         
          
        </div> {/* col.// */}
      </div> {/* row.// */}
      </div>
</section>

</div>
    );
  }
}

export default NewRelease;