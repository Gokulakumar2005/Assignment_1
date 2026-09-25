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
        <div className="w-full flex-1 flex items-center justify-center py-6 px-4">
             <div className="w-full max-w-md bg-white shadow-xs rounded-2xl p-7 sm:p-8 border border-slate-200/80">
                <div className="text-center mb-6">
                    <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-3 border border-indigo-100/60 shadow-xs">
                        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                        </svg>
                    </div>
                    <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
                        Create Account
                    </h2>
                    <p className="text-slate-500 text-sm mt-1">
                        Sign up to configure hardware and manage quotations.
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-1.5">
                            Username
                        </label>
                        <input
                            type="text"
                            name="userName"
                            value={formData.userName}
                            onChange={handleChange}
                            placeholder="johndoe"
                            className="w-full border border-slate-200 rounded-xl px-4 py-2.5 sm:py-3 text-slate-800 placeholder-slate-400 text-sm transition-all focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-1.5">
                            Email Address
                        </label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="name@company.com"
                            className="w-full border border-slate-200 rounded-xl px-4 py-2.5 sm:py-3 text-slate-800 placeholder-slate-400 text-sm transition-all focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-1.5">
                            Password
                        </label>
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="At least 6 characters"
                            className="w-full border border-slate-200 rounded-xl px-4 py-2.5 sm:py-3 text-slate-800 placeholder-slate-400 text-sm transition-all focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 text-white font-semibold py-3 rounded-xl transition duration-150 cursor-pointer shadow-xs text-sm mt-2"
                    >
                        Create Account
                    </button>
                </form>

                <p className="text-center mt-6 text-sm text-slate-500">
                    Already have an account?{" "}
                    <button
                        type="button"
                        onClick={() => navigate("/login")}
                        className="text-indigo-600 hover:text-indigo-700 font-semibold cursor-pointer transition ml-0.5"
                    >
                        Sign In
                    </button>
                </p>
            </div>
        </div>
    );
}