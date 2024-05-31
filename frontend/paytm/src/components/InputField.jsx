

export default function InputField(props){

  return(
    <div className="my-1">
      <label>{props.label}</label>
      <input className={props.className} name={props.name} type={props.type} value={props.value} onChange={props.onChange} required placeholder={props.place} />
    </div>
  )
}
