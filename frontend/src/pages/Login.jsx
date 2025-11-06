import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";

export default function Login() {
  const nav = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await API.post("/auth/login", form);
      localStorage.setItem("token", data.token);
      nav("/dashboard");
    } catch (err) {
      console.log(err);
      alert("Invalid credentials");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-blue-900 
      flex items-center justify-center px-4">

      <div className="p-[2px] rounded-2xl bg-gradient-to-r from-blue-500 to-purple-600
        shadow-blue-700/40 shadow-xl">

        <div className="bg-black/70 backdrop-blur-xl rounded-2xl p-8 w-full max-w-sm">

          <h2 className="text-3xl font-bold text-center 
            bg-gradient-to-r from-blue-300 to-purple-400 bg-clip-text text-transparent mb-8">
            Welcome Back
          </h2>

          <form onSubmit={handleSubmit} className="space-y-5">

            <div>
              <label className="text-gray-300 text-sm">Email</label>
              <input
                className="w-full mt-1 bg-gray-800 border border-gray-600 rounded-lg 
                  px-3 py-2 text-gray-200 focus:ring-2 focus:ring-blue-500 outline-none"
                placeholder="you@email.com"
                onChange={(e) => setForm({ ...form, email: e.target.value })}
              />
            </div>

            <div>
              <label className="text-gray-300 text-sm">Password</label>
              <input
                type="password"
                className="w-full mt-1 bg-gray-800 border border-gray-600 rounded-lg 
                  px-3 py-2 text-gray-200 focus:ring-2 focus:ring-blue-500 outline-none"
                placeholder="••••••••"
                onChange={(e) => setForm({ ...form, password: e.target.value })}
              />
            </div>

            <button
              className="w-full py-2 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 
                text-white font-semibold transition-transform transform hover:scale-[1.03] 
                hover:shadow-lg hover:shadow-blue-600/40"
              type="submit"
            >
              Sign In
            </button>
          </form>

          <p className="mt-6 text-center text-gray-400 text-sm">
            Don’t have an account?{" "}
            <button
              className="text-blue-400 hover:text-blue-300"
              onClick={() => nav("/signup")}
            >
              Sign up
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
