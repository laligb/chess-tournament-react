import { useContext } from "react";
import { EventContext } from "../context/EventContext";

function TournamentTable() {
  const { events } = useContext(EventContext);

  return (
    <div className="container mt-4">
      <h2>Tournaments</h2>
      <table className="table table-striped">
        <thead className="thead-dark">
          <tr>
            <th>Title</th>
            <th>Date</th>
            <th>Location</th>
          </tr>
        </thead>
        <tbody>
          {events.map((event) => (
            <tr key={event.id}>
              <td>{event.title}</td>
              <td>{new Date(event.date).toLocaleDateString()}</td>
              <td>{event.extendedProps.location.name}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TournamentTable;
