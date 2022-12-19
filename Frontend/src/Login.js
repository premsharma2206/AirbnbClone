import { useState, useEffect } from "react";
// import "./Login.css";
import {Form, Button} from "react-bootstrap";
import { useNavigate } from 'react-router';

function Login() {
  const initialValues = {email: "", password: "" };
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
    setFormErrors(validate(formValues));

    
    //console.log("Inside bookAppointment");
  };



  useEffect(() => {
    console.log(formErrors);
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      console.log(formValues);
    }
  }, [formErrors]);

  async function OnSubmit(email,password) {

    console.log(process.env.REACT_APP_URL);
    const url = process.env.REACT_APP_URL + "user/login";
    console.log(url);
    const response = await fetch(url, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({"emailId": email,
                              "password" : password})
      })
      .then(resp => resp.json())
      .catch(err => console.error(err));

    var data = await response;
    console.log("ssss",response);
    // console.log(data.emailId);
    // console.log(data.password);
    if((email==data.emailId)){
      localStorage.setItem("authToken", `Bearer ${data.token}`);
        localStorage.setItem("userType",data.userType);
        console.log(localStorage.getItem("userType"));
        navigate('/',{replace : true});
        window.location.reload(false);
    }
    localStorage.setItem("authToken", `Bearer ${data.token}`);
    return data;
  }
  
  
  
  const validate = (values) => {

    console.log("Inside handleSubmit()");
    const errors = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    
    if (!values.email) {
      errors.email = "Email is required!";
    } else if (!regex.test(values.email)) {
      errors.email = "This is not a valid email format!";
    }
    if (!values.password) {
      errors.password = "Password is required";
    } else if (values.password.length < 4) {
      errors.password = "Password must be more than 4 characters";
    } else if (values.password.length > 60) {
      errors.password = "Password cannot exceed more than 60 characters";
    }

    if(Object.keys(errors).length === 0){
    
        var user = OnSubmit(values.email, values.password);
        errors.Form = "Invalid Credentials!"
        
    }

    return errors;
  };


  const goToSignUp = () => {
    navigate("/SignUp", { replace: true })
  }


  return (
    <>
  
    <div className="container">
    <div className="FormContainer d-flex justify-content-center align-items-center">
      <form className="rounded p-4 p-sm-3" onSubmit={handleSubmit}>
        
        <div className='LogoContainer'>
            <img src="img/Firstchoice_Logo.jpg" alt="Logo" className="mx-auto logo_image" onClick= {()=> navigate('/',{replace : true})}/>
        </div>
        
        <h3 style={{ textAlign: 'center', marginBottom: '10px', marginTop:"23px", textDecoration: 'underline' }}>Log In</h3>
        
        <p style={{fontSize:"25px"}}>{formErrors.Form}</p>

        <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label style={{ marginTop:"15px", fontSize:"20px", alignContent:"left"}}>Username/Email ID</Form.Label>
            <Form.Control className='InputLogin' name="email" type="text" placeholder="Enter Username/Email ID"  value={formValues.email} onChange={handleChange}/>
        </Form.Group>
        <p>{formErrors.email}</p>

        <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label style={{ marginTop:"15px", fontSize:"20px"}}>Password</Form.Label>
            <Form.Control className='InputLogin' name="password" type="password" placeholder="Enter password"  value={formValues.password} onChange={handleChange}/>
        </Form.Group>
        <p>{formErrors.password}</p>
        
        <Button style={{backgroundColor:"#15BAEB",width:"100px", height:"40px",fontSize:"20px" }} type="submit" >
            Login
        </Button>


        <div className='AdminLink'>
            <p style={{fontSize:"20px",marginTop:"25px", color:"black"}}><b>Don't have an account?</b></p>            
            <button className="btn btn-primary-outline" onClick={() => goToSignUp() } style={{marginTop:"-10px", fontSize:"20px"}}>Sign Up Here</button>
        </div>
      </form>
      </div>
    </div>
    </>
  );
}

export default Login;