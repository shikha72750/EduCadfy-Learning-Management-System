import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import DashboardLayout from "../layout/DashboardLayout";
import { getMasterPlanById, updateMasterPlan } from "../services/services"; // ✅ sahi imports
import { showAlert } from "../utils";
import "../styles/UpdateMasterPlan.css";

const UpdateMasterPlan = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState<any>({
    name: "",
    desc: "",
    credit: "",
    price: "",
    offer: "",
    duration: "",
    is_rec: 1,
    status: 1,
  });

  // ✅ ID se directly single plan fetch karo
  const fetchSingle = async () => {
    try {
      const res = await getMasterPlanById(id);
      if (res?.result) {
        setFormData(res.result);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchSingle();
  }, []);

  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ✅ updateMasterPlan service use karo
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const res = await updateMasterPlan(id, formData);
      if (res?.success) {
        showAlert("Update Plan", "Updated successfully", "success");
        navigate("/admin/master-plan"); // ✅ sahi route
      } else {
        showAlert("Update Plan", res.message, "error");
      }
    } catch {
      showAlert("Update Plan", "Error updating plan", "error");
    }
  };

  return (
    <DashboardLayout>
      <div className="edit-wrapper">
        <div className="edit-card">
          <h2>Edit Master Plan ✏️</h2>
          <form onSubmit={handleSubmit} className="edit-form">
            <input name="name" value={formData.name} onChange={handleChange} placeholder="Name" />
            <input name="desc" value={formData.desc} onChange={handleChange} placeholder="Description" />
            <input name="credit" value={formData.credit} onChange={handleChange} placeholder="Credit" />
            <input name="price" value={formData.price} onChange={handleChange} placeholder="Price" />
            <input name="offer" value={formData.offer} onChange={handleChange} placeholder="Offer %" />
            <input name="duration" value={formData.duration} onChange={handleChange} placeholder="Duration" />

            <select name="is_rec" value={formData.is_rec} onChange={handleChange}>
              <option value={1}>Recommended</option>
              <option value={0}>Not Recommended</option>
            </select>

            <select name="status" value={formData.status} onChange={handleChange}>
              <option value={1}>Active</option>
              <option value={0}>Inactive</option>
            </select>

            <button type="submit">Update Plan</button>
          </form>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default UpdateMasterPlan;