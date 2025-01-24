
import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css'; // Leaflet CSS

const MapComponent = ({ coordinates }) => {
    console.log(coordinates)
  const position = coordinates ? [coordinates[1], coordinates[0]] : [26.2389, 73.0243] // Latitude and Longitude
  console.log(position)

  return (
    <MapContainer center={position} zoom={14} style={{ height: '400px', width: '100%' }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" // OpenStreetMap ka free tile layer
      />
       {/* OpenStreetMap Tile Layer */}
       <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
      <Marker  position={position}>
        <Popup>
         Exect location provided after booking
        </Popup>
      </Marker>
    </MapContainer>
  );
};

export default MapComponent;

// import React from "react";
// import Map, { Marker } from "react-map-gl";

// const MapboxMap = ({ coordinates }) => {
//   const MAPBOX_TOKEN = "pk.eyJ1IjoiaXRzc2FyYW5oZXJlIiwiYSI6ImNsd3B3aDFybjFodTMyaXJ6cGQxeWdwYzcifQ.4HPJRlRvgTdHaXXTDQEWCg"; // Get your token from https://www.mapbox.com/

//   const position = coordinates ? [coordinates[1], coordinates[0]] : [26.2389, 73.0243] // Latitude and Longitude
//   console.log(position)
//   return (
//   <div className="relative h-[400px]">
//       <Map
//       initialViewState={{
//         latitude: position[0], // Delhi
//     longitude: position[1], // Delhi
//         zoom: 14,
//       }}
//       style={{ width: "100%", height: "100%" }}
//       mapStyle="mapbox://styles/mapbox/streets-v11"
//       mapboxAccessToken={MAPBOX_TOKEN}
//     >
//       <Marker longitude={position[1]} latitude={position[0]} color="red" anchor="center" />
//     </Map>
//   </div>
//   );
// };

// export default MapboxMap;