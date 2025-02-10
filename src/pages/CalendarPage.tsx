import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";

function CalendarPage() {
  return (
    <div style={{ width: "500px", height: "100hv" }}>
      <FullCalendar
        plugins={[dayGridPlugin]}
        initialView="dayGridMonth"
        weekends={false}
        events={[
          { title: "event 1", date: "2025-02-12" },
          { title: "event 2", date: "2025-02-14" },
        ]}
      />
    </div>
  );
}

export default CalendarPage;
