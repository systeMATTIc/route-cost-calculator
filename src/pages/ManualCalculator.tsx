import React, { useState } from "react";

const ManualCalculator = () => {
  const [distance, setDistance] = useState(0);
  const [rate, setRate] = useState(0.01);
  const [routeCost, setRouteCost] = useState(0);

  const handleDistanceChange = (e: React.FormEvent<HTMLInputElement>) => {
    const providedDistance = Number(e.currentTarget.value);
    setDistance(providedDistance);
    setRouteCost(providedDistance * rate);
  };

  const handleRateChange = (e: React.FormEvent<HTMLInputElement>) => {
    const providedRate = Number(e.currentTarget.value);
    setRate(providedRate);
    setRouteCost(distance * providedRate);
  };

  return (
    <div className="flex bg-white py-8 shadow-2xl w-11/12 md:w-4/5 lg:w-3/4 xl:w-1/2 h-1/2">
      <div className="w-1/2 flex flex-col items-center border-r border-gray-400">
        <div className="flex flex-col space-y-2 w-3/4">
          <label htmlFor="origin_lat" className="text-md text-gray-400">
            Distance (km)
          </label>
          <input
            name="distance"
            type="number"
            min="0"
            value={distance}
            onInput={handleDistanceChange}
            className="px-4 py-2 focus:outline-none focus:border-red-400 border border-gray-300"
          />
        </div>

        <div className="mt-6 flex flex-col space-y-2 w-3/4">
          <label htmlFor="origin_lat" className="text-md text-gray-400">
            Rate (£/km)
          </label>
          <input
            name="rate"
            type="number"
            value={rate}
            onInput={handleRateChange}
            min="0.01"
            className="px-4 py-2 focus:outline-none focus:border-red-400 border border-gray-300"
          />
        </div>
      </div>

      <div className="w-1/2 flex flex-col items-center space-y-8 text-center">
        <h1 className="text-3xl font-semibold">Route Cost</h1>
        <p className="px-6 py-4 text-lg font-semibold border border-red-400">
          £{routeCost}
        </p>
      </div>
    </div>
  );
};

export default ManualCalculator;
