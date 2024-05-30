import react from "react";

function Input(props) {
  return(
    <input className={props.className} name={props.name} type={props.type} value={props.value} onChange={props.onChange} placeholder={props.place} />
  )
}

export default Input;
