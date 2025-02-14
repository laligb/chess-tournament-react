import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import { useContext } from "react";
import { EventContext } from "../context/EventContext";

function CalendarPage() {
  const { events } = useContext(EventContext);

  return (
    <div style={{ maxWidth: "600px", height: "100hv" }}>
      <FullCalendar
        plugins={[dayGridPlugin]}
        initialView="dayGridMonth"
        weekends={true}
        events={events}
        eventClick={(info) => {
          const location = info.event.extendedProps.location;
          alert(
            `Event: ${info.event.title}, Date: ${info.event.start}, Location: ${location.name}`
          );
        }}
      />
    </div>
  );
}

export default CalendarPage;
