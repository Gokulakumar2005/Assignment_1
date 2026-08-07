import { useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { UserAccount } from "./sclies/userSclies.jsx";
import Navbar from "./navbar.jsx";
import Login from "./login.jsx";
import Register from "./register.jsx";
import Dashboard from "./dashboard.jsx";
import CreateComponent from "./admin/CreateComponent.jsx";
import ShowComponent from "./admin/ReadComponent.jsx";
import ShowComponentsForSales from "./salesPerson/ShowComponentsForSales.jsx";
import PriceHistoryLogs from "./admin/PriceHistoryLogs.jsx";
import QuotationsList from "./admin/QuotationsList.jsx";
import QuotationCartPage from "./salesPerson/QuotationCartPage.jsx";

function App() {
  const dispatch = useDispatch();
  const { isLoggedIn, user, loading } = useSelector((state) => state.auth);

  useEffect(() => {
    if (localStorage.getItem("token")) {
      dispatch(UserAccount());
    }
  }, [dispatch]);

  if (localStorage.getItem("token") && loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-indigo-600 border-t-transparent"></div>
      </div>
    );
  }

  return (
    <BrowserRouter>
      <div className="flex min-h-screen bg-slate-50 w-full">
        <Navbar />
        <main className="flex-grow p-8 flex items-center justify-center">
          <Routes>
            <Route path="/" element={<Navigate to={isLoggedIn ? "/dashboard" : "/login"} />} />
            <Route path="/dashboard" element={isLoggedIn ? <Dashboard /> : <Navigate to="/login" />} />
            <Route path="/login" element={!isLoggedIn ? <Login /> : <Navigate to="/dashboard" />} />
            <Route path="/register" element={!isLoggedIn ? <Register /> : <Navigate to="/dashboard" />} />

            <Route path="/createconfiguration" element={<CreateComponent />} />
            <Route path="/showcomponent" element={<ShowComponent/>}/>
            <Route path="/admin/price-logs" element={isLoggedIn && user?.role === "admin" ? <PriceHistoryLogs /> : <Navigate to="/" />} />
            <Route path="/admin/quotations" element={isLoggedIn && user?.role === "admin" ? <QuotationsList /> : <Navigate to="/" />} />
            <Route path="/sales/components" element={isLoggedIn && user?.role === "saleExcutive" ? <ShowComponentsForSales /> : <Navigate to="/" />} />
            <Route path="/sales/cart" element={isLoggedIn && user?.role === "saleExcutive" ? <QuotationCartPage /> : <Navigate to="/" />} />
            {/* Fallback routes */}
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
