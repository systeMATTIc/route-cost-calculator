import { createSlice, Dispatch } from "@reduxjs/toolkit";
import {
  getRoutingInfoFromAddresses,
  getRoutingInformation,
} from "../../api/osrm";
import { DistanceCoordinates, TransportMode } from "../../utils/declarations";

interface RoutingInfoState {
  routeInfo: {} | null;
  loading: boolean;
  error: null | any;
  currentTransportMode: TransportMode | {} | null;
}

const initialState: RoutingInfoState = {
  routeInfo: {},
  loading: false,
  error: null,
  currentTransportMode: {},
};

const routingInfoSlice = createSlice({
  name: "routingInfo",
  initialState,
  reducers: {
    getRouteInfoStart(state) {
      state.loading = true;
      state.error = null;
    },
    getRouteInfoSuccess(state, action) {
      const { routingInfo, transportMode } = action.payload;
      state.loading = false;
      state.routeInfo = routingInfo;
      state.currentTransportMode = transportMode;
      state.error = null;
    },
    getRouteInfoFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    clearRoutingInfoState(state) {
      state.routeInfo = null;
      state.error = null;
      state.loading = false;
      state.currentTransportMode = {};
    },
  },
});

export const {
  getRouteInfoStart,
  getRouteInfoSuccess,
  getRouteInfoFailure,
  clearRoutingInfoState,
} = routingInfoSlice.actions;

export default routingInfoSlice.reducer;

export const fetchRoutingInfo = (
  distanceCoordinate: DistanceCoordinates,
  transportMode: TransportMode
) => async (dispatch: Dispatch) => {
  try {
    dispatch(getRouteInfoStart());
    const routingInfo = await getRoutingInformation(distanceCoordinate);
    dispatch(getRouteInfoSuccess({ routingInfo, transportMode }));
  } catch (error) {
    dispatch(getRouteInfoFailure(error.message));
  }
};

export const fetchRoutingInfoFromAddresses = (
  startAddress: string,
  destinationAddress: string,
  transportMode: TransportMode
) => async (dispatch: Dispatch) => {
  try {
    dispatch(getRouteInfoStart());
    const routingInfo = await getRoutingInfoFromAddresses(
      startAddress,
      destinationAddress
    );
    dispatch(getRouteInfoSuccess({ routingInfo, transportMode }));
  } catch (error) {
    dispatch(getRouteInfoFailure(error.message));
  }
};

export const getRouteCost = (state: RoutingInfoState) => {
  const distance = getDistanceBetweenPoints(state);
  const transportMode = state.currentTransportMode as TransportMode;
  return Number(transportMode.rate * distance);
};

export const getDistanceBetweenPoints = (state: RoutingInfoState) => {
  const routeInfo = state.routeInfo as any;
  if (!routeInfo || !routeInfo?.routes) return 0;
  return Number(routeInfo?.routes[0]?.distance) / 1000;
};

export const getRoutingGeometry = (state: RoutingInfoState) => {
  const routeInfo = state.routeInfo as any;
  if (!routeInfo || !routeInfo?.routes) return {};
  return routeInfo?.routes[0]?.geometry;
};
