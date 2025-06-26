import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const LoyaltyPage = () => {
  const navigate = useNavigate();
  const [loyaltySettings, setLoyaltySettings] = useState({
    pointPerAmount: 10000,
    levels: [
      { name: "Gold", discount: 20, Start: 500 },
      { name: "Silver", discount: 10, Start: 300 },
      { name: "Platinum", discount: 30, Start: 700 },
    ],
  });

  const [customers, setCustomers] = useState([
    { id: "P5001", name: "Risa Wati", points: 115, history: "081122334455", level: "Gold" },
    { id: "P5002", name: "Yasmine", points: 211, history: "081122334455", level: "Platinum" },
    { id: "P5003", name: "Joko", points: 320, history: "081122334455", level: "Silver" },
  ]);

  const handleEditSettings = () => {
    navigate("/loyaltyedit", { state: { initialSettings: loyaltySettings } });
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Loyalty Settings Section */}
      <div className="bg-white rounded-lg shadow p-6 mb-6">
       <div className="bg-white rounded-lg shadow p-6 mb-6">
  <div>
    <h2 className="text-xl font-semibold text-gray-800">Loyalty Settings</h2>
    <p className="text-gray-600 mt-2">1 Point = Rp{loyaltySettings.pointPerAmount.toLocaleString()}</p>
    <ul className="mt-4 space-y-2">
      {loyaltySettings.levels.map((level, index) => (
        <li key={index} className="text-gray-700">
          <strong>{level.name}</strong>: {level.discount}% Discount (Start: {level.Start} points)
        </li>
      ))}
    </ul>
  </div>
  <div className="mt-6 flex justify-end">
    <button
      onClick={handleEditSettings}
      className="px-4 py-2 bg-blue-500 text-white font-medium rounded hover:bg-blue-600 shadow"
    >
      Edit Settings
    </button>
  </div>
</div>

      </div>

      {/* Customers Table Section */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex justify-between items-center mb-4">
          <input
            type="text"
            placeholder="Search customers..."
            className="w-1/3 px-4 py-2 border border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500"
          />
          <button className="px-4 py-2 bg-blue-500 text-white font-medium rounded hover:bg-blue-600 shadow">
            Filter
          </button>
        </div>
        <table className="w-full border-collapse border border-gray-200 text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="border border-gray-300 p-2 text-left">ID</th>
              <th className="border border-gray-300 p-2 text-left">Name</th>
              <th className="border border-gray-300 p-2 text-left">Points</th>
              <th className="border border-gray-300 p-2 text-left">History</th>
              <th className="border border-gray-300 p-2 text-left">Level</th>
              <th className="border border-gray-300 p-2 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {customers.map((customer, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="border border-gray-300 p-2">{customer.id}</td>
                <td className="border border-gray-300 p-2">{customer.name}</td>
                <td className="border border-gray-300 p-2">{customer.points}</td>
                <td className="border border-gray-300 p-2">{customer.history}</td>
                <td className="border border-gray-300 p-2">{customer.level}</td>
                <td className="border border-gray-300 p-2 text-center">
                  <button className="text-blue-500 hover:underline mr-2">Edit</button>
                  <button className="text-red-500 hover:underline">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LoyaltyPage;
