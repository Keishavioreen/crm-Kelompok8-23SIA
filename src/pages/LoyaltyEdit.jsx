import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const LoyaltyEdit = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const initialSettings = location.state?.initialSettings;

  if (!initialSettings) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
        <h2 className="text-2xl font-bold text-gray-800">Error</h2>
        <p className="text-gray-600 mt-2">No settings provided.</p>
        <button
          onClick={() => navigate("/Loyalty")}
          className="mt-4 px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 shadow"
        >
          Back to Loyalty Page
        </button>
      </div>
    );
  }

  const [loyaltySettings, setLoyaltySettings] = useState(initialSettings);

  const handleSave = () => {
    console.log("Saved Settings:", loyaltySettings);
    navigate("/Loyalty");
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="w-full max-w-3xl bg-white p-6 rounded shadow">
        <h2 className="text-xl font-bold text-gray-800 mb-6">Edit Loyalty Settings</h2>
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">Point Per Amount</label>
          <input
            type="number"
            value={loyaltySettings.pointPerAmount}
            onChange={(e) =>
              setLoyaltySettings({ ...loyaltySettings, pointPerAmount: Number(e.target.value) })
            }
            className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        {loyaltySettings.levels.map((level, index) => (
          <div key={index} className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {level.name} Discount (%)
            </label>
            <input
              type="number"
              value={level.discount}
              onChange={(e) => {
                const newLevels = [...loyaltySettings.levels];
                newLevels[index].discount = Number(e.target.value);
                setLoyaltySettings({ ...loyaltySettings, levels: newLevels });
              }}
              className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500"
            />
            <label className="block text-sm font-medium text-gray-700 mt-4">Threshold (Points)</label>
            <input
              type="number"
              value={level.threshold}
              onChange={(e) => {
                const newLevels = [...loyaltySettings.levels];
                newLevels[index].threshold = Number(e.target.value);
                setLoyaltySettings({ ...loyaltySettings, levels: newLevels });
              }}
              className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        ))}
        <div className="flex justify-end">
          <button
            onClick={() => navigate("/Loyalty")}
            className="px-6 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400 shadow mr-4"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 shadow"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoyaltyEdit;
