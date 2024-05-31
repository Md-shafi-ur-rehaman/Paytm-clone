import react,{useState, useEffect, useContext} from "react";
import {InputField, Button} from "../components/index";
import {Link } from "react-router-dom"
import {useAuth} from '../Hooks/useAuth';
import axios from "axios"



function Dashboard() {
  const [mobileNo, setMobileNo] = useState();
  const [searchedUser, setSearchedUser] = useState('');
  const [amount, setAmount] = useState();
  const [passcode, setPasscode] = useState();
  const [balance, setBalance] = useState(null);

  const fetchBalance = async () =>{
    try{
        const response = await axios.get("http://localhost:3000/api/v1/account/balance",{
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token")
          }
        });
        setBalance(response.data.balance.toFixed(2));
    }
    catch(err){
      console.log(err);
    }
  }
  fetchBalance();

  // const {user, logout} = useAuth();
  console.log(balance);


  useEffect(()=>{
    if(!mobileNo) return;
    const mobileNoString = mobileNo.toString();
    if(mobileNoString.length < 10) {
      return
    };

    //begin your code here..

  },[mobileNo]);

  function handleSearchedUserClick(){

  }
  function handleAmountSubmit(){

  }
  function handlePasscodeSubmit(){

  }



  return(
    <div className="w-full h-full pt-[90px] lg:px-40">

      <div className="w-full h-[50px] flex  items-center ">
        <h1 className="pl-4 font-bold text-xl">Balance(rs): {balance}</h1>
      </div>

      <div className="flex flex-wrap justify-center gap-3 w-full h-full p-4">

        <div className="lg:w-[58%] w-[100%] border rounded-md shadow">
          <h1 className="text-center text-xl my-3">Send money</h1>
          <div className=" px-4 py-2">

            <InputField className="w-full p-1 rounded-md border focus:border-sky-500" name={"mobileNo"} type={"text"} value={mobileNo} onChange={(e)=> setMobileNo(e.target.value)} place={"Search by phone number"}  />

            <div onClick={handleSearchedUserClick} className=" flex justify-start items-center my-4 cursor-pointer rounded ease-in duration-200	 hover:bg-dblue/10 ">
              <div>
                <div className="rounded-full bg-gray-200 w-[35px] h-[35px] flex justify-center items-center cursor-pointer bg-lblue	m-1">U</div>
              </div>
              <div className="mx-3">
                <h1>User name</h1>
              </div>
            </div>

          </div>
        </div>

        <div className="lg:w-[40%] w-[100%] border rounded-md shadow">
          <h1 className="text-center text-xl my-3">Transaction</h1>
          <div className=" px-4">
            <div className=" flex justify-start items-center my-3 cursor-pointer rounded ease-in duration-200	 hover:bg-dblue/10 ">
              <div>
                <div className="rounded-full bg-gray-200 w-[35px] h-[35px] flex justify-center items-center cursor-pointer bg-lblue	m-1">U</div>
              </div>
              <div className="mx-3">
                <h1>5000</h1>
              </div>
            </div>
            <div className=" flex justify-start items-center my-3 cursor-pointer rounded ease-in duration-200	 hover:bg-dblue/10 ">
              <div>
                <div className="rounded-full bg-gray-200 w-[35px] h-[35px] flex justify-center items-center cursor-pointer bg-lblue	m-1">IN</div>
              </div>
              <div className="mx-3">
                <h1>5000</h1>
              </div>
            </div>
            <div className="flex justify-start items-center my-3 cursor-pointer rounded ease-in duration-200	 hover:bg-dblue/10 ">
              <div>
                <div className="rounded-full bg-gray-200 w-[35px] h-[35px] flex justify-center items-center cursor-pointer bg-lblue	m-1">IN</div>
              </div>
              <div className="mx-3">
                <h1>5000</h1>
              </div>
            </div>
          </div>
        </div>

      </div>

      <div className="">
        <div className="w-[320px] border rounded-md">
          <h1 className="text-center text-xl mt-3 mb-1">Enter Amount</h1>
          <div className=" px-4 py-2">
            <h1 className="mb-1 ml-1">To:</h1>
            <div className=" flex justify-start items-center mb-4  ">
              <div>
                <div className="rounded-full bg-gray-200 w-[35px] h-[35px] flex justify-center items-center cursor-pointer bg-lblue	m-1">U</div>
              </div>
              <div className="mx-3">
                <h1>User name</h1>
              </div>
            </div>
            <form onSubmit={handleAmountSubmit}>
              <InputField type={"number"} value={amount} onChange={(e) => setAmount(e.target.value)} className="w-full p-1 mb-3 rounded-md border focus:border-sky-500" place={"Enter Amount"} />
              <Button type={"submit"} value={"Send"} onClick={handleAmountSubmit} className="w-full p-1 rounded-md bg-[#002E6E] text-white my-2"  />
            </form>
          </div>
        </div>
      </div>

      <div className="">
        <div className="w-[320px] border rounded-md">
          <h1 className="text-center text-xl mt-3 mb-1">Enter your passcode</h1>
          <div className=" px-4 py-2">
            <form onSubmit={handlePasscodeSubmit}>
              <InputField type={"number"} value={passcode} onChange={(e)=> setPasscode(e.target.value)} className="w-full p-1 mb-3 rounded-md border focus:border-sky-500" place={"Enter Passcode"} />
              <Button type={"submit"} value={"Send"} onClick={handlePasscodeSubmit} className="w-full p-1 rounded-md bg-[#002E6E] text-white my-2"  />
            </form>
          </div>
        </div>
      </div>

    </div>
  )
}

export default Dashboard;
