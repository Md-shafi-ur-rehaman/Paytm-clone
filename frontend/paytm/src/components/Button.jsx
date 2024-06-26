import react from "react";

function Button(props) {
  return(
    <button className={props.className} type={props.type} onClick={props.onClick}>{props.value}</button>
  )
}

export default Button;
