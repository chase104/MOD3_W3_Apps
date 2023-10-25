

import axios from 'axios';
import React, { useEffect } from 'react'

const RestOfApp = ({setUser}) => {
    const handleClick = () => {
        localStorage.removeItem("user_token");
        setUser(null);
    }
    useEffect(() => {
        axios({
            method: "GET",
            url: "/server/posts",
            headers: {
                Authorization: localStorage.getItem('user_token')
            }
        }).then((response) => {
            console.log(response);
        })
    }, []);
  return (
    <>
        <div>All our pages of the app</div>
        <button onClick={handleClick}>Logout</button>
    </>
  )
}

export default RestOfApp