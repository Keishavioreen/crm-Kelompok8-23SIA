import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    address: "",
    birthDate: "",
    gender: "",
  });
  const [error, setError] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Registered User:", formData);
    navigate("/signin");
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-50 to-blue-100 flex items-center justify-center py-12">
      <div className="flex flex-col-reverse md:flex-row bg-white rounded-2xl shadow-xl overflow-hidden w-full max-w-5xl">
        <div className="md:w-1/2 p-8 flex flex-col justify-center">
           <div className="flex items-center gap-6 mb-6">
            <img
              className="block w-35 h-auto"
              src="/logo2.png" // let Vite handle public folder asset
              alt="logo"
            />
          </div>
          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="fullName" className="block text-sm font-medium text-gray-600 mb-2">
                Full Name
              </label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                value={formData.fullName}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-tosca focus:outline-none"
                placeholder="Enter your full name"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-600 mb-2">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-tosca focus:outline-none"
                placeholder="Enter your email"
              />
            </div>
            <div>
              <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-600 mb-2">
                Phone Number
              </label>
              <input
                type="text"
                id="phoneNumber"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-tosca focus:outline-none"
                placeholder="Enter your phone number"
              />
            </div>
            <div>
              <label htmlFor="address" className="block text-sm font-medium text-gray-600 mb-2">
                Address
              </label>
              <input
                type="text"
                id="address"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-tosca focus:outline-none"
                placeholder="Enter your address"
              />
            </div>
            <div>
              <label htmlFor="birthDate" className="block text-sm font-medium text-gray-600 mb-2">
                Date of Birth
              </label>
              <input
                type="date"
                id="birthDate"
                name="birthDate"
                value={formData.birthDate}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-tosca focus:outline-none"
              />
            </div>
            <div>
              <label htmlFor="gender" className="block text-sm font-medium text-gray-600 mb-2">
                Gender
              </label>
              <select
                id="gender"
                name="gender"
                value={formData.gender}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-tosca focus:outline-none"
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <button
              type="submit"
              className="w-full px-6 py-2 bg-tosca text-white font-semibold rounded-lg shadow-md hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-tosca"
            >
              Register
            </button>
          </form>
        </div>
        <div className="md:w-1/2  bg-tosca text-white flex items-center justify-center p-8">
          <div>
            <h2 className="text-3xl font-bold mb-4">Welcome!</h2>
            <p className="text-base mb-4">We're excited to have you join us.</p>
            <img
              src="/path-to-illustration.png"
              alt="Illustration"
              className="w-full max-w-xs mx-auto"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
