import {
  Link,
  useNavigate,
} from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const user = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : null;

  const handleLogout = () => {
    localStorage.removeItem("token");

    localStorage.removeItem("user");

    alert("Logged Out");

    navigate("/login");
  };

  return (
    <nav className="bg-red-600 text-white p-4 flex justify-between items-center">
      <h1 className="text-2xl font-bold">
        Blood Bank
      </h1>

      <div className="space-x-4 flex items-center">
        <Link to="/">Home</Link>

        {!user ? (
          <>
            <Link to="/login">
              User Login
            </Link>

            <Link to="/admin-login">
              Admin Login
            </Link>

            <Link to="/register">
              User Register
            </Link>
          </>
        ) : (
          <>
            <Link to="/dashboard">
              Dashboard
            </Link>

            <Link to="/donors">
              Donors
            </Link>

            <Link to="/requests">
              Requests
            </Link>

            <span className="font-semibold">
              Welcome, {user.name}
            </span>

            <button
              onClick={handleLogout}
              className="bg-white text-red-600 px-3 py-1 rounded"
            >
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;