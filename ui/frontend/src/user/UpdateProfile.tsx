import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useState, useContext } from "react";
import * as yup from "yup";
import { showAlert } from "../utils";
import { userUpdateProfile } from "../services/services";
import { UserContext } from "../context/user/UserContext";
import DashboardLayout from "../layout/DashboardLayout";

const schema = yup.object().shape({
  name: yup.string().required().min(3),
  email: yup.string().email().optional(),
  mobile: yup.string().required(),
  address: yup.string().required(),
  profile: yup.mixed().optional(),
});

const UpdateProfile = () => {
  const { user, setUser }: any = useContext(UserContext);
  const [loading] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {         // ✅ default values set karo
      name: "",
      email: "",
      mobile: "",
      address: "",
    },
  });

  useEffect(() => {
    if (user) {
      setValue("name", user.name ?? "");       // ✅ null/undefined → ""
      setValue("email", user.email ?? "");
      setValue("mobile", user.mobile ?? "");   // ✅ null safe
      setValue("address", user.address ?? ""); // ✅ null safe
    }
  }, [user, setValue]);

  const onSubmit = async (data: any) => {
    try {
      const formData = new FormData();
      formData.append("name", data.name ?? "");
      formData.append("email", data.email ?? "");
      formData.append("mobile", data.mobile ?? "");
      formData.append("address", data.address ?? "");

      if (data.profile && data.profile[0]) {
        formData.append("profile", data.profile[0]);
      }

      const res = await userUpdateProfile(formData);

      if (res.success) {
        showAlert("Profile", res.message, "success");
        setUser(res?.result);
      } else {
        showAlert("Profile", res.message, "error");
      }
    } catch (error: any) {
      console.error("Full error:", error);
      showAlert(
        "Profile",
        error?.response?.data?.message || "Internal Server Error",
        "error"
      );
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <DashboardLayout>
      <div className="container py-4">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="row p-4">
            <h2>Update Profile</h2>

            <div className="col-md-6 mb-3">
              <label>Name</label>
              <input {...register("name")} className="form-control" />
              <small className="text-danger">{errors.name?.message}</small>
            </div>

            <div className="col-md-6 mb-3">
              <label>Email</label>
              <input disabled {...register("email")} className="form-control" />
              <small className="text-danger">{errors.email?.message}</small>
            </div>

            <div className="col-md-6 mb-3">
              <label>Mobile</label>
              <input {...register("mobile")} className="form-control" />
              <small className="text-danger">{errors.mobile?.message}</small>
            </div>

            <div className="col-md-6 mb-3">
              <label>Address</label>
              <input {...register("address")} className="form-control" />
              <small className="text-danger">{errors.address?.message}</small>
            </div>

            <div className="col-md-6 mb-3">
              <label>Profile Image</label>
              <input
                type="file"
                className="form-control"
                accept="image/*"
                onChange={(e) => {
                  if (e.target.files?.length) {
                    setValue("profile", e.target.files); // ✅ FileList store
                  }
                }}
              />
            </div>

            <div className="col-md-6 mb-3">
              <button type="submit" className="btn btn-primary w-100 mt-4 py-2">
                Update Profile
              </button>
            </div>
          </div>
        </form>
      </div>
    </DashboardLayout>
  );
};

export default UpdateProfile;