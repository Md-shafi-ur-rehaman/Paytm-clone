import react,{useState} from "react";
import {Link, useNavigate} from "react-router-dom"
import {Button, InputField} from "../components/index";
import axios from "axios";
import {useAuth} from '../Hooks/useAuth';


function Signin() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const {user, login} = useAuth();

  const handleClick = async (e)=> {
    e.preventDefault()
    console.log("login form submiting..")
    try{
      const response = await axios.post("http://localhost:3000/api/v1/user/login",{
        username,
        password
      });
      console.log(response.data.token);
      localStorage.setItem("token", response.data.token);
      navigate("/dashboard");
    }
    catch(err){
      console.log(err);
    }
  }

  return(
    <div className="w-[100vw] h-[100vh] bg-bgcolor flex justify-center items-center">
      <div className="shadow w-max-[260px] p-3 rounded-md bg-white">
        <h1 className="text-center text-xl font-bold">Login</h1>
        <p className="text-center">Enter your details for Login</p>
        <form onSubmit={handleClick} className="flex-col justify-center items-center p-2">

        <InputField label={"Email"} className="w-full p-1 rounded-md border" name={"username"} type={"text"} value={username} onChange={(e)=> setUsername(e.target.value)} place={"Johndoe@example.com"}  />
        <InputField label={"Password"} className="w-full p-1 rounded-md border" name={"password"} type={"password"} value={password} onChange={(e)=> setPassword(e.target.value)} place={""}  />
        <InputField  className="w-full p-1 rounded-md bg-[#002E6E] text-white my-2 cursor-pointer" type={"submit"} value={"Login"} />

          <p className="text-center my-1">Already Have an account?<Link to="/signup" className="underline font-bold">Signup</Link></p>
        </form>
      </div>
    </div>
  )
}

export default Signin;
