import axios from "axios";
import { DistanceCoordinates } from "../utils/declarations";

const OSRM_BASE_URL: string = "http://router.project-osrm.org/route/v1/driving";
const MAPBOX_BASE_URL = "https://api.mapbox.com/geocoding/v5/mapbox.places";
const MAPBOX_ACCESS_TOKEN = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN ?? "";
const GEOCODE_COUNTRY_CODE =
  process.env.REACT_APP_GEOCODING_TARGET_COUNTRY_CODE ?? "";

export const getRoutingInformation = async (
  distanceCoordinates: DistanceCoordinates
) => {
  const {
    origin_lat,
    origin_long,
    destination_lat,
    destination_long,
  } = distanceCoordinates;

  const { data } = await axios.get(
    `${OSRM_BASE_URL}/${origin_long},${origin_lat};${destination_long},${destination_lat}?overview=full&geometries=geojson`
  );

  if (data.code !== "Ok") {
    throw new Error(data.message);
  }

  return data;
};

export const getRoutingInfoFromAddresses = async (
  start: string,
  destination: string
) => {
  const startAddressRequest = axios.get(
    `${MAPBOX_BASE_URL}/${start}.json?country=${GEOCODE_COUNTRY_CODE}&access_token=${MAPBOX_ACCESS_TOKEN}`
  );

  const destinationAddressRequest = axios.get(
    `${MAPBOX_BASE_URL}/${destination}.json?country=${GEOCODE_COUNTRY_CODE}&access_token=${MAPBOX_ACCESS_TOKEN}`
  );

  const response = await Promise.allSettled([
    startAddressRequest,
    destinationAddressRequest,
  ]);
  console.log(response);
  const startCoords = (response[0] as any)["value"]["data"]["features"][0][
    "geometry"
  ]["coordinates"];
  const destinationCoords = (response[1] as any)["value"]["data"][
    "features"
  ][0]["geometry"]["coordinates"];

  console.log(startCoords, destinationCoords);

  return await getRoutingInformation({
    origin_lat: startCoords[1],
    origin_long: startCoords[0],
    destination_long: destinationCoords[0],
    destination_lat: destinationCoords[1],
  });
};
