import { useEffect, useState } from "react";
import API from "../api/axios";
import Navbar from "../components/Navbar";

export default function Marketplace() {
  const [marketSlots, setMarketSlots] = useState([]);
  const [mySwappable, setMySwappable] = useState([]);
  const [selectedOffer, setSelectedOffer] = useState("");
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState(null);

  const showToast = (msg, type = "success") => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 2500);
  };

  const loadData = async () => {
    try {
      const market = await API.get("/swap/swappable-slots");
      setMarketSlots(market.data);

      const mine = await API.get("/events");
      setMySwappable(mine.data.filter((e) => e.status === "SWAPPABLE"));
    } catch (err) {
      console.log(err);
      showToast("Error loading marketplace", "error");
    }
  };

  const requestSwap = async (theirSlotId) => {
    if (!selectedOffer) {
      showToast("Select one of your swappable slots first!", "error");
      return;
    }

    const confirm = window.confirm("Send swap request?");
    if (!confirm) return;

    try {
      setLoading(true);

      await API.post("/swap/request", {
        theirSlotId,
        mySlotId: selectedOffer,
      });

      showToast("Swap request sent!");
      setSelectedOffer("");
      loadData();
    } catch (err) {
      console.log(err);
      showToast("Failed to send request", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-blue-900 text-white">
      <Navbar />

      {/* ✅ Toast UI */}
      {toast && (
        <div
          className={`fixed top-4 right-4 px-4 py-2 rounded shadow-lg
          ${toast.type === "success" ? "bg-green-600" : "bg-red-600"}`}
        >
          {toast.msg}
        </div>
      )}

      <div className="max-w-3xl mx-auto p-6">
        <h1 className="text-3xl font-semibold mb-6">Marketplace</h1>

        {/* ✅ Select your swappable slot */}
        <div className="bg-black/40 p-4 rounded-lg border border-gray-700 mb-8">
          <h2 className="text-xl mb-3">Choose Your Offer</h2>

          <select
            className="bg-gray-800 border border-gray-600 p-2 rounded w-full"
            value={selectedOffer}
            onChange={(e) => setSelectedOffer(e.target.value)}
          >
            <option value="">Select Your Swappable Slot</option>
            {mySwappable.map((ev) => (
              <option key={ev._id} value={ev._id}>
                {ev.title} — {new Date(ev.startTime).toLocaleString()}
              </option>
            ))}
          </select>

          {mySwappable.length === 0 && (
            <p className="text-sm text-gray-400 mt-2">
              You have no swappable slots. Mark one of your events as SWAPPABLE
              from the <span className="text-blue-400">Events</span> page.
            </p>
          )}
        </div>

        <h2 className="text-xl mb-4">Available Time Slots</h2>

        {marketSlots.length === 0 && (
          <p className="text-gray-400">No swappable slots available yet.</p>
        )}

        <div className="space-y-4">
          {marketSlots.map((slot) => (
            <div
              key={slot._id}
              className="p-4 bg-black/40 border border-gray-700 rounded-lg"
            >
              <div className="font-bold text-lg">{slot.title}</div>

              <div className="text-sm text-gray-300 mt-1">
                {new Date(slot.startTime).toLocaleString()} →{" "}
                {new Date(slot.endTime).toLocaleString()}
              </div>

              <button
                disabled={!selectedOffer || loading}
                className={`mt-4 px-4 py-2 rounded transition
                  ${
                    !selectedOffer || loading
                      ? "bg-gray-600 cursor-not-allowed"
                      : "bg-purple-600 hover:bg-purple-500"
                  }`}
                onClick={() => requestSwap(slot._id)}
              >
                {loading ? "Sending..." : "Request Swap"}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
