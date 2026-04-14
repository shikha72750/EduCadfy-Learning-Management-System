import React from "react";
import "../styles/mastercoursecard.css"

type CourseCardProps = {
  id: number;
  name: string;
  desc: string;
  status: number;
  created_at: string;
  updated_at: string;
  image?: string;
  onEdit?: (id: number) => void;
  onDelete?: (id: number) => void;
};

const MasterCourseCard: React.FC<CourseCardProps> = ({
  id,
  name,
  desc,
  status,
  created_at,
  updated_at,
  image,
  onEdit,
  onDelete,
}) => {
  return (
    <div className="card-wrapper">
      <div className="modern-card">

        {/* Image */}
        <div className="card-img-wrapper">
          <img
            src={image || "https://via.placeholder.com/300"}
            alt={name}
          />

          {/* Status badge on image */}
          <span className={`status-badge ${status ? "active" : "inactive"}`}>
            {status ? "Active" : "Inactive"}
          </span>
        </div>

        {/* Content */}
        <div className="card-content">

          <h5>{name}</h5>
          <p>{desc}</p>

          {/* Dates */}
          <div className="card-dates">
            <span>📅 {new Date(created_at).toLocaleDateString()}</span>
            <span>🕒 {new Date(updated_at).toLocaleDateString()}</span>
          </div>

          {/* Actions */}
          <div className="card-actions">
            <button onClick={() => onEdit?.(id)} className="edit-btn">
              ✏️
            </button>

            <button onClick={() => onDelete?.(id)} className="delete-btn">
              🗑
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default MasterCourseCard;