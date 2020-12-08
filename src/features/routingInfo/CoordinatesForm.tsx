import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";

import { fetchRoutingInfo } from "./routingInfoSlice";
import { RootState } from "../../app/rootReducer";
import {
  DistanceCalculationParams,
  TransportMode,
} from "../../utils/declarations";

const transportModes: TransportMode[] = [
  { name: "Truck", rate: 0.5 },
  { name: "Van", rate: 0.25 },
  { name: "Bike", rate: 0.15 },
];

const CoordinatesForm = () => {
  const dispatch = useDispatch();

  const loading = useSelector((state: RootState) => state.routingInfo.loading);

  const { register, handleSubmit } = useForm<DistanceCalculationParams>();

  const submit = (data: DistanceCalculationParams) => {
    const { vehicle_type, ...distanceCoordinates } = data;

    const transportMode = transportModes.find(
      (mode) => mode.name === vehicle_type
    ) as TransportMode;

    dispatch(fetchRoutingInfo(distanceCoordinates, transportMode));
  };

  return (
    <form
      onSubmit={handleSubmit(submit)}
      className="p-5 h-full w-full flex flex-col bg-gray-50 space-y-6 overflow-auto"
    >
      <h2 className="text-xl text-gray-400 font-semibold mb-2">
        Calculate Route Cost
      </h2>

      <div className="w-full flex flex-col space-y-1 bg-white shadow-lg">
        <div className="p-4 space-y-4">
          <div className="flex flex-col space-y-2">
            <label htmlFor="origin_lat" className="text-sm text-gray-400">
              Vehicle Type
            </label>
            <select
              name="vehicle_type"
              className="px-2 py-1 focus:outline-none focus:border-red-400 border border-gray-300"
              ref={register({ required: true })}
            >
              <option value=""></option>
              {transportModes.map((mode) => (
                <option key={mode.name} value={mode.name}>
                  {mode.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="w-full flex flex-col space-y-1 bg-white shadow-lg">
        <p className="text-lg text-white font-bold py-2 px-4 bg-red-300">
          Origin
        </p>

        <div className="p-4 space-y-4">
          <div className="flex flex-col space-y-2">
            <label htmlFor="origin_lat" className="text-sm text-gray-400">
              Latitude
            </label>
            <input
              name="origin_lat"
              type="number"
              step="0.000001"
              className="px-2 py-1 focus:outline-none focus:border-red-400 border border-gray-300"
              ref={register({ min: -90, max: 90, required: true })}
            />
          </div>

          <div className="flex flex-col space-y-2">
            <label htmlFor="origin_lat" className="text-sm text-gray-400">
              Longitude
            </label>
            <input
              name="origin_long"
              type="number"
              step="0.000001"
              className="px-2 py-1 focus:outline-none focus:border-red-400 border border-gray-300"
              ref={register({ min: -180, max: 180, required: true })}
            />
          </div>
        </div>
      </div>

      <div className="w-full flex flex-col space-y-1 bg-white shadow-lg">
        <p className="text-lg text-white font-bold py-2 px-4 bg-red-300">
          Destination
        </p>

        <div className="p-4 space-y-4">
          <div className="flex flex-col space-y-2">
            <label htmlFor="origin_lat" className="text-sm text-gray-400">
              Latitude
            </label>
            <input
              name="destination_lat"
              type="number"
              step="0.000001"
              className="px-2 py-1 focus:outline-none focus:border-red-400 border border-gray-300"
              ref={register({ min: -90, max: 90, required: true })}
            />
          </div>

          <div className="flex flex-col space-y-2">
            <label htmlFor="origin_lat" className="text-sm text-gray-400">
              Longitude
            </label>
            <input
              name="destination_long"
              type="number"
              step="0.000001"
              className="px-2 py-1 focus:outline-none focus:border-red-400 border border-gray-300"
              ref={register({ min: -180, max: 180, required: true })}
            />
          </div>
        </div>
      </div>

      <button
        type="submit"
        className="self-end px-4 py-2 text-white bg-gray-400 hover:bg-gray-600 focus:outline-none shadow-lg"
      >
        {loading ? "Please wait..." : "Get Cost"}
      </button>
    </form>
  );
};

export default CoordinatesForm;
