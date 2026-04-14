import React, { useEffect, useState } from "react";
import "../styles/updatemastercourse.css";
import { showAlert } from "../utils";

type Props = {
  course: any;
  onClose: () => void;
  onUpdate: () => void;
};

const EditCourseModal: React.FC<Props> = ({ course, onClose, onUpdate }) => {
  const [formData, setFormData] = useState<any>({});

  useEffect(() => {
    if (course) {
      setFormData(course);
    }
  }, [course]);

  const handleChange = (e: any) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async () => {
    try {
      console.log("Updated Data 👉", formData);

      // 👉 Yaha API call karna hai (update API)
      // await updateMasterCourse(formData.id, formData);

      showAlert("Updated", "Course updated successfully", "success");
      onUpdate(); // refresh list
      onClose();
    } catch {
      showAlert("Error", "Update failed", "error");
    }
  };

  return (
    <div className="edit-modal">
      <div className="edit-box">

        <h3>Edit Course ✏️</h3>

        <input
          type="text"
          name="title"
          value={formData.title || ""}
          onChange={handleChange}
          placeholder="Course Title"
        />

        <textarea
          name="desc"
          value={formData.desc || ""}
          onChange={handleChange}
          placeholder="Description"
        />

        <select
          name="status"
          value={formData.status}
          onChange={handleChange}
        >
          <option value={1}>Active</option>
          <option value={0}>Inactive</option>
        </select>

        <div className="modal-actions">
          <button onClick={onClose}>Cancel</button>
          <button onClick={handleSubmit}>Update</button>
        </div>

      </div>
    </div>
  );
};

export default EditCourseModal;