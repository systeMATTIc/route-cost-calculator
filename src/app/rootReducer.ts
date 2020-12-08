import { combineReducers } from "@reduxjs/toolkit";
import routingReducer from "../features/routingInfo/routingInfoSlice";
import * as routeSlice from "../features/routingInfo/routingInfoSlice";

const rootReducer = combineReducers({
  routingInfo: routingReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;

export const getDistanceBetweenPoints = (state: RootState) =>
  routeSlice.getDistanceBetweenPoints(state.routingInfo);

export const getRouteCost = (state: RootState) =>
  routeSlice.getRouteCost(state.routingInfo);

export const getRoutingGeometry = (state: RootState) =>
  routeSlice.getRoutingGeometry(state.routingInfo);
