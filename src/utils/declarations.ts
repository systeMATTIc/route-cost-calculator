export interface TransportMode {
  name: string;
  rate: number;
}

export interface DistanceCoordinates {
  origin_lat: number;
  origin_long: number;
  destination_lat: number;
  destination_long: number;
}

export interface MapCenter {
  latitude: number;
  longitude: number;
}

export type DistanceCalculationParams = DistanceCoordinates & {
  vehicle_type: string;
};
