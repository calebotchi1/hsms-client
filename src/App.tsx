import React from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import LoginForm from "./pages/LoginForm";
import AdminLoginForm from "./pages/admin/LoginForm";
import AdminBookings from "./pages/admin/Bookings";
import AdminHostelList from "./pages/admin/HostelList";
import AdminLayout from "./pages/admin/Layout";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HostelList from "./pages/HostelList";
import RegisterForm from "./pages/RegisterForm";
import HostelDetail from "./pages/HostelDetail";
import Layout from "./pages/Layout";
import Bookings from "./pages/Bookings";
import Index from "./pages/Index";
import EditHostelPage from "./pages/admin/EditHostelPage";

function App() {
  return (
    <div className="App">
      <>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route path="/" element={<Index />} />
              <Route path="hostels" element={<HostelList />} />
              <Route path="bookings" element={<Bookings />} />
              <Route path="hostels/:id" element={<HostelDetail />} />
              <Route path="login" element={<LoginForm />} />
              <Route path="register" element={<RegisterForm />} />
            </Route>

            <Route path="/admin" element={<AdminLayout />}>
              <Route path="login" element={<AdminLoginForm />} />
              <Route path="register" element={<RegisterForm />} />
              <Route path="bookings" element={<AdminBookings />} />
              <Route path="hostels" element={<AdminHostelList />} />
              <Route path="hostels/:id" element={<EditHostelPage />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </>
    </div>
  );
}

export default App;
