"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { presetRoutes, presetDestinations, type RoutePath } from "../lib/routing-data";

// Dynamically import react-leaflet components to avoid SSR issues
const MapContainer = dynamic(() => import("react-leaflet").then((mod) => mod.MapContainer), { ssr: false });
const TileLayer = dynamic(() => import("react-leaflet").then((mod) => mod.TileLayer), { ssr: false });
const Polyline = dynamic(() => import("react-leaflet").then((mod) => mod.Polyline), { ssr: false });
const Marker = dynamic(() => import("react-leaflet").then((mod) => mod.Marker), { ssr: false });

import "leaflet/dist/leaflet.css";

// Fix Leaflet marker icon issue in Next.js (safe for SSR)
let icon: any;
if (typeof window !== "undefined") {
  const L = require("leaflet");
  icon = L.icon({
    iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
    iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
    shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
  });
}

export function EcoRouteMap({ onRouteSelect }: { onRouteSelect?: (route: RoutePath) => void }) {
  const [destination, setDestination] = useState("campus");
  const routes = presetRoutes[destination] || [];
  
  // Kampar center point for the map
  const mapCenter: [number, number] = [4.335, 101.141];

  return (
    <div className="eco-route-planner">
      <header className="route-header">
        <div className="destination-picker">
          <label>Set Destination:</label>
          <select value={destination} onChange={(e) => setDestination(e.target.value)}>
            {presetDestinations.map(d => (
              <option key={d.id} value={d.id}>{d.label}</option>
            ))}
          </select>
        </div>
        <p className="route-hint">Select a route to compare carbon emissions before driving.</p>
      </header>
      
      <div className="map-container">
        <MapContainer center={mapCenter} zoom={15} style={{ height: "100%", width: "100%", borderRadius: "8px" }} zoomControl={false}>
          <TileLayer
            attribution='&copy; OpenStreetMap'
            url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
          />
          {routes.map((route) => (
            <Polyline
              key={route.id}
              positions={route.points}
              color={route.color}
              weight={6}
              opacity={0.8}
              eventHandlers={{ click: () => onRouteSelect?.(route) }}
            />
          ))}
          {/* Destination Marker */}
          {routes.length > 0 && routes[0].points.length > 0 && icon && (
             <Marker position={routes[0].points[routes[0].points.length - 1]} icon={icon} />
          )}
        </MapContainer>
      </div>

      <div className="route-cards">
        {routes.map(route => (
          <button 
            key={route.id} 
            className={`route-card ${route.id === "eco" ? "route-card--eco" : ""}`}
            onClick={() => onRouteSelect?.(route)}
            style={{ borderTop: `4px solid ${route.color}` }}
          >
            <div className="route-card-header">
              <h3 style={{ color: route.color }}>{route.label}</h3>
              {route.ecoCoinsBonus > 0 && <span className="eco-bonus">+{route.ecoCoinsBonus} EcoCoins</span>}
            </div>
            <div className="route-stats">
              <div className="stat">
                <span>Distance</span>
                <strong>{route.distanceKm} km</strong>
              </div>
              <div className="stat">
                <span>Est. Time</span>
                <strong>{route.timeMins} min</strong>
              </div>
              <div className="stat">
                <span>Carbon</span>
                <strong>{route.carbonEmissionKg} kg</strong>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
