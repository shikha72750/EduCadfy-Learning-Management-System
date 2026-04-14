import DashboardLayout from "../layout/DashboardLayout";
import "../styles/adminDashboard.css";

const AdminDashboard = () => {
  return (
    <DashboardLayout>

      <div className="admin-dashboard">

        {/* Header */}
        <div className="dashboard-header">
          <h2>👋 Welcome Admin</h2>
          <p>Manage your courses and platform easily</p>
        </div>

        {/* Stats Cards */}
        <div className="dashboard-cards">

          <div className="stat-card">
            <h3>📚 Total Courses</h3>
            <p>12</p>
          </div>

          <div className="stat-card">
            <h3>✅ Active Courses</h3>
            <p>8</p>
          </div>

          <div className="stat-card">
            <h3>❌ Inactive Courses</h3>
            <p>4</p>
          </div>

          <div className="stat-card">
            <h3>👤 Users</h3>
            <p>25</p>
          </div>

        </div>

       

      </div>

    </DashboardLayout>
  );
};

export default AdminDashboard;