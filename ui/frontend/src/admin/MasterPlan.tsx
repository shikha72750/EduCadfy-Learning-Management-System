import { useEffect, useState } from "react";
import DashboardLayout from "../layout/DashboardLayout";
import MasterPlanCard from "./MasterPlanCard";
import { deleteMasterPlan, getMasterPlan } from "../services/services";
import { showAlert,confirmDeletion } from "../utils";
import "../styles/masterplan.css"
import { useNavigate } from "react-router-dom";


const MasterPlan = () => {
  const navigate = useNavigate()
  const [masterPlan, setMasterPlan] = useState([]);

  const fetchData = async () => {
    const res = await getMasterPlan();
    setMasterPlan(res?.result || []);
  };

  useEffect(() => {
    fetchData();  
  }, []);

  const handleEditPlan = (id: any) => {
    navigate(`admin/update-master-plan/${id}`);
  };

  const handleDeletePlan = async (id: any) => {
    const confirmed = await confirmDeletion("master plan");
    if (!confirmed) return;

    const res = await deleteMasterPlan(id);
    if (res?.success) {
      showAlert("Delete Plan", res.message, "success");
      fetchData();
    } else {
      showAlert("Delete Plan", res.message, "error");
    }
  };

  const handleTogglePlanStatus = (id: any, currentStatus: any) => {
    console.log("Toggle status for plan", id, currentStatus);
  };

  return (
    <DashboardLayout>
      <div className="mp-wrapper">

        {/* 🔥 Header */}
        <div className="mp-header">
          <div>
            <h2>Master Plans</h2>
            <p>All your created plans in one place</p>
          </div>
        </div>

        {/* 🔥 Cards */}
        <div className="row g-4 mt-2">
          {masterPlan.length > 0 ? (
            masterPlan.map((sub: any) => (
              <MasterPlanCard
                key={sub.id}
                {...sub}
                onEdit={(id) => handleEditPlan(id)}
                onDelete={(id) => handleDeletePlan(id)}
                onToggleStatus={(id, status) =>
                  handleTogglePlanStatus(id, status)
                }
              />
            ))
          ) : (
            <div className="mp-empty">
              <h4>No Plans Found 😕</h4>
              <p>Create a plan to get started</p>
            </div>
          )}
        </div>

      </div>
    </DashboardLayout>
  );
};

export default MasterPlan;