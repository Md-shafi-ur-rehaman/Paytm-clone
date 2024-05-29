import react, {useState} from "react";
import {Link} from "react-router-dom"
import {Button, Input} from "../components/index";


const Signup = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [mobileNo, setMobileNo] = useState();
  const [firstname, setfirstname] = useState('');
  const [lastname, setlastname] = useState('');

  const handleClick = async (e)=> {
    e.preventDefault()
    console.log("form submiting..");
    const signupObj = {
      username,
      password,
      firstname,
      lastname,
      mobileNo
    }

    try{
      const response = await fetch('http:localhost:3000/api/v1/user/signup',{
        method:'POST',
        headers:{"Content-Type": "application/json"},
        body:JSON.stringify(signupObj)
      });
      console.log(response.json());
    }
    catch(err){

    }
  }

  return(
    <div className="w-[100vw] h-[100vh] bg-bgcolor flex justify-center items-center pt-[90px]">
      <div className="shadow w-max-[260px] p-3 rounded-md bg-white">
        <h1 className="text-center text-xl font-bold">SignUp</h1>
        <p className="text-center">Enter your details for Signup</p>
        <form className="flex-col justify-center items-center p-2">
          <div className="my-1">
            <label>Firstname</label>
            <Input className="w-full p-1 rounded-md border" type={"text"} value={firstname} onChange={(e)=> setfirstname(e.target.value)} place={"John"}  />
          </div>
          <div className="mb-1">
            <label>Lastname</label>
            <Input className="w-full p-1 rounded-md border" type={"text"} value={lastname} onChange={(e)=> setlastname(e.target.value)} place={"doe"}  />
          </div>
          <div className="mb-1">
            <label>Mobile number</label>
            <Input className="w-full p-1 rounded-md border" type={"number"} value={mobileNo} onChange={(e)=> setMobileNo(e.target.value)} place={"9999-888-777"}  />
          </div>
          <div className="mb-1">
            <label className="">Email</label>
            <Input className="w-full p-1 rounded-md border" type={"text"} value={username} onChange={(e)=> setUsername(e.target.value)} place={"Johndoe@example.com"}  />
          </div>
          <div className="mb-1">
            <label>Password</label>
            <Input className="w-full p-1 rounded-md border" type={"password"} value={password} onChange={(e)=> setPassword(e.target.value)} place={""}  />
          </div>

          <Button className="w-full p-1 rounded-md bg-[#002E6E] text-white my-2" type={"submit"} value={"Submit"} onClick={handleClick}/>
          <p className="text-center my-1">Already Have an account?<Link to="/signin" className="underline font-bold">Login</Link></p>
        </form>
      </div>
    </div>
  )
}

export default Signup;