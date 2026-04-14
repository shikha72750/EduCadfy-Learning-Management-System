import { FaCoins, FaEdit, FaTrashAlt } from "react-icons/fa";

type MasterPlanProps = {
  id: number;
  name: string;
  desc: string;
  credit: number;
  price: number;
  offer: number;
  duration: number;
  is_rec: number;
  status: number;
  created_at: string;
  updated_at: string;
  onEdit?: (id: number) => void;
  onDelete?: (id: number) => void;
  onToggleStatus?: (id: number, status: number) => void;
};

const MasterPlanCard: React.FC<MasterPlanProps> = ({
  id,
  name,
  desc,
  credit,
  price,
  offer,
  duration,
  is_rec,
  status,
  onEdit,
  onDelete,
  onToggleStatus,
}) => {
  const discountedPrice = price - (price * offer) / 100;
  const pricePerJob = (discountedPrice / credit).toFixed(2);

  return (
    <>
      {/* 🔥 CSS INSIDE COMPONENT */}
      <style>{`
        .mp-card {
          position: relative;
          background: linear-gradient(145deg, #1c1f2e, #2a2f45);
          border-radius: 18px;
          padding: 20px;
          color: #fff;
          box-shadow: 0 10px 25px rgba(0,0,0,0.6);
          transition: 0.3s;
        }

        .mp-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 15px 35px rgba(0,0,0,0.8);
        }

        .mp-ribbon {
          position: absolute;
          top: 15px;
          right: -40px;
          background: #ff3b3b;
          padding: 5px 40px;
          transform: rotate(45deg);
          font-size: 11px;
          font-weight: bold;
        }

        .mp-title {
          font-weight: 600;
          margin-bottom: 5px;
        }

        .mp-desc {
          font-size: 13px;
          color: #aaa;
        }

        .mp-credit {
          margin-top: 10px;
          color: #00d4ff;
        }

        .mp-price-box h4 {
          margin: 10px 0 0;
        }

        .mp-old-price {
          text-decoration: line-through;
          color: #777;
        }

        .mp-job {
          display: inline-block;
          margin-top: 10px;
          padding: 5px 10px;
          background: #00cfe8;
          border-radius: 8px;
          color: #000;
          font-weight: 600;
        }

        .mp-offer {
          color: orange;
          font-size: 13px;
        }

        .mp-duration {
          font-size: 12px;
          color: #aaa;
          margin-bottom: 10px;
        }

        .mp-actions {
          display: flex;
          gap: 8px;
          margin-top: 15px;
        }

        .mp-btn {
          flex: 1;
          border: none;
          padding: 7px;
          border-radius: 8px;
          font-size: 13px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 5px;
        }

        .mp-btn.edit {
          background: #1e6be3;
          color: white;
        }

        .mp-btn.delete {
          background: #dc3545;
          color: white;
        }

        .mp-btn.status.active {
          background: #ffc107;
          color: black;
        }

        .mp-btn.status.inactive {
          background: #28a745;
          color: white;
        }
      `}</style>

      {/* 🔥 CARD UI */}
      <div className="col-lg-4 col-md-6 col-sm-10 col-11 mx-auto mb-4">
        <div className="mp-card">

          {is_rec === 1 && (
            <div className="mp-ribbon">RECOMMENDED</div>
          )}

          <h5 className="mp-title">{name}</h5>
          <p className="mp-desc">{desc}</p>

          <div className="mp-credit">
            <FaCoins /> {credit} Credits
          </div>

          <div className="mp-price-box">
            <h4>₹ {discountedPrice}</h4>
            {offer > 0 && (
              <small className="mp-old-price">₹ {price}</small>
            )}
          </div>

          <div className="mp-job">₹ {pricePerJob} / job</div>

          {offer > 0 && (
            <div className="mp-offer">↓ {offer}% Off</div>
          )}

          <div className="mp-duration">
            Valid for {duration} days
          </div>

          <div className="mp-actions">
            <button
              className="mp-btn edit"
              onClick={() => onEdit?.(id)}
            >
              <FaEdit /> Edit
            </button>

            <button
              className={`mp-btn status ${
                status === 1 ? "active" : "inactive"
              }`}
              onClick={() => onToggleStatus?.(id, status)}
            >
              {status === 1 ? "Active" : "Inactive"}
            </button>

            <button
              className="mp-btn delete"
              onClick={() => onDelete?.(id)}
            >
              <FaTrashAlt /> Delete
            </button>
          </div>

        </div>
      </div>
    </>
  );
};

export default MasterPlanCard;