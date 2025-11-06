import { useEffect, useState } from "react";
import API from "../api/axios";
import Navbar from "../components/Navbar";

export default function Requests() {
  const [incoming, setIncoming] = useState([]);
  const [outgoing, setOutgoing] = useState([]);
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState(null);

  const showToast = (msg, type = "success") => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 2500);
  };

  const loadData = async () => {
    try {
      const inc = await API.get("/swap/incoming");
      const out = await API.get("/swap/outgoing");

      setIncoming(inc.data || []);
      setOutgoing(out.data || []);
    } catch (err) {
      console.log(err);
      showToast("Error loading requests", "error");
    }
  };

  const respond = async (id, accepted) => {
    try {
      setLoading(true);
      await API.post(`/swap/response/${id}`, { accept: accepted });
      showToast(accepted ? "Swap accepted!" : "Swap rejected");
      loadData();
    } catch (err) {
      console.log(err);
      showToast("Failed to respond", "error");
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

      {/* ✅ Toast */}
      {toast && (
        <div
          className={`fixed top-4 right-4 px-4 py-2 rounded shadow-lg ${
            toast.type === "success" ? "bg-green-600" : "bg-red-600"
          }`}
        >
          {toast.msg}
        </div>
      )}

      <div className="max-w-4xl mx-auto p-6">
        <h1 className="text-3xl font-bold mb-6">Requests</h1>

        {/* ✅ INCOMING */}
        <h2 className="text-2xl mb-3">Incoming</h2>
        {incoming.length === 0 && (
          <p className="text-gray-400 mb-4">No incoming requests.</p>
        )}

        <div className="space-y-4 mb-10">
          {incoming.map((req) => (
            <div
              key={req._id}
              className="p-4 rounded-lg border border-gray-700 bg-black/40"
            >
              <div className="font-semibold">
                {req.mySlotId?.title || "—"}
              </div>
              <div className="text-sm text-gray-300">
                Offered for: {req.theirSlotId?.title || "—"}
              </div>

              <div className="mt-3 flex gap-3">
                <button
                  disabled={loading}
                  className="bg-green-600 hover:bg-green-500 px-3 py-1 rounded disabled:bg-gray-600"
                  onClick={() => respond(req._id, true)}
                >
                  {loading ? "..." : "Accept"}
                </button>

                <button
                  disabled={loading}
                  className="bg-red-600 hover:bg-red-500 px-3 py-1 rounded disabled:bg-gray-600"
                  onClick={() => respond(req._id, false)}
                >
                  {loading ? "..." : "Reject"}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* ✅ OUTGOING */}
        <h2 className="text-2xl mb-3">Outgoing</h2>
        {outgoing.length === 0 && (
          <p className="text-gray-400 mb-4">No outgoing requests.</p>
        )}

        <div className="space-y-4">
          {outgoing.map((req) => (
            <div
              key={req._id}
              className="p-4 rounded-lg border border-gray-700 bg-black/40"
            >
              <div className="font-semibold">
                You offered: {req.mySlotId?.title || "—"}
              </div>
              <div className="text-sm text-gray-300">
                For: {req.theirSlotId?.title || "—"}
              </div>

              <div className="text-sm mt-2">
                Status:{" "}
                <span
                  className={
                    req.status === "PENDING"
                      ? "text-yellow-400"
                      : req.status === "ACCEPTED"
                      ? "text-green-400"
                      : "text-red-400"
                  }
                >
                  {req.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
