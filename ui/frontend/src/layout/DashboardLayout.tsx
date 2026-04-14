import { useContext, useEffect, useState } from "react";
import "../styles/DashboardLayout.css";
import Sidebar from "./Sidebar";
import { UserContext } from "../context/user/UserContext";
import adminprofile from "../images/adminprofile.jpeg";

const BASE_URL = "http://localhost:8000";
interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const { user }: any = useContext(UserContext);

   const profileImg = user?.profile
    ? `${BASE_URL}/uploads/${user.profile}`
    : adminprofile; // fallback
  useEffect(() => {
    const checkScreenSize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      setSidebarOpen(!mobile);
    };
    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  const toggleSidebar = () => setSidebarOpen((prev) => !prev);
  const closeSidebarMobile = () => {
    if (isMobile) setSidebarOpen(false);
  };

  return (
    <>
      {isMobile ? (
        <>
          {/* Mobile Top Bar */}
          <div className="top-bar-mobile d-flex justify-content-between align-items-center px-3 py-2 shadow-dark">
            <button
              onClick={toggleSidebar}
              className="btn btn-dark border-0 fs-4"
            >
              ☰
            </button>
            <img
              src={profileImg}
              alt="User"
              className="rounded-circle border border-gray"
              width="40"
              height="40"
            />
          </div>

          {/* Mobile Sidebar Overlay */}
          {sidebarOpen && (
            <div
              className="mobile-sidebar-overlay"
              onClick={closeSidebarMobile}
            />
          )}
          <div className={`mobile-sidebar ${sidebarOpen ? "open" : "closed"}`}>
            <Sidebar isOpen={true} onCloseMobile={closeSidebarMobile} />
          </div>

          {/* Mobile Content */}
          <div className="mobile-content " style={{ background: "#0f172a", minHeight: "100vh" }}>{children}</div>
        </>
      ) : (
        <div className="desktop-layout d-flex "  style={{ background: "#0f172a", minHeight: "100vh" }}>
          {/* Desktop Sidebar */}
          <div
            className={`desktop-sidebar shadow-dark ${sidebarOpen ? "open" : "closed"}`}
          >
            <Sidebar isOpen={sidebarOpen} />
          </div>

          {/* Desktop Content */}
          <div className="desktop-content flex-grow-1">
            {/* Desktop Top Bar */}
            <div className="top-bar-desktop d-flex justify-content-between align-items-center px-4 py-2 shadow-dark">
              <button
                onClick={toggleSidebar}
                className="btn btn-dark border-0 fs-4"
              >
                ☰
              </button>
              <img
                src={adminprofile}
                alt="User"
                className="rounded-circle border border-gray"
                width="40"
                height="40"
              />
            </div>

            {/* Desktop Main Content */}
            <div className="desktop-content-main text-light">{children}</div>
          </div>
        </div>
      )}
    </>
  );
};

export default DashboardLayout;