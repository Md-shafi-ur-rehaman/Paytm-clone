import react, {useState} from "react";
import {Link, useNavigate } from "react-router-dom"
import {Button, InputField} from "../components/index";
import axios from 'axios';



const Signup = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [mobileNo, setMobileNo] = useState('');
  const [firstname, setfirstname] = useState('');
  const [lastname, setlastname] = useState('');
  const [pin, setPin] = useState('');

  const handleSubmit = async (e)=> {
    e.preventDefault();
    console.log("form submiting..");

    if(!username || !password || !mobileNo || !firstname || !lastname || !pin){
      console.log("please enter all details!");
      return;
    }


    try{
      const response = await axios.post('http://localhost:3000/api/v1/user/signup',{
        username,
        password,
        firstname,
        lastname,
        mobileNo,
        pin
      });

      console.log(response);
      localStorage.setItem("token", response.data.token);
      navigate("/dashboard");

    }
    catch(err){
      console.log(err);
    }
  }

  return(
    <div className="w-[100vw] h-[100vh] bg-bgcolor flex justify-center items-center pt-[90px]">
      <div className="shadow w-max-[260px] p-3 rounded-md bg-white">
        <h1 className="text-center text-xl font-bold">SignUp</h1>
        <form onSubmit={handleSubmit} className="flex-col justify-center items-center p-2">

          <InputField label={"Firstname"} className="w-full p-1 rounded-md border" name={"firstname"} type={"text"} value={firstname} onChange={(e)=> setfirstname(e.target.value)} place={"John"}  />
          <InputField label={"Lastname"} className="w-full p-1 rounded-md border" name={"lastname"} type={"text"} value={lastname} onChange={(e)=> setlastname(e.target.value)} place={"doe"}  />
          <InputField label={"mobile number"} className="w-full p-1 rounded-md border" name={"mobileNo"} type={"text"} value={mobileNo} onChange={(e)=> setMobileNo(e.target.value)} place={"999-8888-999"}  />
          <InputField label={"Email"} className="w-full p-1 rounded-md border" name={"username"} type={"text"} value={username} onChange={(e)=> setUsername(e.target.value)} place={"Johndoe@example.com"}  />
          <InputField label={"Password"} className="w-full p-1 rounded-md border" name={"password"} type={"password"} value={password} onChange={(e)=> setPassword(e.target.value)} place={""}  />
          <InputField label={"Set Pin"} className="w-full p-1 rounded-md border" name={"pin"} type={"text"} value={pin} onChange={(e)=> setPin(e.target.value)} place={"8989"}  />
          <InputField className="w-full p-1 rounded-md bg-[#002E6E] text-white my-2 cursor-pointer" type={"submit"} value={"SignUp"} />

          <p className="text-center my-1">Already Have an account?<Link to="/signin" className="underline font-bold">Login</Link></p>
        </form>
      </div>
    </div>
  )
}

export default Signup;
