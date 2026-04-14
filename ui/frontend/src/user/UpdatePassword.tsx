import UpdatePasswordForm from "../common/UpdatePasswordForm"
import DashboardLayout from "../layout/DashboardLayout"
import { userUpdatePasswordService } from "../services/services";
import { toast } from "react-toastify";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { clearAuth } from "../redux/slice/authSlice";


const UserUpdatePassword = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleFormData = async (data: any) => {
    setLoading(true);
    try {
      const response = await userUpdatePasswordService({
        oldPassword: data.oldPassword,
        newPassword: data.newPassword,
      });
      if (response.success) {
        toast.success("Password updated successfully!");
        dispatch(clearAuth());
        navigate("/login");
      } else {
        toast.error(response.message || "Failed to update password");
      }
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <DashboardLayout>
      <div className="container-fluid  py-3 px-4 overflow-hidden">
        <div className="row">
          <div className="col-lg-12 mx-auto text-light">
            <h2 className="fw-bold ">Update Password</h2>
            <UpdatePasswordForm onSubmit={handleFormData} />
            {loading && <p>Updating...</p>}
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}

export default UserUpdatePassword