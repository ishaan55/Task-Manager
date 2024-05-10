import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Login() {
  const navigate = useNavigate();
  const { user, handleUserLogin } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, []);

  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <div className="bg-[#2f2e2e] px-4 py-3 gap-[3.5rem] max-w-[23rem] w-full h-[500px] rounded-lg shadow-md flex flex-col items-center ">
        <div className="text-center mt-10">
          <h1 className="text-white text-lg font-bold">Welcome Back</h1>
          <h3 className="text-gray-100 text-sm">Please enter your details</h3>
        </div>
        <form className="w-full flex flex-col items-center">
          <div className="w-full my-4">
            <label className="text-white">Email</label>
            <input
              type="text"
              className="w-full px-3 py-2 rounded-md bg-[#323232] outline-none text-white"
              placeholder="Enter your email.."
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
          </div>
          <div className="w-full my-4">
            <label className="text-white">Password</label>
            <input
              type="password"
              className="w-full px-3 py-2 rounded-md bg-[#323232] outline-none text-white"
              placeholder="Enter your password.."
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </div>
          <button
            className="bg-[#e77579] px-3 py-2 rounded-md mt-5"
            onClick={(e) => {
              handleUserLogin(e, email, password);
            }}
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
