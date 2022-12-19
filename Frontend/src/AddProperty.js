import React, { Component, useState, useEffect  } from "react";
import AirBNBFooter from './Footer.js';
import AirBNBHeader from './Header.js';
import { useLocation } from "react-router-dom";
import DatePicker from 'react-date-picker';
// import "./Login.css";
import {Form, Button} from "react-bootstrap";
import { useNavigate } from 'react-router';


function AddNewProperty(){

  const OnSubmit = (values) => {
    const url = process.env.REACT_APP_URL + "property";
    const response = fetch(url, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({		"title": values.title,
                                "location": values.location,
                                "isAvailable": true,
                                "description":values.description,
                                "cleaningfee": values.cleaningfee,
                                "servicefee": values.servicefee,
                                "amenities": values.description,
                                "bedrooms": values.bedrooms,
                                "pricepernight": values.pricepernight,
                                "imageName": values.imageName})

    });
    navigate('/Host',{replace : true});
  }


    const initialValues = {title: "", location: "", description:"", pricepernight: "", cleaningfee: "", servicefee: "", shortdescription: "", bedrooms: "",imageName: "" };
    const [formValues, setFormValues] = useState(initialValues);
    const [formErrors, setFormErrors] = useState({});
    const [isSubmit, setIsSubmit] = useState(false);
    const navigate = useNavigate()
  
    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormValues({ ...formValues, [name]: value });
    };
  
    const handleSubmit = (e) => {
      //console.log("Inside handleSubmit()");  
  
      e.preventDefault();
      var user = OnSubmit(formValues);
  
      
      //console.log("Inside bookAppointment");
    };
  
  
  
    useEffect(() => {
      console.log(formErrors);
      if (Object.keys(formErrors).length === 0 && isSubmit) {
        console.log(formValues);
      }
    }, [formErrors]);
  
    
    
    
    
   


  return (
    <>
  
    <div className="container">
    <div className="FormContainer d-flex justify-content-center align-items-center">
      <form className="rounded p-4 p-sm-3" onSubmit={handleSubmit}>
        
        <div className='LogoContainer'>
            <img src="img/Firstchoice_Logo.jpg" alt="Logo" className="mx-auto logo_image" onClick= {()=> navigate('/',{replace : true})}/>
        </div>
        
        <h3 style={{ textAlign: 'center', marginBottom: '10px', marginTop:"23px", textDecoration: 'underline' }}>Add/Update Property</h3>
        
        <p style={{fontSize:"25px"}}>{formErrors.Form}</p>

        <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label style={{ marginTop:"15px", fontSize:"20px", alignContent:"left"}}>Title: </Form.Label>
            <Form.Control className='InputLogin' name="title" type="text" placeholder="Enter Title"  value={formValues.title} onChange={handleChange}/>
        </Form.Group>
        <p>{formErrors.email}</p>

        <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label style={{ marginTop:"15px", fontSize:"20px"}}>Location: </Form.Label>
            <Form.Control className='InputLogin' name="location" type="text" placeholder="Enter Location"  value={formValues.location} onChange={handleChange}/>
        </Form.Group>
        <p>{formErrors.password}</p>

        <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label style={{ marginTop:"15px", fontSize:"20px", alignContent:"left"}}>Description:  </Form.Label>
            <Form.Control className='InputLogin' name="description" type="text" placeholder="Enter Description"  value={formValues.description} onChange={handleChange}/>
        </Form.Group>
        <p>{formErrors.email}</p>

        <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label style={{ marginTop:"15px", fontSize:"20px"}}>Price Per Night:</Form.Label>
            <Form.Control className='InputLogin' name="pricepernight" type="text" placeholder="Enter Price Per Night"  value={formValues.pricepernight} onChange={handleChange}/>
        </Form.Group>
        <p>{formErrors.password}</p>

        <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label style={{ marginTop:"15px", fontSize:"20px", alignContent:"left"}}>Cleaning Fee: </Form.Label>
            <Form.Control className='InputLogin' name="cleaningfee" type="text" placeholder="Enter Cleaning Fee"  value={formValues.cleaningfee} onChange={handleChange}/>
        </Form.Group>
        <p>{formErrors.email}</p>

        <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label style={{ marginTop:"15px", fontSize:"20px"}}>Service Fee: </Form.Label>
            <Form.Control className='InputLogin' name="servicefee" type="text" placeholder="Enter Service Fee"  value={formValues.servicefee} onChange={handleChange}/>
        </Form.Group>
        <p>{formErrors.password}</p>

        <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label style={{ marginTop:"15px", fontSize:"20px"}}>Short Description:</Form.Label>
            <Form.Control className='InputLogin' name="shortdescription" type="text" placeholder="Enter Short Description"  value={formValues.shortdescription} onChange={handleChange}/>
        </Form.Group>
        <p>{formErrors.password}</p>

        <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label style={{ marginTop:"15px", fontSize:"20px", alignContent:"left"}}>Bedrooms: </Form.Label>
            <Form.Control className='InputLogin' name="bedrooms" type="text" placeholder="Enter Bedrooms"  value={formValues.bedrooms} onChange={handleChange}/>
        </Form.Group>
        <p>{formErrors.email}</p>

        <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label style={{ marginTop:"15px", fontSize:"20px"}}>Image Name: </Form.Label>
            <Form.Control className='InputLogin' name="imageName" type="text" placeholder="Enter Image Name"  value={formValues.imageName} onChange={handleChange}/>
        </Form.Group>
        <p>{formErrors.password}</p>
        
        <Button style={{backgroundColor:"#15BAEB",width:"100px", height:"40px",fontSize:"20px" }} type="submit" >
            Submit
        </Button>


        {/* <div className='AdminLink'>
            <p style={{fontSize:"20px",marginTop:"25px", color:"black"}}><b>Don't have an account?</b></p>            
            <p className='Link' onClick={ goToSignUp } style={{marginTop:"-10px", fontSize:"20px"}}>Sign Up Here</p>
        </div> */}
        {/* onClick = {OnSubmit(formValues.email,formValues.password)} */}
      </form>
      </div>
    </div>
    </>
  );
    
  }

  export default class AddProperty extends Component{
    render() {
        return (
            <div>


                <AddNewProperty/>
                    
                <AirBNBFooter/>
            </div>
        )
    }
  }