import React,{ useState } from 'react'
import {Link,Redirect} from 'react-router-dom'
import './Login.css'
import axios from 'axios'

export const Login =()=>{

    const[pass,setPass]=useState('')
    const[email,setEmail]=useState('')
    const[succ,setSucc]=useState(false)
    const[fail,setFail]=useState(false)
    const[mailerr,setMailerr]=useState(false)
    const[username,setUsername]=useState('')

    const mailError=()=>{
        return(
            <div className="alert alert-danger" role="alert">
                <p>Enter valid email address</p>
            </div>
        )
    }


    const success=()=>{
        if(username!==''){ 
            return(
            
                <Redirect to={{pathname:'/',state:{user:username}}}></Redirect>
        )
        }
        
    }
    const failure=()=>{
        return(
            <div className="alert alert-danger" role="alert">
                <h4>Incorrect Details. Check email/password</h4>
            </div>
           
        )
    }

    const post=()=>{
        if (!(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email))){
            setMailerr(true)
        }
        else{
            var data = {
                password:pass,email:email
            }  
            axios.post('/login',data)
            .then(res=>{
                if(res.status===200){
                    setSucc(true)
                    setUsername(res.data)
                }
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
                <h4>Login</h4>
            </div>
            <div className="col-md-4 offset-md-4 py-2">
                <form>
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
                </form>
            </div>
            <div className="text-center py-2">
                <button type="submit" className="btn btn-primary" onClick={post}>Login</button>
                <p id="help"><em>Don't have an account? </em>
                <Link to={'/signup'}> Create one now!</Link></p>
            </div>
        </div>
    )
}