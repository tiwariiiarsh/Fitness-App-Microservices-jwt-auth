import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "./authApi";

export default function RegisterPage() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleRegister = async () => {
    await registerUser(form);
    navigate("/login");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0b0b0e]">
      <div
        className="
          w-[480px] max-w-[92%]
          bg-black/80 backdrop-blur-xl
          p-10 rounded-3xl
          border border-slate-700
          shadow-[0_0_40px_rgba(0,0,0,0.9)]
        "
      >
        <h2 className="text-3xl font-bold text-center text-white mb-8">
          Create your account
        </h2>

        <input
          className="w-full mb-4 px-4 py-3 rounded-xl
                     bg-[#121216] text-white placeholder-gray-500
                     border border-slate-700
                     focus:outline-none focus:border-white/60"
          placeholder="Full name"
          onChange={(e) =>
            setForm({ ...form, name: e.target.value })
          }
        />

        <input
          className="w-full mb-4 px-4 py-3 rounded-xl
                     bg-[#121216] text-white placeholder-gray-500
                     border border-slate-700
                     focus:outline-none focus:border-white/60"
          placeholder="Email"
          onChange={(e) =>
            setForm({ ...form, email: e.target.value })
          }
        />

        <input
          type="password"
          className="w-full mb-6 px-4 py-3 rounded-xl
                     bg-[#121216] text-white placeholder-gray-500
                     border border-slate-700
                     focus:outline-none focus:border-white/60"
          placeholder="Password"
          onChange={(e) =>
            setForm({ ...form, password: e.target.value })
          }
        />

        <button
          onClick={handleRegister}
          className="
            w-full py-3 rounded-xl
            bg-white text-black
            text-lg font-semibold
            hover:bg-gray-200 transition
          "
        >
          Create Account
        </button>

        <p className="text-sm text-center mt-6 text-gray-400">
          Already have an account?{" "}
          <Link to="/login" className="text-white underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
