import React, { Component } from 'react';
import { Router, Switch, Route, Link } from "react-router-dom";
import BestSelling from './BestSelling';
import NewRelease from './NewRelease';

import SessionRequest from './SessionRequest';

import SessionItemPhone from './SessionItemPhone';
import SessionItemLap from './SessionItemLap';
import SessionItemWatch from './SessionItemWatch';
import SessionAccessories from './SessionAccessories';
import SessionNew from './SessionNew';
class HomeComponent extends Component {
    render() {
        return (
           
            <div className="container">
            <NewRelease />
          
            <Route exact path={["/it-store","/trang-chu"]} component={BestSelling} />
            {/* <BestSelling /> */}
            {/* <Session2></Session2> */}
           
            <SessionItemPhone></SessionItemPhone>
            <SessionItemLap></SessionItemLap>
            <SessionAccessories></SessionAccessories>
            <SessionItemWatch></SessionItemWatch>
            <SessionNew></SessionNew>
            {/* <SessionRequest></SessionRequest> */}
            </div>
           
        );
    }
}

export default HomeComponent;