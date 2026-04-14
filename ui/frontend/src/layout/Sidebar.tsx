import { useSelector, useDispatch } from 'react-redux';
import { clearAuth } from '../redux/slice/authSlice';
import { useNavigate, NavLink } from 'react-router-dom';
import type { RootState } from '../redux/store';
import { FiUsers, FiLogOut, FiShoppingCart, FiLayers, FiEdit } from 'react-icons/fi';
import { MdDashboard } from "react-icons/md";
import { FaBook } from "react-icons/fa";
import { RiAddCircleLine } from "react-icons/ri";
import { FaRobot } from 'react-icons/fa6';

interface SidebarProps {
  isOpen: boolean;
  onCloseMobile?: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onCloseMobile }) => {
  const { userType: roleType } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(clearAuth());
    navigate('/');
  };

  const menuItems =
    roleType === 'user'
      ? [
        { label: 'Dashboard', icon: MdDashboard, path: '/user-dashboard' },
        
       
        { label: 'Purchase Plan', icon: FiShoppingCart, path: '/user/purchase-credit' },
        
       
        { label: 'Your Plans', icon: FiLayers, path: '/user/plans' },
        
       
        { label: 'View Course', icon: FaBook, path: '/user/purchase-course' },
        
        { label: 'AI Tools', icon: FaRobot, path: '/user/ai-tools' },
        { label: "Update Password", icon: FiEdit, path: "/user/update-password" },
        { label: "Update Profile", icon: FiEdit, path: "/user/update-profile" },
      ]
      : [
        { label: "Dashboard", icon: MdDashboard, path: "/admin-dashboard" },
        { label: "Manage Users", icon: FiUsers, path: "/admin/users" },
        { label: "Create Master Plan", icon: RiAddCircleLine, path: "/admin/create-master-plan" },
        { label: "Master Plan", icon: FiLayers, path: "/admin/master-plan" },
        { label: "Create Master Course", icon: RiAddCircleLine, path: "/admin/create-master-course" },
        { label: "Master Course", icon: FaBook, path: "/admin/master-course" },
        { label: "Update Password", icon: FiEdit, path: "/admin/update-password" },
      ];

  return (
    <div
      className={`my-second-bg-dark px-2 text-white h-100 d-flex flex-column transition-width ${isOpen ? 'sidebar-open' : 'sidebar-closed'
        }`}
      style={{ overflowY: 'auto', overflowX: 'hidden' }}
    >
      {/* Logo / Brand */}
      <div className="p-3 d-flex align-items-center">
        <img
          src="/images/logo.png"
          alt="Logo"
          className="rounded-circle me-2"
          width="40"
          height="40"
        />
        {isOpen && <span className="fw-bold">Dashboard</span>}
      </div>

      {/* Navigation Menu */}
      <ul className="nav flex-column mt-3 flex-grow-1">
        {menuItems.map((item) => (
          <li className="nav-item" key={item.label}>
            <NavLink
              to={item.path}
              onClick={onCloseMobile}
              className={({ isActive }) =>
                `nav-link d-flex align-items-center gap-2 text-white ${isActive ? 'active rounded' : ''
                }`
              }
            >
              <item.icon />
              {isOpen && <span>{item.label}</span>}
            </NavLink>
          </li>
        ))}
        {/* Logout Button moved here */}
        <li className="nav-item">
          <button
            onClick={handleLogout}
            className="nav-link d-flex align-items-center gap-2 text-white w-100 border-0 bg-transparent py-2 px-3"
          >
            <FiLogOut />
            {isOpen && <span>Logout</span>}
          </button>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar