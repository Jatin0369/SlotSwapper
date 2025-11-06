import { useEffect, useState } from "react";
import API from "../api/axios";
import Navbar from "../components/Navbar";

export default function Events() {
  const [events, setEvents] = useState([]);
  const [title, setTitle] = useState("");
  const [startTime, setStart] = useState("");
  const [endTime, setEnd] = useState("");

  const load = async () => {
    try {
      const { data } = await API.get("/events");
      setEvents(data);
    } catch (err) {
      console.log(err);
    }
  };

  const createEvent = async (e) => {
    e.preventDefault();
    try {
      await API.post("/events", {
        title,
        startTime,
        endTime,
      });
      setTitle("");
      setStart("");
      setEnd("");
      load();
    } catch (err) {
      console.log(err);
    }
  };

  const toggleSwap = async (id, status) => {
    try {
      await API.patch(`/events/${id}`, { status });
      load();
    } catch (err) {
      console.log(err);
    }
  };

  const deleteEvent = async (id) => {
    try {
      await API.delete(`/events/${id}`);
      load();
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    load();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-blue-900 text-white">
      <Navbar />

      <div className="p-6 max-w-3xl mx-auto">
        <h1 className="text-3xl mb-4">My Events</h1>

        {/* CREATE EVENT FORM */}
        <form onSubmit={createEvent} className="space-y-3 mb-6 bg-black/50 p-4 rounded-lg">
          <input
            placeholder="Event Title"
            className="w-full bg-gray-800 px-3 py-2 rounded"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <input
            type="datetime-local"
            className="w-full bg-gray-800 px-3 py-2 rounded"
            value={startTime}
            onChange={(e) => setStart(e.target.value)}
          />

          <input
            type="datetime-local"
            className="w-full bg-gray-800 px-3 py-2 rounded"
            value={endTime}
            onChange={(e) => setEnd(e.target.value)}
          />

          <button
            className="bg-blue-600 px-4 py-2 rounded w-full hover:bg-blue-500 transition"
            type="submit"
          >
            Add Event
          </button>
        </form>

        {/* EVENT LIST */}
        <div className="space-y-3">
          {events.map((ev) => (
            <div
              key={ev._id}
              className="border border-gray-600 p-4 rounded-lg bg-black/50"
            >
              <div className="font-bold">{ev.title}</div>

              <div className="text-sm text-gray-400">
                {new Date(ev.startTime).toLocaleString()} —{" "}
                {new Date(ev.endTime).toLocaleString()}
              </div>

              <div className="mt-2">Status: {ev.status}</div>

              <div className="flex gap-3 mt-3">
                {ev.status === "BUSY" && (
                  <button
                    className="bg-purple-600 px-3 py-1 rounded"
                    onClick={() => toggleSwap(ev._id, "SWAPPABLE")}
                  >
                    Make Swappable
                  </button>
                )}

                {ev.status === "SWAPPABLE" && (
                  <button
                    className="bg-green-600 px-3 py-1 rounded"
                    onClick={() => toggleSwap(ev._id, "BUSY")}
                  >
                    Cancel Swap
                  </button>
                )}

                <button
                  className="bg-red-600 px-3 py-1 rounded"
                  onClick={() => deleteEvent(ev._id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}

          {events.length === 0 && (
            <p className="text-center text-gray-400">No events yet.</p>
          )}
        </div>
      </div>
    </div>
  );
}
