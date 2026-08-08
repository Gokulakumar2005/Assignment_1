import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RegisterUser } from "./sclies/userSclies.jsx";
import { toast } from "react-toastify";

export default function Register() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        userName: "",
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
        navigate("/login");
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        
        // Form validations
        if (!formData.userName.trim() || formData.userName.trim().length < 3) {
            toast.error("Username must be at least 3 characters long");
            return;
        }
        
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
            toast.error("Please enter a valid email address");
            return;
        }

        if (!formData.password || formData.password.length < 6) {
            toast.error("Password must be at least 6 characters long");
            return;
        }

        dispatch(RegisterUser({ formData, redirect }));
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-100 px-4">
             <div className="w-full max-w-md bg-white shadow-lg rounded-xl p-8 border border-slate-200">
                <h2 className="text-3xl font-bold text-center text-slate-800">
                    Register
                </h2>

                <p className="text-center text-gray-500 mt-2 mb-6">
                    Create your account
                </p>

                <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                        <label className="block mb-2 font-medium">Username</label>
                        <input
                            type="text"
                            name="userName"
                            value={formData.userName}
                            onChange={handleChange}
                            placeholder="Enter your username"
                            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-slate-500"
                            required
                        />
                    </div>

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
                        className="w-full bg-slate-800 text-white py-3 rounded-lg hover:bg-slate-900 transition cursor-pointer"
                    >
                        Register
                    </button>
                </form>

                <p className="text-center mt-6 text-gray-600">
                    Already have an account?{" "}
                    <button onClick={() => navigate("/login")} className="text-slate-800 hover:underline font-semibold cursor-pointer">
                        Login
                    </button>
                </p>
            </div>
        </div>
    );
}