import React, { Component } from 'react';
import ProductFinder from './ProductFinder';
import Tips from './Tips';
import About from './About';
import { NavLink, BrowserRouter as Router, Route, Switch } from 'react-router-dom';

export default class Main extends Component {

  render() {
    return (
      <div className="main">
        <Router>
          <div>
            <NavLink to='/'>
                <button className="nav-button nav-product-finder">
                <h4>PRODUCT FINDER</h4>
                </button>
            </NavLink>
            <NavLink to='/tips'>
              <button className="nav-button nav-my-collection">
                <h4>MY COLLECTION</h4>
              </button>
            </NavLink>
            <NavLink to='/about'>
              <button className="nav-button about">
                <h4>ABOUT</h4>
              </button>
            </NavLink>

            <Switch>
              <Route path="/about" component={About} />
              <Route path="/tips" component={Tips} />
              <Route path="/" component={ProductFinder} />
            </Switch>
          </div>
        </Router>
      </div>
    )
  }
}
