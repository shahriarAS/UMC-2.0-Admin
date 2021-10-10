import React from "react";
import { NavLink } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux";
import UMCReducer from "../redux/umcReducer";

function NavBar() {

  // Redux Dispatch
  const dispatch = useDispatch(UMCReducer);

  const UMCState = useSelector(state => state)

  const logOutFunc = () => {
    localStorage.removeItem("token")
    alert("You are logged out")
    dispatch({
      type: "logout_action"
    })
  }

  return (
    <header className="text-gray-400 bg-gray-900 body-font">
      <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
        <NavLink to="/" className="flex title-font font-medium items-center text-white mb-4 md:mb-0">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-10 h-10 text-white p-2 bg-indigo-500 rounded-full" viewBox="0 0 24 24">
            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
          </svg>
          <span className="ml-3 text-xl">UMC</span>
        </NavLink>
        <nav className="md:ml-auto flex flex-wrap items-center text-base justify-center">
          <NavLink activeStyle={{
            fontWeight: "bold"
          }} className="mr-5 hover:text-white" to="/courses">Courses</NavLink>
        </nav>

        {
          UMCState.auth.username ? (<button onClick={logOutFunc} className="inline-flex items-center bg-gray-800 border-0 py-1 px-3 focus:outline-none hover:bg-gray-700 rounded text-base mt-4 md:mt-0">Log Out
          </button>) : (
              <>
                <NavLink to="/signup"><button className="inline-flex items-center bg-gray-800 border-0 py-1 px-3 focus:outline-none hover:bg-gray-700 rounded text-base mt-4 mr-4 md:mt-0">Sign Up
            </button></NavLink>
                <NavLink to="/login"><button className="inline-flex items-center bg-gray-800 border-0 py-1 px-3 focus:outline-none hover:bg-gray-700 rounded text-base mt-4 md:mt-0">Log In
        </button>
                </NavLink>
              </>)
        }
      </div>
    </header>
  );
}

export default NavBar;
