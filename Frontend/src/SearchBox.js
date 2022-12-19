import React from "react";

export default class SearchBox extends React.Component {
  constructor(props){
    super(props);
  }
  onTrigger = (event) => {
    this.props.parentCallback(event.target.value);
  }

  render() {
    return (
      <div className="col-md-8">
        <span className="d-flex align-items-center">
          <input
            type="text"
            name="search"
            placeholder="Search..."
            onChange={(event) => this.onTrigger(event)}
            style={{width:"70%"}}
          />
          &nbsp;
          &nbsp;
          <div className="icon-wrapper">
            <i className="search-icon fa fa-search" style={{ fontSize: '24px' }} />
          </div>
        </span>
      </div>
    );
  }
}