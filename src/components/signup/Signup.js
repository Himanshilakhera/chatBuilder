import React, { useState } from "react";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import '../signup/signup.css';
import axios from 'axios';
import { useNavigate } from "react-router";

function Signup(){
    const [errorMessages , setErrorMessages] = useState({});
    const [isSubmit , setIsSubmit] = useState(false);
    const navigate = useNavigate();

    console.log(process.env.REACT_APP_URL)
    const errors = {
        uname: "invalid username",
        pass: "password should be greater than 6 digits",
        email: "invalid email"
      };

    const renderErrorMsg = (name) => {
       if(name === errorMessages.name) {
        return <div className="error">{errorMessages.message}</div>
       }
    }

    const handleSubmit = (event) =>{
        event.preventDefault();
        var { password , email , name} = document.forms[0];

        if(password.value.length < 6){
           setErrorMessages({name: "password" , message:errors.pass})
        }else if(!email.value.includes('@')){
            setErrorMessages({ name: "email", message: errors.email });
        }else{
            setIsSubmit(true);
            const payload =  {
                full_name:name.value,
                email_id:email.value,
                password:password.value
            }
            axios
            .post(`${process.env.REACT_APP_URL}api/v1/user`, payload)
            .then(res =>{
                console.log(res)
                alert("you are registered successfully!!")
                navigate("/login");
            })
            .catch(err =>{
                console.log(err)
                alert("something went wrong")
            })
        }
    }
    return (
        <div className="signUpContainer">
            <div className="signUpHeader">
                <h2>SignUp</h2>
            </div>
            <div className="signUpBody">
                <form onSubmit={handleSubmit}>
                    <div className="username">
                        <h3>Enter your Username</h3>
                        <TextField id="outlined-basic" label="username" variant="outlined" placeholder="Name"
                            name="name" required style={{ width: '100%' }}/>
                        {renderErrorMsg("name")}
                    </div>
                    <div className="email">
                        <h3>Enter your Email</h3>
                        <TextField id="outlined-basic" label="email" variant="outlined" placeholder="Email"
                            name="email" required style={{ width: '100%' }}/>
                        {renderErrorMsg("email")}
                    </div>
                    <div className="password">
                        <h3>Enter your Password</h3>
                        <TextField id="outlined-basic" label="password" variant="outlined" placeholder="password"
                            name="password" required style={{ width: '100%' }}/>
                        {renderErrorMsg("password")}
                    </div>
                    <div className="signup">
                    <Button type="submit" style={{ backgroundImage: "linear-gradient(195deg, #1ce4b8 0%, darkcyan 100%)"}} variant="contained">
                        <b>SignUp</b></Button>
                        <p>Already have an account ? <a href="/login" >Login</a> here.</p>
                   </div>
                </form>
            </div>
        </div>
    );
}

export default Signup;