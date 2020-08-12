import React, { useState } from 'react'
import Chat from './Chat'
import axios from 'axios'
import queryString from 'query-string';

export const PrivateChat =({location})=>{

    const [enterpass,setEnterpass]=useState('') 
    const [authorized,setAuthorized]=useState(false)
    const { room } = queryString.parse(location.search);
    const [err,setErr]=useState(false)

    function auth(){
        const pass ={ name:room, pass:enterpass }
        axios.post('/auth',pass).then(res=>{
            if(res.status===200)
            setAuthorized(true)
        }).catch(e=>{
            console.log(e)
            setErr(true)
        })
    }
    function Error(){
        return(
            <div className="alert alert-danger text-center" role="alert">
                <h4>Incorrect Password</h4>
            </div>
        )
    }
    if(!authorized){
        return(
            <div className="outer-container justify-content-center py-4"> 
            {err && <Error />}               
            <div className="text-center col-md-4 offset-md-4 py-4">
                    <form onSubmit={e=>e.preventDefault()}>
                        <input type="password" autoComplete="off" id="enterpass"
                        placeholder="Enter password" onChange={e=>setEnterpass(e.target.value)}></input>
                    </form>
                    <div className="py-4">
                    <button className="btn btn-primary" onClick={auth}>Enter</button>
                    </div>
                </div>
            </div>
        )
    }
    else{
        return(
            <Chat location={location}/>
        )
    }
}
