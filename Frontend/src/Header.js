import React, { Component } from "react";
import SearchBox from './SearchBox.js';
import {Navbar, Nav} from 'react-bootstrap';
import { Dropdown} from 'react-bootstrap';
import { FaUserCircle } from "react-icons/fa";
import {Routes, Route, useNavigate, Link} from 'react-router-dom';




const Login = () => {
  if(localStorage.getItem("authToken")== ""){
    return(
      <div className="d-flex align-items-center flex-row justify-content-end" id="navbarSupportedContentMenu">
          <Link to = "/SignUp"  className="nav-link">Sign Up</Link>
          <Nav.Link className="align-items-right" href='#'><i className="bi bi-globe" /></Nav.Link>
          <Link to = "/Login"  className="nav-link">Login</Link>
    </div>);
  }
  return(<></>);
}
const Logout = () => {
  const navigate =useNavigate();
    const onLogOut = () => {
      localStorage.setItem("authToken", "");
      navigate("/");
      window.location.reload(false);
    }
  if(localStorage.getItem("authToken")!= ""){
    console.log(localStorage.getItem("userType"));
    if(localStorage.getItem("userType")=="host"){
      return(
        <Dropdown style={{marginLeft:"150px"}}>
            <Dropdown.Toggle variant="dark" id="dropdown-basic">
            <FaUserCircle style={{color:'white', marginRight:"10px", width:"35px"}}/>
            </Dropdown.Toggle>
            <Dropdown.Menu>
            <Link to = "/Host"><Dropdown.Item href="#/action-1">My Properties</Dropdown.Item></Link>

            <button onClick = {onLogOut}><Dropdown.Item href="#/action-2">Logout</Dropdown.Item></button>
            </Dropdown.Menu>
                    
        </Dropdown>
        );
    }
    else{
    return(
      <Dropdown style={{marginLeft:"50px"}}>
          <Dropdown.Toggle variant="dark" id="dropdown-basic">
          <FaUserCircle style={{color:'white', marginRight:"10px", width:"35px"}}/>
          </Dropdown.Toggle>
          <Dropdown.Menu>
          <Link to = "/Reservations"><Dropdown.Item href="#/action-1">My Reservations</Dropdown.Item></Link>
          <Link to = "/Favorites"><Dropdown.Item href="#/action-2">Favorites</Dropdown.Item></Link>
          <button onClick = {onLogOut}><Dropdown.Item href="#/action-3">Logout</Dropdown.Item></button>
          </Dropdown.Menu>
                  
      </Dropdown>
      );
    }
  }
  return(<></>);
}

// class TopRightMenu extends React.Component {
//   render() {
//     return (
  
//     );
//   }
// }



export default class AirBNBHeader extends React.Component {
  constructor(props) {
    super(props);
  }
  handleCallback = (childData) => {
    this.props.parentCallback(childData);
  }
  render() {
    return (
      
        
          <div className="row align-items-center">
            
            <Navbar Navbar bg="light" variant="light">
                   
                   <Nav className="logo">                 
                         <a href ="/"> <img style={{height:"100px", width:"200px", marginLeft:"10px", marginRight:"100px"}} src="img/Firstchoice.jpg" alt="Logo"/> </a>
                   </Nav>                        
                     
                   <SearchBox style={{alignItem:"center"}} className="align-items-right" parentCallback={(childData) => this.handleCallback(childData)} />             
                   <Login/>         
                   <div>
                   <Logout/>    
                   </div>
       
             </Navbar>
          </div>
        
      
    );
  }
}