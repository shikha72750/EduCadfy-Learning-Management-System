import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

// Validation schema
const schema = yup.object().shape({
  email: yup.string().required("Email is required").email("Invalid email format"),
});

const ResetPasswordForm = ({ onSubmit }: { onSubmit: (data: any) => void }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      email: "",
    },
  });

  const handleFormSubmit = (data: any) => {
    onSubmit(data); // Pass data to parent
    reset();
  };

  return (
    <div className="row mt-5 mx-auto">
      <div className="col-lg-4 mx-auto">
        <div className="form-section-card py-5">
          <p className="access-title fs-3 text-center">
                Reset Password
              </p>
          <form onSubmit={handleSubmit(handleFormSubmit)}>
                {/* Email Input */}
                <div className="mb-4">
                  <label className="form-label-premium">Email *</label>
                  <input
                    type="email"
                    {...register("email")}
                    className="form-control-premium w-100"
                    placeholder="Enter email"
                  />
                  {errors.email && (
                    <small className="text-danger mt-1 d-block">
                      {errors.email.message}
                    </small>
                  )}
                </div>

                {/* Button */}
                <div className="d-flex justify-content-end gap-2">
                  <button type="submit" className="btn btn-submit">
                    Send OTP
                  </button>
                </div>
              
          </form>
        </div>
      </div>
    </div>

  );
};

export default ResetPasswordForm;