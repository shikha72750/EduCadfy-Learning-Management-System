import React from "react";

import "../../styles/pricingCard.css";
import { userpurchasePlan } from "../services/services";
import { showAlert } from "../utils";

export interface CoursePlan {
  id: number;
  name: string;
  credit: string;
  price: number;
  offer: string;
  duration: string;
  is_rec: number;
}

const calcTotalPrice = (price: number, offer: string): number => {
  const discount = parseFloat(offer) || 0;
  return Math.round(price - (price * discount) / 100);
};

// Check Icon
const CheckIcon: React.FC = () => (
  <svg
    className="feature-check"
    viewBox="0 0 20 20"
    fill="none"
  >
    <path
      d="M5 10.5L8.5 14L15 7"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);



const PricingCard: any = ({ plan, index }: any) => {
  const totalPrice = calcTotalPrice(plan.price, plan.offer);

  const pricePerCredit = parseFloat(plan.credit)
    ? (totalPrice / parseFloat(plan.credit))
    : 0;

  const isRec = plan.is_rec === 1;


  const purachasePlan = async (plan: any) => {
    const res = await userpurchasePlan(plan);
    if (res.success) {
      showAlert("Plan", res.message, "success")
    } else {
      showAlert("Plan", res.message, "error")
    }

  }
  return (
    <div className={`pricing-card card-accent-${index % 3} h-100`}>
      <div className="card-pattern" />

      {isRec && <span className="featured-badge">Recommended</span>}

      <div className="card-top">

        <div className="card-top">
          <div className="card-price-row">
            <p className="card-price">
              ₹{plan.price.toLocaleString("en-IN")}
            </p>
          </div>
          <p className="card-plan-name">{plan.name}</p>

          <div className="card-total-row">
            <span>Total after {plan.offer}% off ₹{totalPrice.toLocaleString("en-IN")}</span>
          </div>
        </div>
        <button className="card-cta-btn filled w-100" onClick={() => purachasePlan(plan.id)}>
          Purchase Plan
        </button>
      </div>

      <ul className="card-features-list">
        <li>
          <CheckIcon />
          <span>
            <strong>{plan.credit}</strong> Credits
          </span>
        </li>

        <li>
          <CheckIcon />
          <span>₹{pricePerCredit} per credit</span>
        </li>

        <li>
          <CheckIcon />
          <span>
            Valid for <strong>{plan.duration}</strong> days
          </span>
        </li>
      </ul>
    </div>
  );
};

export default PricingCard;