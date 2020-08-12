import React from 'react'
import {Link} from 'react-router-dom'

export const Intro=()=>{

    return (
        <div  id="intro" className="justify-content-center py-4">
            <h4 className="tag text-center">Feeling <span id="bored">Bored</span> ? Join a room and start chatting with friends!</h4>
            <h6 className="tag text-center">Want a Private Room?
            <Link to={'/signup'}> Create an account!</Link></h6>
        </div>
    )
}