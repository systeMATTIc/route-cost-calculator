import React, { useEffect, useState, useCallback } from "react";
import ReactMapGL, { Source, Layer } from "react-map-gl";
import { useSelector } from "react-redux";
import { getRoutingGeometry } from "../app/rootReducer";

const Map = ({ latitude, longitude }) => {
  const routeGeometry = useSelector(getRoutingGeometry);

  const [viewport, setViewport] = useState({
    width: "100%",
    height: "100%",
    latitude,
    longitude,
    zoom: 9,
  });

  const _goToRouteCoordinates = useCallback(() => {
    const coordinates = routeGeometry.coordinates
      ? routeGeometry.coordinates[0]
      : [];

    setViewport((viewport) => ({
      ...viewport,
      latitude: Boolean(coordinates[1]) ? coordinates[1] : latitude,
      longitude: Boolean(coordinates[0]) ? coordinates[0] : longitude,
    }));
  }, [routeGeometry, latitude, longitude]);

  useEffect(() => {
    _goToRouteCoordinates();
  }, [_goToRouteCoordinates]);

  const geojson = {
    type: "FeatureCollection",
    features: [
      {
        type: "Feature",
        geometry: {
          type: "LineString",
          coordinates: routeGeometry.coordinates
            ? routeGeometry.coordinates
            : [-122.4, 37.8],
        },
      },
    ],
  };

  return (
    <ReactMapGL
      mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}
      {...viewport}
      onViewportChange={(nextViewport) => setViewport(nextViewport)}
      mapStyle="mapbox://styles/mapbox/streets-v11"
    >
      <Source id="route" type="geojson" data={geojson}>
        <Layer
          id="line"
          type="line"
          source="route"
          paint={{
            "line-color": "#f43",
            "line-width": 8,
          }}
        />
      </Source>
    </ReactMapGL>
  );
};

export default Map;
