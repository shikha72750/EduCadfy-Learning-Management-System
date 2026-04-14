import React from 'react'
 
import { FaCoins,  FaCalendarAlt, FaSyncAlt } from "react-icons/fa";

type MasterPlanProps = {
  id: number;
  name: string;
  desc: string;
  credit: number;
  price: number;
  offer: number; // discount %
  duration: number; // validity in days
  is_rec: number; // recommended flag
  status: number;
  created_at: string;
  updated_at: string;
 
};

const UserMasterPlanCard: React.FC<MasterPlanProps> = ({
 
  name,
  desc,
  credit,
  price,
  offer,
  duration,
  is_rec, 
  created_at,
  updated_at, 
}) => {
  const discountedPrice = price - (price * offer) / 100;
  const pricePerCredit = (discountedPrice / credit).toFixed(2);

  return (
    <div className="col-lg-3 col-md-4 col-sm-6 mb-4">
      <div className="card h-100 course-card border-0 rounded-3 overflow-hidden">
        {/* Recommended Badge */}
        {is_rec === 1 && (
          <div
            className="position-absolute px-4 py-1 fw-bold bg-danger text-white"
            style={{
              top: "20px",
              right: "-30px",
              transform: "rotate(45deg)",
              fontSize: "9px",
              zIndex: 10,
              width: "120px",
              textAlign: "center",
              boxShadow: "0 2px 4px rgba(0,0,0,0.3)"
            }}
          >
            RECOMMENDED
          </div>
        )}

        {/* Card Body */}
        <div className="card-body d-flex flex-column p-3">
          {/* Plan Name */}
          <h6 className="card-title fw-bold mb-2 text-primary text-truncate" title={name}>
            {name}
          </h6>

          {/* Credits */}
          <div className="d-flex align-items-center mb-2 small text-white">
            <FaCoins className="me-2 text-warning" />
            <span className="fw-bold">{credit} Credits</span>
          </div>

          <hr className="my-2 border-secondary opacity-25" />

          {/* Pricing Section */}
          <div className="d-flex align-items-baseline gap-2 mb-1">
            <h4 className="mb-0 fw-bold text-white">₹{discountedPrice}</h4>
            {offer > 0 && (
              <span className="text-white opacity-50 text-decoration-line-through x-small">
                ₹{price}
              </span>
            )}
          </div>

          {/* Offer & Status */}
          <div className="d-flex justify-content-between align-items-center mb-3">
             {offer > 0 ? (
               <span className="badge bg-success bg-opacity-25 text-success border border-success border-opacity-25 x-small px-2 py-1">
                 {offer}% OFF
               </span>
             ) : <div />}
             
          </div>

          <div className="text-white opacity-50 x-small mb-3" style={{ fontSize: '0.7rem' }}>
             ₹ {pricePerCredit} / Credit • Valid {duration} days
          </div>

          {/* Description */}
          {desc && (
            <p className="text-white opacity-75 small mb-3 text-truncate-2" style={{ fontSize: '0.8rem', minHeight: '2.4rem' }}>
              {desc}
            </p>
          )}

          <div className="mt-auto">
            <div className="d-flex flex-wrap justify-content-between x-small text-white opacity-50 mb-2" style={{ fontSize: '0.65rem' }}>
              <span><FaCalendarAlt className="me-1" /> {new Date(created_at).toLocaleDateString()}</span>
              <span><FaSyncAlt className="me-1" /> {new Date(updated_at).toLocaleDateString()}</span>
            </div>
          </div>

          {/* Actions */}
          <div className="d-flex gap-2 mt-auto pt-2 border-top border-secondary border-opacity-10">
            <button className='btn btn-warning text-light w-100'>Purchase Credit</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserMasterPlanCard;