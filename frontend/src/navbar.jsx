import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "./sclies/userSclies.jsx";

export default function Navbar() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { isLoggedIn, user } = useSelector((state) => state.auth);

    const handleLogout = () => {
        dispatch(logoutUser());
        navigate("/login");
    };

    return (
        <nav className="w-64 min-h-screen bg-slate-50 text-slate-700 flex flex-col justify-between p-6 border-r border-slate-200 shrink-0">
            <div className="flex flex-col gap-6">
                <Link to="/" className="text-xl font-bold tracking-tight text-slate-900 border-b border-slate-200 pb-4 text-center">
                    Laptop Config
                </Link>

                <div className="flex flex-col gap-1">
                    {isLoggedIn ? (
                        <>
                            {user?.role === "admin" && (
                                <>
                                    <Link
                                        to="/dashboard"
                                        className="hover:bg-slate-200 hover:text-slate-950 px-3 py-2 rounded font-medium transition-colors text-sm"
                                    >
                                        Dashboard
                                    </Link>
                                    <Link
                                        to="/createconfiguration"
                                        className="hover:bg-slate-200 hover:text-slate-950 px-3 py-2 rounded font-medium transition-colors text-sm"
                                    >
                                        Create Component
                                    </Link>
                                    <Link
                                        to="/showcomponent"
                                        className="hover:bg-slate-200 hover:text-slate-950 px-3 py-2 rounded font-medium transition-colors text-sm"
                                    >
                                        Components
                                    </Link>
                                    <Link
                                        to="/admin/price-logs"
                                        className="hover:bg-slate-200 hover:text-slate-950 px-3 py-2 rounded font-medium transition-colors text-sm"
                                    >
                                        Price Logs
                                    </Link>
                                    <Link
                                        to="/admin/quotations"
                                        className="hover:bg-slate-200 hover:text-slate-950 px-3 py-2 rounded font-medium transition-colors text-sm"
                                    >
                                        Quotations
                                    </Link>
                                </>
                            )}
                            {user?.role === "saleExcutive" && (
                                <>
                                    <Link
                                        to="/dashboard"
                                        className="hover:bg-slate-200 hover:text-slate-950 px-3 py-2 rounded font-medium transition-colors text-sm"
                                    >
                                        Dashboard
                                    </Link>
                                    <Link
                                        to="/sales/components"
                                        className="hover:bg-slate-200 hover:text-slate-950 px-3 py-2 rounded font-medium transition-colors text-sm"
                                    >
                                        View Components
                                    </Link>
                                    <Link
                                        to="/sales/cart"
                                        className="hover:bg-slate-200 hover:text-slate-950 px-3 py-2 rounded font-medium transition-colors text-sm"
                                    >
                                        Build Configuration
                                    </Link>
                                </>
                            )}

                        </>
                    ) : (
                        <>
                            <Link
                                transition-colors
                                to="/login"
                                className="hover:bg-slate-200 hover:text-slate-950 px-3 py-2 rounded font-medium text-sm text-center"
                            >
                                Login
                            </Link>

                            <Link
                                to="/register"
                                className="bg-indigo-600 text-white hover:bg-indigo-700 px-3 py-2 rounded font-medium text-sm text-center transition"
                            >
                                Register
                            </Link>
                        </>
                    )}
                </div>
            </div>

            {isLoggedIn && (
                <div className="flex flex-col gap-4 border-t border-slate-200 pt-4">
                    <div className="flex flex-col">
                        <span className="text-xs text-slate-400">Logged in as</span>
                        <span className="font-semibold text-slate-800 text-sm">{user?.userName}</span>
                        <span className="text-[10px] font-bold uppercase bg-slate-200 text-slate-700 px-2 py-0.5 rounded w-max mt-1">
                            {user?.role === "admin" ? "Admin" : "Sales Executive"}
                        </span>
                    </div>

                    <button
                        onClick={handleLogout}
                        className="w-full bg-slate-200 hover:bg-slate-300 text-slate-750 font-semibold px-3 py-2 rounded text-xs transition cursor-pointer"
                    >
                        Logout
                    </button>
                </div>
            )}
        </nav>
    );
}