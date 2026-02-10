import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { setCredentials } from "../../slice/authSlice";
import { loginUser } from "./authApi";

export default function LoginPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleLogin = async () => {
    try {
      const res = await loginUser(form);

      dispatch(
        setCredentials({
          user: res.data.user,
          token: res.data.token,
        })
      );

      navigate("/activities");
    } catch {
      alert("Invalid credentials ❌");
    }
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
          Login to your account
        </h2>

        {/* Email */}
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

        {/* Password */}
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
          onClick={handleLogin}
          className="
            w-full py-3 rounded-xl
            bg-white text-black
            text-lg font-semibold
            hover:bg-gray-200 transition
          "
        >
          Login
        </button>

        <p className="text-sm text-center mt-6 text-gray-400">
          New here?{" "}
          <Link to="/register" className="text-white underline">
            Create an account
          </Link>
        </p>
      </div>
    </div>
  );
}
