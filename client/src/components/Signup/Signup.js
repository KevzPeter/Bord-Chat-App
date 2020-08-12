import React, { useState } from 'react'
import axios from 'axios'
import {Link,Redirect} from 'react-router-dom'

export const Signup =()=>{

    const[name,setName]=useState('')
    const[pass,setPass]=useState('')
    const[email,setEmail]=useState('')
    const[succ,setSucc]=useState(false)
    const[fail,setFail]=useState(false)
    const[username,setUsername]=useState('')
    const[passerr,setPasserr]=useState(false)
    const[mailerr,setMailerr]=useState(false)

    const success=()=>{
        if(username!==''){ 
        return(
            <Redirect to={{pathname:'/',state:{user:username}}}></Redirect>
        )
        }
    }
    const passError=()=>{
        return(
            <div className="alert alert-danger" role="alert">
                <p>Password should contain more than 8 characters</p>
            </div>
        )
    }
    const mailError=()=>{
        return(
            <div className="alert alert-danger" role="alert">
                <p>Enter valid email address</p>
            </div>
        )
    }
    const failure=()=>{
            return(
                <div className="alert alert-danger" role="alert">
                    <h4>Failed! Try again after sometime</h4>
                </div>
            )
    }

    const post=()=>{
        if(pass.length<8){
            setPasserr(true)
        }
        else if (!(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email))){
            setMailerr(true)
        }
        else{
            var data = {
                name:name, password:pass,email:email
            }  
            axios.post('/signup',data)
            .then(res=>{
                if(res.status===200){
                    setSucc(true) 
                    setUsername(res.data)}
            })
            .catch(e=>{
                console.log(e)
                setFail(true)
            })
        }
        
    }
    return(
        <div className="outer-container justify-content-center">
            <div className="text-center py-2">{succ?success():fail?failure():null}</div>
            <div className="text-center py-2">
                <h4>Signup</h4>
            </div>
            <div className="col-md-4 offset-md-4 py-2">
                <form>
                <div className="form-field">
                <span><i className="far fa-user-circle fa-2x"></i></span>
                <input className="form-control my-2" type="text" id="name" name="name" 
                placeholder="Name" autoComplete="on" onChange={e=>setName(e.target.value)}></input>
                </div>
                <div className="form-field">
                <span><i className="fas fa-envelope fa-2x"></i></span>
                <input className="form-control my-2" type="email" id="email" name="email"
                 placeholder="Email" autoComplete="on" onChange={e=>setEmail(e.target.value)}></input>
                </div>
                {mailerr?mailError():null}
                <div className="form-field">
                <span><i className="fas fa-key fa-2x"></i></span>
                <input className="form-control my-2" type="password" id="pass" name="pass" 
                placeholder="Password" autoComplete="on" onChange={e=>setPass(e.target.value)}></input>
                </div>
                {passerr?passError():null}
                </form>
            </div>
            <div className="text-center py-2">
                <button type="submit" className="btn btn-primary" onClick={post}>Register</button>
                <p id="help"><em>Already have an account? </em>
                <Link to={'/login'}> Login!</Link></p>
            </div>
        </div>
    )
}