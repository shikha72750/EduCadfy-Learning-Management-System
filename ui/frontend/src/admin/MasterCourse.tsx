import { useEffect, useState } from "react";
import DashboardLayout from "../layout/DashboardLayout";
import MasterCourseCard from "./MasterCourseCard";
import { getMasterCourse, deleteMasterCourse } from "../services/services";
import { confirmDeletion, showAlert } from "../utils";
import "../styles/mastercourse.css";
import EditCourseModal from "./UpdateMasterCourse";

const handleEditCourse = (id: any) => {
  console.log('Edit course', id);
};


const MasterCourse = () => {
  const [masterCourses, setMasterCourses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedCourse, setSelectedCourse] = useState<any>(null);
const [showEditModal, setShowEditModal] = useState(false);

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      setLoading(true);
      const data = await getMasterCourse();
      setMasterCourses(data?.result || []);
      setError(null);
    } catch (err) {
      setError("Failed to load courses");
      setMasterCourses([]);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteCourse = async (id: any) => {
    const confirmed = await confirmDeletion('master course');
    if (!confirmed) return;

    try {
      await deleteMasterCourse(id);
      setMasterCourses((prev) => prev.filter((course) => course.id !== id));
      showAlert('Deleted', 'Master course removed successfully', 'success');
    } catch {
      showAlert('Error', 'Unable to delete course', 'error');
    }
  };

const handleEditCourse = (id: any) => {
  const course = masterCourses.find((c) => c.id === id);
  setSelectedCourse(course);
  setShowEditModal(true);
};

  return (
    <DashboardLayout>

      <div className="course-page">

        {/* HEADER */}
        <div className="course-header">
          <div>
            <h2>📚 Master Courses</h2>
            <p>Manage all your courses easily</p>
          </div>
        </div>

        {/* STATES */}
        {loading && <div className="loader">Loading courses...</div>}
        {error && <div className="error-box">{error}</div>}

        {/* GRID */}
        {!loading && !error && (
          <div className="course-grid">

            {masterCourses.length > 0 ? (
              masterCourses.map((course) => (
             <MasterCourseCard
  key={course.id}
  id={course.id}
  name={course.title}
  desc={course.desc}
  status={course.status}
  created_at={course.created_at}
  updated_at={course.updated_at}
  image={`http://localhost:8000/uploads/${course.thumbnail}`} // 🔥 FIX
  onEdit={handleEditCourse}
  onDelete={handleDeleteCourse}
/>
              ))
            ) : (
              <div className="empty-state">
                <h4>No Courses Found 😢</h4>
                <p>Create your first course to get started</p>
              </div>
            )}

          </div>
        )}
{showEditModal && (
  <EditCourseModal
    course={selectedCourse}
    onClose={() => setShowEditModal(false)}
    onUpdate={fetchCourses}
  />
)}
      </div>
    </DashboardLayout>
  );
};

export default MasterCourse;