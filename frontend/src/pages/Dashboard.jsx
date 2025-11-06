import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function Dashboard() {
  const nav = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-blue-900 text-white">
      <Navbar />

      <div className="max-w-4xl mx-auto p-8">
        <h1 className="text-4xl font-bold text-center mb-10 bg-gradient-to-r from-blue-300 to-purple-400 bg-clip-text text-transparent">
          Welcome to SlotSwapper
        </h1>

        <p className="text-gray-300 text-center mb-10">
          Manage your time slots, swap availability with others, and keep track of swap requests.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Events */}
          <Link
            to="/events"
            className="p-[2px] rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 hover:scale-[1.02] transition focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <div className="bg-black/60 p-6 rounded-xl h-full flex flex-col justify-center items-center backdrop-blur-md">
              <h2 className="text-2xl font-semibold mb-2">My Events</h2>
              <p className="text-gray-400 text-sm text-center">
                Create & manage events, mark slots as swappable.
              </p>
            </div>
          </Link>

          {/* Marketplace */}
          <Link
            to="/marketplace"
            className="p-[2px] rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 hover:scale-[1.02] transition focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <div className="bg-black/60 p-6 rounded-xl h-full flex flex-col justify-center items-center backdrop-blur-md">
              <h2 className="text-2xl font-semibold mb-2">Marketplace</h2>
              <p className="text-gray-400 text-sm text-center">
                Browse available slots from others and request swaps.
              </p>
            </div>
          </Link>

          {/* Requests */}
          <Link
            to="/requests"
            className="p-[2px] rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 hover:scale-[1.02] transition focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <div className="bg-black/60 p-6 rounded-xl h-full flex flex-col justify-center items-center backdrop-blur-md">
              <h2 className="text-2xl font-semibold mb-2">Requests</h2>
              <p className="text-gray-400 text-sm text-center">
                View incoming & outgoing swap requests.
              </p>
            </div>
          </Link>
        </div>

        {/* Quick actions (optional) */}
        <div className="mt-10 flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={() => nav("/events")}
            className="px-5 py-2 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 hover:opacity-95"
          >
            Create / Manage Events
          </button>
          <button
            onClick={() => nav("/marketplace")}
            className="px-5 py-2 rounded-lg bg-gray-800 border border-gray-600 hover:bg-gray-700"
          >
            Find Swaps
          </button>
        </div>
      </div>
    </div>
  );
}
