import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "./sclies/userSclies.jsx";

export default function Navbar() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const { isLoggedIn, user } = useSelector((state) => state.auth);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const handleLogout = () => {
        dispatch(logoutUser());
        navigate("/login");
    };

    const isActive = (path) => location.pathname === path;

    const navLinkClass = (path) =>
        `flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl font-medium text-sm transition-all duration-150 ${
            isActive(path)
                ? "bg-indigo-50 text-indigo-700 font-semibold shadow-xs"
                : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
        }`;

    return (
        <>
            {/* Mobile Header Bar */}
            <div className="md:hidden w-full bg-white border-b border-slate-200 px-4 py-3 flex items-center justify-between sticky top-0 z-40">
                <Link to="/" className="flex items-center gap-2.5 font-bold text-slate-900 tracking-tight">
                    <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white shadow-xs">
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                    </div>
                    <span>Laptop Config</span>
                </Link>

                <button
                    type="button"
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    aria-label="Toggle navigation menu"
                    className="p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer"
                >
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        {mobileMenuOpen ? (
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        ) : (
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                        )}
                    </svg>
                </button>
            </div>

            {/* Main Navigation Sidebar */}
            <nav
                className={`
                    ${mobileMenuOpen ? "flex" : "hidden"} 
                    md:flex flex-col justify-between w-full md:w-64 min-h-[calc(100vh-57px)] md:min-h-screen 
                    bg-white border-r border-slate-200/80 p-5 shrink-0 z-30
                `}
            >
                <div className="flex flex-col gap-6">
                    {/* Brand Heading (Desktop) */}
                    <Link
                        to="/"
                        className="hidden md:flex items-center gap-3 px-2 py-1 text-slate-900 group"
                    >
                        <div className="w-9 h-9 rounded-xl bg-indigo-600 flex items-center justify-center text-white shadow-xs group-hover:bg-indigo-700 transition">
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                        </div>
                        <div>
                            <span className="block font-bold text-base tracking-tight text-slate-900 leading-tight">Laptop Config</span>
                            <span className="block text-[11px] font-medium text-slate-400">Spec & Quote Studio</span>
                        </div>
                    </Link>

                    {/* Nav Links */}
                    <div className="flex flex-col gap-1.5" onClick={() => setMobileMenuOpen(false)}>
                        {isLoggedIn ? (
                            <>
                                {user?.role === "admin" && (
                                    <>
                                        <Link to="/dashboard" className={navLinkClass("/dashboard")}>
                                            <svg className="w-4 h-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                                            </svg>
                                            Dashboard
                                        </Link>
                                        <Link to="/createconfiguration" className={navLinkClass("/createconfiguration")}>
                                            <svg className="w-4 h-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                            </svg>
                                            Create Component
                                        </Link>
                                        <Link to="/showcomponent" className={navLinkClass("/showcomponent")}>
                                            <svg className="w-4 h-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                                            </svg>
                                            Components
                                        </Link>
                                        <Link to="/admin/price-logs" className={navLinkClass("/admin/price-logs")}>
                                            <svg className="w-4 h-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                                            </svg>
                                            Price Logs
                                        </Link>
                                        <Link to="/admin/quotations" className={navLinkClass("/admin/quotations")}>
                                            <svg className="w-4 h-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                            </svg>
                                            Quotations
                                        </Link>
                                    </>
                                )}
                                {user?.role === "saleExcutive" && (
                                    <>
                                        <Link to="/dashboard" className={navLinkClass("/dashboard")}>
                                            <svg className="w-4 h-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                                            </svg>
                                            Dashboard
                                        </Link>
                                        <Link to="/sales/components" className={navLinkClass("/sales/components")}>
                                            <svg className="w-4 h-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                                            </svg>
                                            View Components
                                        </Link>
                                        <Link to="/sales/cart" className={navLinkClass("/sales/cart")}>
                                            <svg className="w-4 h-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                                            </svg>
                                            Build Configuration
                                        </Link>
                                    </>
                                )}
                            </>
                        ) : (
                            <div className="flex flex-col gap-2 pt-2">
                                <Link
                                    to="/login"
                                    className={`text-center py-2.5 px-4 rounded-xl font-medium text-sm transition-all duration-150 ${
                                        isActive("/login")
                                            ? "bg-slate-100 text-slate-900 font-semibold"
                                            : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                                    }`}
                                >
                                    Login
                                </Link>

                                <Link
                                    to="/register"
                                    className="bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 text-white font-semibold text-center py-2.5 px-4 rounded-xl text-sm shadow-xs transition duration-150 cursor-pointer"
                                >
                                    Register
                                </Link>
                            </div>
                        )}
                    </div>
                </div>

                {isLoggedIn && (
                    <div className="border-t border-slate-200/80 pt-4 mt-6 flex flex-col gap-3">
                        <div className="bg-slate-50 border border-slate-100 rounded-xl p-3 flex flex-col gap-1">
                            <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400">Account</span>
                            <span className="font-semibold text-slate-800 text-sm truncate">{user?.userName}</span>
                            <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider bg-indigo-50 text-indigo-700 border border-indigo-100 w-max mt-0.5">
                                {user?.role === "admin" ? "Admin" : "Sales Executive"}
                            </span>
                        </div>

                        <button
                            type="button"
                            onClick={handleLogout}
                            className="w-full flex items-center justify-center gap-2 bg-slate-100 hover:bg-rose-50 text-slate-600 hover:text-rose-600 border border-slate-200 hover:border-rose-200 font-semibold px-3 py-2 rounded-xl text-xs transition duration-150 cursor-pointer"
                        >
                            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                            </svg>
                            Logout
                        </button>
                    </div>
                )}
            </nav>
        </>
    );
}