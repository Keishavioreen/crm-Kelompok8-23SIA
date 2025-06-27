import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Signin = () => {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (credentials.email === "keisha@gmail.com" && credentials.password === "password") {
      navigate("/");
    } else {
      setError("Invalid email or password");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="flex flex-col-reverse md:flex-row bg-white rounded-lg shadow-lg overflow-hidden w-full max-w-4xl">
        <div className="md:w-1/2 p-6 flex flex-col justify-center">
           <h2 className="text-4xl font-extrabold text-tosca  mb-4">Welcome Back!</h2>
         
          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={credentials.email}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={credentials.password}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="remember"
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="remember" className="ml-2 text-sm text-gray-600">
                  Remember Me
                </label>
              </div>
              <a href="#" className="text-sm text-tosca  hover:underline">
                Forgot Password?
              </a>
            </div>
            <button
              type="submit"
              className="w-full px-4 py-2 bg-tosca text-white font-medium rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500">
               
              Login Now
            </button>
          </form>
        
            <p>
              Don't have an account?{" "}
              <a href="/signup" className="text-tosca  hover:underline">
                Sign Up
              </a>
            </p>
          </div>

       
        <div className="md:w-1/2 bg-tosca flex items-center justify-center p-6">
          <img
            src="/path-to-illustration.png"
            alt="Illustration"
            className="max-h-80"
          />
        </div>
      </div>
     </div>
  );
};

export default Signin;
