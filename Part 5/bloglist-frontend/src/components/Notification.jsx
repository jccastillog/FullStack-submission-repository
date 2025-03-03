import React from 'react'
const Notification = ({ message, typeMsg }) => {
  if (message === null) {
    return null
  }

  return <div className={typeMsg}>{message}</div>
}

export default Notification
