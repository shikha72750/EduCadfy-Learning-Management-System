import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { showAlert } from "../utils";
import { createMasterPlan } from "../services/services";
import "../styles/masterplanform.css";

// Schema
const schema = yup.object().shape({
  name: yup.string().required().min(3).max(50),
  desc: yup.string().required().min(5).max(255),
  credit: yup.number().typeError("Must be number").required(),
  price: yup.number().typeError("Must be number").required(),
  offer: yup.number().typeError("Must be number").required(),
  duration: yup.number().typeError("Must be number").required(),
  is_rec: yup.number().oneOf([0, 1]).default(1),
  status: yup.number().oneOf([0, 1]).default(1),
});

const MasterPlanForm = ({ onSuccess }: any) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: { status: 1 },
  });

  const onSubmit = async (data: any) => {
    try {
      const res = await createMasterPlan(data);

      if (res.success) {
        showAlert("Master Plan", res?.message, "success");
        reset(); // form clear
        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        onSuccess && onSuccess(); // 🔥 refresh list
      } else {
        showAlert("Master Plan", res?.message, "error");
      }
    } catch {
      showAlert("Master Plan", "Internal server error", "error");
    }
  };

  return (
    <div className="form-container">
      <div className="form-card">
        <h2>Create Master Plan 🚀</h2>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-grid">

            <div className="form-group">
              <input {...register("name")} placeholder=" " />
              <label>Master Plan Name</label>
              <span>{errors.name?.message}</span>
            </div>

            <div className="form-group">
              <input {...register("desc")} placeholder=" " />
              <label>Description</label>
              <span>{errors.desc?.message}</span>
            </div>

            <div className="form-group">
              <input type="number" {...register("credit")} placeholder=" " />
              <label>Credit</label>
              <span>{errors.credit?.message}</span>
            </div>

            <div className="form-group">
              <input type="number" {...register("price")} placeholder=" " />
              <label>Price</label>
              <span>{errors.price?.message}</span>
            </div>

            <div className="form-group">
              <input type="number" {...register("offer")} placeholder=" " />
              <label>Offer</label>
              <span>{errors.offer?.message}</span>
            </div>

            <div className="form-group">
              <input type="number" {...register("duration")} placeholder=" " />
              <label>Duration</label>
              <span>{errors.duration?.message}</span>
            </div>

            <div className="form-group">
              <select {...register("is_rec")}>
                <option value={1}>Recommended</option>
                <option value={0}>Not Recommended</option>
              </select>
              <label className="active">Recommended</label>
            </div>

            <div className="form-group">
              <select {...register("status")}>
                <option value={1}>Active</option>
                <option value={0}>Inactive</option>
              </select>
              <label className="active">Status</label>
            </div>

          </div>

          <button className="submit-btn">Create Plan</button>
        </form>
      </div>
    </div>
  );
};

export default MasterPlanForm;