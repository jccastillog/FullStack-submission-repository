import React from "react";
const Phone = ({ phone }) => {
  return (
    <li>{phone.name} {phone.number}</li>
  )
}

export default Phone