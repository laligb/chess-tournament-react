import { useRef, useEffect } from "react";
import mapboxgl from "mapbox-gl";
import { useContext } from "react";
import "mapbox-gl/dist/mapbox-gl.css";
import { EventContext } from "../context/EventContext";

function MapPage() {
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const { events } = useContext(EventContext);

  events.forEach((event) => {
    console.log("location = ", event.extendedProps.location);
  });

  const eventsLocation = events.map((event) => ({
    lng: event.extendedProps.location.longitude,
    lat: event.extendedProps.location.latitude,
    title: event.title,
  }));

  useEffect(() => {
    mapboxgl.accessToken =
      "pk.eyJ1IjoibGFsaWdiIiwiYSI6ImNrejhqdTMydzB3a2Eyb211cjJyZG95NmcifQ.gkDhUGob--lX_-nsAnMS0A";
    if (mapContainerRef.current) {
      mapRef.current = new mapboxgl.Map({
        container: mapContainerRef.current,
        center: [-74.006, 40.7128],
        style: "mapbox://styles/mapbox/streets-v11",
        zoom: 1,
      });

      eventsLocation.forEach((marker) => {
        new mapboxgl.Marker({ color: "red" })
          .setLngLat([marker.lng, marker.lat])
          .setPopup(new mapboxgl.Popup({ offset: 25 }).setText(marker.title))
          .addTo(mapRef.current!);
      });
    }

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
      }
    };
  }, []);

  useEffect(() => {
    if (mapRef.current && eventsLocation.length > 0) {
      eventsLocation.forEach((marker) => {
        new mapboxgl.Marker({ color: "red" })
          .setLngLat([marker.lng, marker.lat])
          .setPopup(new mapboxgl.Popup({ offset: 25 }).setText(marker.title))
          .addTo(mapRef.current);
      });
    }
  }, [events]);

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
