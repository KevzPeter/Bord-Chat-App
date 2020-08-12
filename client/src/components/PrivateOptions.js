import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import './Login/Login.css'
import axios from 'axios'


export const PrivateOptions = ({ name }) => {

    const [roomname, setRoomname] = useState('')
    const [password, setPassword] = useState('')
    const [enter, setEnter] = useState('')
    const [err, setErr] = useState(false)

    function isEmpty(e) {
        if (roomname === '' || password === '') {
            setErr(true)
            e.preventDefault()
        }
        else 
        post()
    }
    function joinempty(){
        if(enter)return false
        else {
            setErr(true)
            return true
        }
    }
    const Error = () => {
        return (
            <div className="alert alert-danger p-2" role="alert">
                <h4>Error: Check credentials</h4>
            </div>

        )
    }

    function post() {
        const data = { room: roomname, pass: password }
        axios.post('/privroom', data)
            .then(res => console.log(res.data))
            .catch(e => console.log(e))
    }
    return (
        <div className="row outer-container">
            {err ? <Error /> : null}
            <div className="col-md-6 option">
                <div className="pl-4 pt-4 offset-md-4 col-md-8 justify-content-center">
                    <div className="page-header text-center">
                        <span className="badge badge-primary">Create Private Room</span>
                    </div>
                    <form>
                        <div className="form-field">
                            <span><i className="fas fa-person-booth fa-2x"></i></span>
                            <input className="form-control mt-2" type="text" id="createroomname" name="createroomname"
                                placeholder="Room Name" autoComplete="off" onChange={e => { setRoomname(e.target.value) }}></input>
                        </div>
                        <div className="form-field">
                            <span><i className="fas fa-key fa-2x"></i></span>
                            <input className="form-control mt-2" type="password" id="pass" name="pass"
                                placeholder="Password" autoComplete="off" onChange={e => setPassword(e.target.value)}></input>
                        </div>
                    </form>
                    <div className="text-center py-2">
                        <Link to={`/priv/?name=${name}&&room=${roomname}`}><button className="btn btn-primary" onClick={e=>isEmpty(e)}>Enter</button></Link>
                    </div>
                </div>
            </div>
            <div className="col-md-6">
                <div className="pl-4 col-md-8  justify-content-center">
                    <div className="page-header text-center">
                        <span className="badge badge-primary">Join Private Room</span>
                    </div>
                    <form onSubmit={e => e.preventDefault()}>
                        <div className="form-field">
                            <span><i className="fas fa-person-booth fa-2x"></i></span>
                            <input className="form-control mt-2" type="text" id="joinroomname" name="joinroomname"
                                placeholder="Room Name" autoComplete="off" onChange={e => setEnter(e.target.value)}></input>
                        </div>
                    </form>
                    <div className="text-center py-2">
                        <Link to={`/priv/?name=${name}&&room=${enter}`}><button className="btn btn-primary" onClick={e=>joinempty()?e.preventDefault():null}>Enter</button></Link>
                    </div>
                </div>
            </div>
        </div>
    )
}