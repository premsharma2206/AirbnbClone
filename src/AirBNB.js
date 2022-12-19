import React from "react";
import { PropertyCards } from "./PropertyCards";
import SideMenu from "./SideMenu.js";

class MainContent extends React.Component {
  render() {
    return (
      <div className="hero-banner position-relative">
        <div className="bannerImageWrapper">
          <img src="./img/heroBanner.jpg" className="w-100 h-100" alt="Hero banner image" />
        </div>
        <div className="bannerCaption position-absolute col-lg-6 text-center">
          <h1 className="text-uppercase">Enjoy the finest stay</h1>
          <ul className="list-unstyled d-flex align-items-center justify-content-center">
            <li>
              Destination
            </li>
            <li>
              Luxury
            </li>
            <li>
              Despite
            </li>
          </ul>
        </div>
      </div>
    );
  }
}

export default class AirBNB extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <section>
          <div className="container-fluid">
            <div className="row">
              <SideMenu />
              <div className="col-lg-9">
                <MainContent />
                {/* <button onClick={}>Favorites</button> */}
                <PropertyCards searchTerm={this.props.searchTerm} />
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
}



