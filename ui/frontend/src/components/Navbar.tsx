import { NavLink, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "../redux/store";
import { clearAuth } from "../redux/slice/authSlice";
import logo from "../images/logo.png";
import "../styles/style.css";

const Navbar = () => {
  const { isAuthenticated, userType } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(clearAuth());
    navigate("/login");
  };

  const landingMenuItems = [
    { path: "/", text: "Home" },
    { path: "/about", text: "About Us" },
    { path: "/pricing", text: "Our Plans" },
    { path: "/news-and-blogs", text: "News and Blogs" },
    { path: "/faq", text: "FAQ" },
    { path: "/contact", text: "Contact Us" },
  ];

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light navbarBackground">
        <div className="container-fluid">
          <NavLink className="ms-5 navbar-brand text-light" to="/">
            <img src={logo} height={50} alt="" />
          </NavLink>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              
              {/* Landing links - hamesha dikhenge */}
              {landingMenuItems.map((link, index) => (
                <li className="nav-item ms-3" key={index}>
                  <NavLink
                    className={({ isActive }) =>
                      `nav-link text-light ${isActive ? "active" : ""}`
                    }
                    to={link.path}
                  >
                    {link.text}
                  </NavLink>
                </li>
              ))}

              {/* Jab logged OUT ho - Register, Login, Admin Login dikhao */}
              {!isAuthenticated && (
                <>
                  <li className="nav-item ms-3">
                    <NavLink
                      className={({ isActive }) =>
                        `nav-link text-light ${isActive ? "active" : ""}`
                      }
                      to="/registration"
                    >
                      Register
                    </NavLink>
                  </li>
                  <li className="nav-item ms-3">
                    <NavLink
                      className={({ isActive }) =>
                        `nav-link text-light ${isActive ? "active" : ""}`
                      }
                      to="/login"
                    >
                      Login
                    </NavLink>
                  </li>
                  <li className="nav-item ms-3">
                    <NavLink
                      className={({ isActive }) =>
                        `nav-link text-light ${isActive ? "active" : ""}`
                      }
                      to="/admin-login"
                    >
                      Admin
                    </NavLink>
                  </li>
                </>
              )}

              {/* Jab logged IN ho - Dashboard + Logout dikhao */}
              {isAuthenticated && (
                <>
                  <li className="nav-item ms-3">
                    <NavLink
                      className={({ isActive }) =>
                        `nav-link text-light ${isActive ? "active" : ""}`
                      }
                      to={userType === "admin" ? "/admin-dashboard" : "/user-dashboard"}
                    >
                      Dashboard
                    </NavLink>
                  </li>
                  <li className="nav-item ms-3">
                    <button
                      className="nav-link text-light btn btn-link"
                      onClick={handleLogout}
                      style={{ border: "none", background: "none", cursor: "pointer" }}
                    >
                      Logout
                    </button>
                  </li>
                </>
              )}

            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;