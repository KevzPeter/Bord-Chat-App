import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import './Rooms.css'

export const Rooms = ({ name }) => {

    var [err, setErr] = useState(false)

    const error = () => {
        return (
            <div className="alert alert-danger" role="alert">
                <h5>Please enter name!</h5>
            </div>

        )
    }

    return (
        <div className="room-container" >
            <div className="holder col-md-4 offset-md-4 justify-content-center ">
                <h3>Public Rooms</h3>
                <hr />
                <div className="col-xs-4 text-center">
                    <div className="row justify-content-center py-2">
                        <h5 className="badge-pill badge-warning py-1"><span className="fas fa-random py-1"></span>Random</h5>
                        <Link className="col-xs-2 mx-2" onClick={e => (!name) ? (e.preventDefault(), setErr(true)) : null} to={`/chat?name=${name}&room=Random`}>
                            <button type="submit" className="btn btn-primary">Join</button>
                        </Link>
                    </div>
                    <div className="row justify-content-center py-2">
                        <h5 className="badge-pill badge-warning col-xs-4 py-1"><span className="fas fa-futbol py-1"></span>Football</h5>
                        <Link className="col-xs-2 mx-2" onClick={e => (!name) ? (e.preventDefault(), setErr(true)) : null} to={`/chat?name=${name}&room=Football`}>
                            <button type="submit" className="btn btn-primary" >Join</button>
                        </Link>
                    </div>
                    <div className="row justify-content-center py-2">
                        <h5 className="badge-pill badge-warning col-xs-4 py-1"><span className="fas fa-gamepad py-1"></span>Gaming</h5>
                        <Link className="col-xs-2 mx-2" onClick={e => (!name) ? (e.preventDefault(), setErr(true)) : null} to={`/chat?name=${name}&room=Gaming`}>
                            <button type="submit" className="btn btn-primary">Join</button>
                        </Link>
                    </div>
                    <div className="text-center py-2">{err ? error() : null}</div>
                </div>
            </div>
        </div>
    )
}
