import { useRef, useEffect, useState } from "react";
import mapboxgl from "mapbox-gl";
import { useContext } from "react";
import "mapbox-gl/dist/mapbox-gl.css";
import { EventContext } from "../context/EventContext";
import CheckBox from "../components/CheckBox";

function MapPage() {
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const { events } = useContext(EventContext);
  const [selectTypes, setSelectTypes] = useState(["individual", "team"]);
  const [selectFormat, setSelectFormat] = useState([
    "blitz",
    "rapid",
    "standard",
  ]);

  const filteredEvents = events.filter((event) => {
    return (
      selectTypes.includes(event.type) && selectFormat.includes(event.format)
    );
  });

  const eventsLocation = filteredEvents.map((event) => ({
    lng: event.location.longitude,
    lat: event.location.latitude,
    title: event.title,
  }));

  useEffect(() => {
    mapboxgl.accessToken =
      "pk.eyJ1IjoibGFsaWdiIiwiYSI6ImNrejhqdTMydzB3a2Eyb211cjJyZG95NmcifQ.gkDhUGob--lX_-nsAnMS0A";
    if (mapContainerRef.current) {
      mapRef.current = new mapboxgl.Map({
        container: mapContainerRef.current,
        center: [2.3522, 48.8566],
        style: "mapbox://styles/mapbox/streets-v11",
        zoom: 5,
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

  const markersRef = useRef<mapboxgl.Marker[]>([]);

  useEffect(() => {
    markersRef.current.forEach((marker) => marker.remove());
    markersRef.current = [];

    filteredEvents.forEach((event) => {
      const marker = new mapboxgl.Marker({ color: "red" })
        .setLngLat([event.location.longitude, event.location.latitude])
        .setPopup(new mapboxgl.Popup({ offset: 25 }).setText(event.title))
        .addTo(mapRef.current!);
      markersRef.current.push(marker);
    });
  }, [filteredEvents]);

  return (
    <div>
      <CheckBox
        selectTypes={selectTypes}
        selectFormat={selectFormat}
        setSelectFormat={setSelectFormat}
        setSelectTypes={setSelectTypes}
      />
      <div
        id="map-container"
        ref={mapContainerRef}
        style={{ height: "100vh" }}
      />
    </div>
  );
}

export default MapPage;
