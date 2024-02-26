import React from "react";
const AddPhone = ( props ) => {
  return (
<>
  <form onSubmit={props.addPhone}>
    <div>
      Name:<input value={props.newPhone} onChange={props.handlePhoneChange} />
    </div>
    <div>          
      Number:<input value={props.newNumber} onChange={props.handleNumberChange} />
    </div>
    <div>
      <button type="submit"> Add</button>
    </div>
  </form>
</>
  )}

  export default AddPhone