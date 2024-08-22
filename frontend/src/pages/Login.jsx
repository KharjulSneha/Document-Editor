// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import logo from "../images/logo.png";
import { MdMarkEmailUnread } from "react-icons/md";
import { IoMdLock } from "react-icons/io";
import { IoEyeSharp } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import loginRight from "../images/loginRight.png";
import { api_base_url } from "../Helper";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const login = (e) => {
    e.preventDefault();
    fetch(`${api_base_url}login`, {
      mode: "cors",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: pwd,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success === true) {
          localStorage.setItem("token", data.token);
          localStorage.setItem("isLoggedIn", true);
          localStorage.setItem("userId", data.userId);
          setTimeout(() => {
            navigate("/Home");
          }, 100);
        } else {
          setError(data.message);
        }
      });
  };

  return (
    <>
      <div className="flex overflow-hidden items-center w-screen justify-center flex-col h-screen bg-[#F0F0F0]">
        <div className="flex items-center w-full">
          <div className="left flex-col ml-[100px] w-[30%]">
            <img src={logo} alt="" />
            <form onSubmit={login} className="pl-3 mt-5 " action="">
              <div className="inputCon">
                <p className="text-[14px] text-[#808080]">Email</p>
                <div className="inputBox w-[100%]">
                  <i>
                    <MdMarkEmailUnread />
                  </i>
                  <input
                    onChange={(e) => {
                      setEmail(e.target.value);
                    }}
                    value={email}
                    type="email"
                    placeholder="Email"
                    id="Email"
                    name="Email"
                    required
                  />
                </div>
              </div>

              <div className="inputCon">
                <p className="text-[14px] text-[#808080]">Password</p>
                <div className="inputBox w-[100%]">
                  <i>
                    <IoMdLock />
                  </i>
                  <input
                    onChange={(e) => {
                      setPwd(e.target.value);
                    }}
                    value={pwd}
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    id="Password"
                    name="Password"
                    required
                  />
                  <i
                    className="cursor-pointer !mr-3 !text-[25px]"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <IoEyeSharp /> : <IoEyeSharp />}
                  </i>
                </div>
              </div>

              <p className="text-red-500 text-[14px] my-2">{error}</p>

              <p>
                Dont have an account ?{" "}
                <Link to="/signUp" className="text-blue-500">
                  Sign Up
                </Link>
              </p>
              <button className="p-[10px] bg-green-500 transition-all hover:bg-green-600 text-white rounded-lg w-full border-0 mt-3">
                Login
              </button>
            </form>
          </div>
          <div className="right flex items-end justify-end">
            <img className="w-[35vw]" src={loginRight} alt="" />
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
