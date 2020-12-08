import React, { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { clearRoutingInfoState } from "../features/routingInfo/routingInfoSlice";

import Map from "../components/Map";
import Portal from "../components/Portal";
import AddressForm from "../features/routingInfo/AddressForm";
import { MapCenter } from "../utils/declarations";
import {
  getDistanceBetweenPoints,
  getRouteCost,
  RootState,
} from "../app/rootReducer";
import MenuButton from "../components/MenuButton";

const AddressBasedCalculator = () => {
  const dispatch = useDispatch();

  const distance = useSelector(getDistanceBetweenPoints);
  const routeCost = useSelector(getRouteCost);
  const error = useSelector((state: RootState) => state.routingInfo.error);

  const [mapCenter, setMapCenter] = useState<MapCenter>();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const _getMapCenter = () => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setMapCenter({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      },
      (error) => {
        setMapCenter({ latitude: 37.7577, longitude: -122.4376 });
      }
    );
  };

  useEffect(() => {
    _getMapCenter();

    return () => {
      dispatch(clearRoutingInfoState());
    };
  }, [dispatch]);

  return (
    <>
      {distance > 0 || routeCost > 0 ? (
        <Portal>
          <div className="absolute bottom-0 w-screen py-3 bg-white shadow-lg text-xl flex items-center justify-center space-x-10">
            <p>Distance: {distance} km</p>
            <p>Route Cost: £{routeCost}</p>
            <button
              onClick={() => {
                dispatch(clearRoutingInfoState());
              }}
              className="absolute right-0 py-3 px-6 bg-blue-400 hover:bg-blue-500 text-white focus:outline-none"
            >
              X
            </button>
          </div>
        </Portal>
      ) : null}

      {error ? (
        <Portal>
          <div className="absolute bottom-0 w-screen py-3 bg-white shadow-lg text-xl flex items-center justify-center space-x-10">
            <p className="text-red-600">{error}</p>
            <button
              onClick={() => {
                dispatch(clearRoutingInfoState());
              }}
              className="absolute right-0 py-3 px-6 bg-blue-400 hover:bg-blue-500 text-white focus:outline-none"
            >
              X
            </button>
          </div>
        </Portal>
      ) : null}
      <div className="flex xl:w-5/6 lg:w-11/12 w-full h-5/6 bg-white shadow-2xl relative md:static">
        {isSidebarOpen ? (
          <div className="lg:hidden w-64 absolute z-40 left-0 top-0 h-full">
            <AddressForm />
          </div>
        ) : null}
        <div className="hidden lg:block lg:w-1/4 xl:1/5">
          <AddressForm />
        </div>
        <div className="w-full lg:w-3/4 xl:w-4/5">
          {mapCenter ? <Map {...mapCenter} /> : null}
          <MenuButton
            menuIsOpen={isSidebarOpen}
            toggleMenu={() => {
              setIsSidebarOpen((s) => !s);
            }}
          />
        </div>
      </div>
    </>
  );
};

export default AddressBasedCalculator;
