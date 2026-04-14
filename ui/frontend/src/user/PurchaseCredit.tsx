
import DashboardLayout from "../layout/DashboardLayout"
 
import { useEffect, useState } from "react";  
import UserMasterPlanCard from "./UserMasterPlanCard";
import { getMasterPlan } from "../services/services";

const PurchaseCredit = () => { 
  const [masterPlan, setMasterPlan] = useState([])
  const fetchData = async () => {
    const res = await getMasterPlan()
    setMasterPlan(res?.result || [])
  }
  useEffect(() => {
    fetchData()
  }, [])
 

 


  return (
    <DashboardLayout>
      <div className="container-fluid py-3 px-4 overflow-hidden my-bg-dark">
        <div className="row">
          <div className="col-12 mx-auto">
            <div className="d-flex text-dark justify-content-between align-items-center mb-4">
              <h2 className="fw-bold m-0">Purchase Credit</h2>
            </div>

            {/* Cards */}
            <div className="row g-4">
              {masterPlan.map((sub: any) => (
                <UserMasterPlanCard
                  key={sub.id}
                  {...sub}
                 
                />
              ))}
            </div>

          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default PurchaseCredit;
