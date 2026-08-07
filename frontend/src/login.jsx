import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { LoginUser } from "./sclies/userSclies.jsx";

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, Error } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const redirect = () => {
    navigate("/dashboard");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    dispatch(LoginUser({ formData, redirect }));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100 px-4">
      <div className="w-full max-w-md bg-white shadow-lg rounded-xl p-8 border border-slate-200">
        <h2 className="text-3xl font-bold text-center text-slate-800">
          Login
        </h2>

        <p className="text-center text-gray-500 mt-2 mb-6">
          Welcome back! Sign in to continue.
        </p>

        {Error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4 text-center">
            {Error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block mb-2 font-medium">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-slate-500"
              required
            />
          </div>

          <div>
            <label className="block mb-2 font-medium">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-slate-500"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-slate-800 text-white py-3 rounded-lg hover:bg-slate-900 transition duration-200 cursor-pointer disabled:opacity-50"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="text-center mt-6 text-gray-600">
          Don't have an account?{" "}
          <button
            type="button"
            onClick={() => navigate("/register")}
            className="text-slate-800 font-semibold hover:underline cursor-pointer"
          >
            Register
          </button>
        </p>
      </div>
    </div>
  );
}