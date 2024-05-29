import react from "react";

function Input(props) {
  return(
    <input className={props.className} type={props.type} value={props.value} onChange={props.onChange} placeholder={props.place} />
  )
}

export default Input;
