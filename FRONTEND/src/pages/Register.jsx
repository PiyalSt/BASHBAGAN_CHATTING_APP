import React, { useState } from "react";
import assets from "../assets/assets";
import { FaFacebook } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router";
import { HiOutlineEye, HiOutlineEyeOff } from "react-icons/hi";
import axios from "axios";

const Register = () => {
  const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const navigate = useNavigate();

  const [user, setUser] = useState("");
  const [userError, setUserError] = useState(false);
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSignin = async () => {
    if (!user) {
      toast.error("Please enter your user name.");
      setUserError(true);
      return;
    }
    if (!email) {
      toast.error("Please enter your email address.");
      setEmailError(true);
      return;
    }
    if (!regex.test(email)) {
      toast.error("Please enter a valid email address.");
      setEmailError(true);
      return;
    }
    if (!password) {
      toast.error("Please enter your password.");
      setPasswordError(true);
      return;
    }

    // send data to mongodb database
    try {
      await axios.post('http://localhost:4000/api/v1/users', {
        username: user,
        email,
        password
      })
      toast.success("Login Successfully!");
      setTimeout(() => {
        navigate('/')
      }, 2000)
    } catch (error) {
      toast.error("User not create", error.response?.data?.message)
    }
  };

  return (
    <div className="w-full max-h-screen relative">
      <div className="w-full h-screen bg-linear-to-br from-gray-800 to-green-900"></div>

      <div className="w-[80%] md:w-2xl py-12 absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] bg-gray-900/10 rounded-md bg-clip-padding backdrop-blur-sm bg-opacity-10 border border-gray-800 shadow-2xl">
        <div>
          <div className="flex items-center justify-center gap-2">
            <div className="w-20">
              <img
                className="w-full h-full object-cover"
                src={assets.logoImage}
                alt=""
              />
            </div>
            <div>
              <h2 className="text-4xl font-bold text-white text-shadow-2xs">
                বাঁশবাগান
              </h2>
              <p className="text-base text-white text-shadow-2xs">
                Chatting Application Login
              </p>
            </div>
          </div>
          <div className="mt-8 md:mt-4 lg:mt-1">
            <div className="mx-12 space-y-4">
              <div className="w-full space-y-2">
                <p className="text-gray-100">User Name</p>
                <input
                  onChange={(e) => {
                    setUser(e.target.value);
                    setUserError(false);
                  }}
                  value={user}
                  className={`w-full py-3 px-6 outline-0 border rounded-md ${userError ? "border-red-500 text-red-500" : "border-gray-200 text-gray-200"}`}
                  type="text"
                  placeholder="User Name"
                />
              </div>
              <div className="w-full space-y-2">
                <p className="text-gray-100">Email Address</p>
                <input
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setEmailError(false);
                  }}
                  value={email}
                  className={`w-full py-3 px-6 outline-0 border rounded-md ${emailError ? "border-red-500 text-red-500" : "border-gray-200 text-gray-200"}`}
                  type="email"
                  placeholder="Email Address"
                />
              </div>
              <div className="w-full space-y-2">
                <p className="text-gray-100">Password</p>
                <div className="relative">
                  <input
                    onChange={(e) => {
                      setPassword(e.target.value);
                      setPasswordError(false);
                    }}
                    value={password}
                    className={`w-full py-3 px-6 outline-0 border rounded-md ${passwordError ? "border-red-500 text-red-500" : "border-gray-200 text-gray-200"}`}
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter password"
                  />
                  {showPassword ? (
                    <HiOutlineEye
                      onClick={() => setShowPassword(!showPassword)}
                      size={22}
                      className="absolute top-[50%] translate-y-[-50%] right-6 text-gray-300 hover:text-gray-400 cursor-pointer duration-300 active:scale-95"
                    />
                  ) : (
                    <HiOutlineEyeOff
                      onClick={() => setShowPassword(!showPassword)}
                      size={22}
                      className="absolute top-[50%] translate-y-[-50%] right-6 text-gray-300 hover:text-gray-400 cursor-pointer duration-300 active:scale-95"
                    />
                  )}
                </div>
              </div>
              <div className="mt-10 space-y-1">
                <button
                  onClick={handleSignin}
                  className="w-full py-3 border border-gray-100 rounded-full text-white font-semibold cursor-pointer active:scale-95 transition-all duration-300 active:border-gray-400 active:text-gray-400"
                >
                  Sign In
                </button>
                <p className="text-gray-200 text-center">
                  You have already an account?{" "}
                  <Link to={"/login"}>
                    <span className="hover:underline cursor-pointer">
                      Sign in
                    </span>
                  </Link>
                </p>
              </div>
              <div>
                <h4 className="text-center text-white mb-4">Continue with: </h4>
                <div className="flex justify-center gap-4">
                  <button className="flex items-center gap-2 border py-2 px-6 rounded-md text-blue-600 cursor-pointer active:scale-95 transition-all duration-300">
                    <FaFacebook size={22} />
                    Facebook
                  </button>
                  <button className="flex items-center gap-2 border py-2 px-6 rounded-md text-white cursor-pointer active:scale-95 transition-all duration-300">
                    <FcGoogle size={22} />
                    Facebook
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
