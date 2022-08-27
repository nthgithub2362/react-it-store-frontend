import React, { Component } from 'react';
import SliderService from '../../services/SliderService';
import Carousel from 'react-bootstrap/Carousel';

class SliderComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            slider: []
        }


    }

    componentDidMount() {

        SliderService.getSider().then((res) => {
            this.setState({ slider: res.data });
        });
    }
    render() {
        
        return (
           
           <div>
              
                    <Carousel>
                    {this.state.slider.map(slide =>
                        <Carousel.Item interval={2000} key={slide.id}>
                            <img 
                                className="d-block "  width="100%"
                                src={"images/slider/" + slide.image}
                                alt={"images/slider/" + slide.image}
                            />
                            <Carousel.Caption>
                                {/* <h3>First slide label</h3>
                                <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p> */}
                            </Carousel.Caption>

                        </Carousel.Item>
                    )}
                </Carousel>
           </div>
               
            
        );
    }
}

export default SliderComponent;