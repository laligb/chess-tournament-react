import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import { useContext, useState } from "react";
import { EventContext } from "../context/EventContext";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { EventApi, EventClickArg } from "fullcalendar/index.js";

function CalendarPage() {
  const { events, updateEvent, deleteEvent } = useContext(EventContext);
  const [openPopup, setOpenPopup] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<EventApi | null>(null);
  const [title, setTitle] = useState("");

  const handleEventClick = (info: EventClickArg) => {
    setSelectedEvent(info.event);
    setTitle(info.event.title);
    setOpenPopup(true);
    console.log("Updating event with id:", selectedEvent?.id);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedEvent) return;
    selectedEvent.setProp("title", title);

    try {
      await updateEvent(selectedEvent.id, { title });
    } catch (error) {
      console.error("Error updating event:", error);
    }

    setOpenPopup(false);
  };

  const handleClose = () => {
    setOpenPopup(false);
  };

  const handleDeleteEvent = async () => {
    if (!selectedEvent) return;
    try {
      await deleteEvent(selectedEvent.id, {});
      setOpenPopup(false);
    } catch (err) {
      console.error("Error deleting event:", err);
    }
  };

  return (
    <div style={{ maxWidth: "600px", height: "100hv" }}>
      <FullCalendar
        plugins={[dayGridPlugin]}
        initialView="dayGridMonth"
        weekends={true}
        events={events}
        eventClick={handleEventClick}
        eventColor="green"
        editable={true}
      />
      <Modal show={openPopup} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>{selectedEvent?.title}</Modal.Title>
        </Modal.Header>
        <form onSubmit={handleSubmit}>
          <Modal.Body>
            {selectedEvent && (
              <>
                <p>Date: {selectedEvent.start?.toString()}</p>
                <p>
                  Location:{" "}
                  {selectedEvent.extendedProps.location &&
                    selectedEvent.extendedProps.location.name}
                </p>
                <div className="mb-3">
                  <label htmlFor="eventTitle" className="form-label">
                    Title:
                  </label>
                  <input
                    id="eventTitle"
                    type="text"
                    className="form-control"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </div>
              </>
            )}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Cancel
            </Button>
            <Button type="submit" variant="primary">
              Save Changes
            </Button>
            <Button type="submit" variant="danger" onClick={handleDeleteEvent}>
              Delete event
            </Button>
          </Modal.Footer>
        </form>
      </Modal>
    </div>
  );
}

export default CalendarPage;
