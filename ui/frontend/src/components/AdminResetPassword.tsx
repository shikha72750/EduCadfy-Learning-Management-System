
import ResetPasswordForm from "../common/ResetPasswordForm";
import { adminForgetPasswordService } from "../services/services";
import { showAlert } from "../utils";

const AdminResetPassword = () => {
  const handleFormData = async (data: any) => {
    try {
      const res = await adminForgetPasswordService({ email: data.email });
      if (res.success) {
        showAlert("Admin Reset Password", res.message, "success");
      } else {
        showAlert("Admin Reset Password", res.message, "error");
      }
    } catch (err: any) {
      showAlert("Admin Reset Password", err?.response?.data?.message || "Internal Server Error", "error");
    }
  };

  return (
    <>
      
      <div className="container-fluid py-5 px-4 overflow-hidden">
        
            <ResetPasswordForm onSubmit={handleFormData} />
          
      </div>
    </>
  );
};

export default AdminResetPassword;