

import React from 'react'

const RestOfApp = () => {
    const handleClick = () => {
        localStorage.removeItem("user_token")
    }
  return (
    <>
        <div>All our pages of the app</div>
        <button onClick={() => handleClick}>Logout</button>
    </>
  )
}

export default RestOfApp