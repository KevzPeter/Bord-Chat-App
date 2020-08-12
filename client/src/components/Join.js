import React,{useState,useEffect} from 'react'
import {Rooms} from './Rooms/Rooms'
import {Link} from 'react-router-dom'
import {Intro} from'./Intro'
import './Join.css'
import { PrivateOptions } from './PrivateOptions'
import {Loading} from './Loading'

export const Join =(props)=>{

    const [name,setName] =useState('')
    const[user,setUser]=useState('')
    const [spinner, setSpinner] = useState(true);



    useEffect(() => {
        setTimeout(() => setSpinner(false), 2200)
    }, []);


    useEffect(() => {
        if(props.location.state!==undefined) {
           setUser(props.location.state.user)
           setName(props.location.state.user)
        }
    }, [props.location.state])

    return(
        spinner?<Loading />:
        user===''?
        <>
        <div className="join-container row justify-content-center">
            <div className="form col-md-4 py-4 offset-md-2 text-center">
                <input type="text" className="form-control" id="name" 
                autoComplete="off" placeholder="Enter Name" onChange={(event) => {if(event.target.value.length<25){setName(event.target.value)}}}></input>
            </div>
            <div className="col-md-2 py-4 text-center">
            <Link to={'/login'}>
            <button className="btn btn-primary mr-2">LOGIN</button>
            </Link>
            <Link to={'/signup'}>
            <button className="btn btn-primary ">SIGNUP</button>
            </Link>
            </div>
        </div>
        <Rooms name={name} />
        <Intro />
        </>:
        <>
        <div className="join-container row justify-content-center">
        <div className="col-md-4 py-4 offset-md-2 text-center">
        <h6>Welcome {name.charAt(0).toUpperCase()+name.slice(1)}!</h6>
        </div>
        <div className="col-md-2 py-4 text-center">     
        <button className="btn btn-primary mr-2" onClick={()=>{setUser('');setName('')}}>LOGOUT</button>
        </div>
    </div>
    <Rooms name={name} />
    <PrivateOptions name={name} />
    </>
    )
}