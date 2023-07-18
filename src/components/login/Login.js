import React, { useState } from "react";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import '../login/login.css';
import { useNavigate } from "react-router";
import axios from "axios";

function Login() {
    const [errorMessages , setErrorMessages] = useState({});
    const [isSubmit , setIsSubmit] = useState(false);
    const navigate = useNavigate();

    const [users , setUsers] = useState([]);
    axios
    .get(`${process.env.REACT_APP_URL}api/v1/nodes`)
    .then(res =>{
        console.log(res)
        // setUsers 
    })
    .catch(err =>{
        console.log(err)
    })

    // const database = [
    //     {
    //       username: "user1",
    //       password: "pass1"
    //     },
    //     {
    //       username: "user2",
    //       password: "pass2"
    //     }
    //   ];

    // const errors = {
    //     uname: "invalid username",
    //     pass: "invalid password"
    //   };

    // const renderErrorMsg = (name) => {
    //    if(name === errorMessages.name) {
    //     return <div className="error">{errorMessages.message}</div>
    //    }
    // }

    const handleSubmit = (event) =>{

        event.preventDefault();
        var { email , password } = document.forms[0];
        const payload = {
            email_id: email.value.trim(),
            password:password.value.trim()
        }
        axios
        .post(`${process.env.REACT_APP_URL}api/v1/login`,payload)
        .then(res =>{
            console.log(res)
            alert("successfully login!!")
            navigate("/settings")
        })
        .catch(err =>{
            console.log(err)
            alert("something went wrong");
        })

        // const userdata = database.find((user)=> user.username === name.value);
    
        // if(userdata){
        //     if(userdata.password !== password.value){
        //         setErrorMessages({ name:"password" , message:errors.pass});
        //     }else{
        //         setIsSubmit(true);
        //         console.log("submitedd....");
        //         navigate("/Settings");

        //     }
        // }else {
        //     setErrorMessages({ name: "name", message: errors.uname });
        //   }
    }
    return (
        <div className="LoginContainer">
            <div className="loginHeader">
                <h2>Login</h2>
            </div>
            <div className="loginBody">
                <form onSubmit={handleSubmit}>
                    <div className="username">
                        <h3>Enter your Email</h3>
                        <TextField id="outlined-basic" label="email" variant="outlined" placeholder="email"
                            name="email" required/>
                        {/* {renderErrorMsg("name")} */}
                    </div>
                    <div className="password">
                        <h3>Enter your Password</h3>
                        <TextField id="outlined-basic" label="password" variant="outlined" placeholder="password"
                            name="password" required/>
                        {/* {renderErrorMsg("password")} */}
                    </div>
                    <div className="login">
                    <Button type="submit" style={{ backgroundImage: "linear-gradient(195deg, #1ce4b8 0%, darkcyan 100%)"}} variant="contained">
                        <b>Login</b></Button>
                        <p>Don't have an account ? <a href="/signup" >SignUp</a> here.</p>
                   </div>

                </form>
            </div>
        </div>
    );
}

export default Login;