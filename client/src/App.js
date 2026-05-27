import { BrowserRouter, Routes, Route } from "react-router-dom";
import AdminLogin from "./pages/AdminLogin";
import Navbar from "./components/Navbar";
import Requests from "./pages/Requests";
import ProtectedRoute from "./components/ProtectedRoute";
import Donors from "./pages/Donors";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />

        <Route
        path="/admin-login"
        element={<AdminLogin />}
        />
        
        <Route path="/login" element={<Login />} />

        <Route path="/register" element={<Register />} />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/donors"
          element={
            <ProtectedRoute>
            <Donors />
            </ProtectedRoute>
        }
        />
        <Route
          path="/requests"
          element={
             <ProtectedRoute>
            <Requests />
            </ProtectedRoute>
     }
     
       />

      </Routes>
    </BrowserRouter>
  );
}

export default App;