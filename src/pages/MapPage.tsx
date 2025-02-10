import { useRef, useEffect } from "react";
import mapboxgl from "mapbox-gl";

import "mapbox-gl/dist/mapbox-gl.css";

function MapPage() {
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    mapboxgl.accessToken =
      "pk.eyJ1IjoibGFsaWdiIiwiYSI6ImNrejhqdTMydzB3a2Eyb211cjJyZG95NmcifQ.gkDhUGob--lX_-nsAnMS0A";
    if (mapContainerRef.current) {
      mapRef.current = new mapboxgl.Map({
        container: mapContainerRef.current,
        style: "mapbox://styles/mapbox/streets-v11",
      });
    }

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
      }
    };
  }, []);

  return (
    <div>
      <div
        id="map-container"
        ref={mapContainerRef}
        style={{ width: "700px", height: "400px" }}
      />
    </div>
  );
}

export default MapPage;
