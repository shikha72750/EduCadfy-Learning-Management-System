
import React, { useEffect, useState } from "react";


import { getPublicMasterPlan } from "../services/services";
import PricingCard from "../common/PricingCard";
import Footer from "./Footer";
import Navbar from "./Navbar";

const Pricing: React.FC = () => {
  const [masterPlan, setMasterPlan] = useState([])
  const fetchData = async () => {
    const res = await getPublicMasterPlan()
    setMasterPlan(res?.result || [])
  }
  useEffect(() => {
    fetchData()
  }, [])
  return (
    <>
      <Navbar />
      <section className="pricing-section">
        <div className="container mb-4">
          <div className="row pricing-header">
            <div className="col-md-6">
              <h1>Flexible Plans <br />For Every Learner</h1>
            </div>

            <div className="col-md-6">
              <p>Pick a plan that suits your goals.</p>
              <p>Get the right balance of price,credits, and duration for your journey.</p>
            </div>
          </div>
        </div>

        <div className="container">
          <div className="row g-4">
            {masterPlan.map((plan, index) => (
              <div
                key={index}
                className="col-12 col-sm-6 col-lg-4 col-xl-3"
              >
                <PricingCard plan={plan} index={index} />
              </div>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default Pricing;
