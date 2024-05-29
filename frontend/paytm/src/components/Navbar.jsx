import {Link} from "react-router-dom"


 function Navbar(){
   return(
     <navbar className="w-full fixed h-[80px] bg-white flex justify-between items-center px-8 shadow">
        <div>
          <Link to="/" className="text-xl">Paytm</Link>
        </div>

        <div className=" flex justify-end items-center">
          <div className="mx-3">
            <h1>Hello, User</h1>
          </div>
          <div>
            <Link to="/dashboard"><div className="rounded-full bg-gray-200 w-[35px] h-[35px] flex justify-center items-center cursor-pointer	">U</div></Link>
          </div>
        </div>

     </navbar>
   )
 }
export default Navbar;
