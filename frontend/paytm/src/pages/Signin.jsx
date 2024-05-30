import react,{useState} from "react";
import {Link} from "react-router-dom"
import {Button, Input} from "../components/index";
import axios from "axios";

function Signin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleClick = async (e)=> {
    e.preventDefault()
    const data = {
      username,
      password
    }
    if(!data) return;
    console.log("login form submiting..")
    try{
      const response = await axios.post("http://localhost:3000/api/v1/user/login",{
        username,
        password
      });
      localStorage.setItem("token", response.data.token);
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
        <form className="flex-col justify-center items-center p-2">

          <div className="mb-1">
            <label className="">Email</label>
            <Input className="w-full p-1 rounded-md border" type={"text"} value={username} onChange={(e)=> setUsername(e.target.value)} place={"Johndoe@example.com"}  />
          </div>
          <div className="mb-1">
            <label>Password</label>
            <Input className="w-full p-1 rounded-md border" type={"password"} value={password} onChange={(e)=> setPassword(e.target.value)} place={""}  />
          </div>

          <Button className="w-full p-1 rounded-md bg-[#002E6E] text-white my-2" type={"submit"} value={"Login"} onClick={handleClick}/>
          <p className="text-center my-1">Already Have an account?<Link to="/signup" className="underline font-bold">Signup</Link></p>
        </form>
      </div>
    </div>
  )
}

export default Signin;
