import ResetPasswordForm from "../common/ResetPasswordForm";
import { userForgetPasswordService } from "../services/services";
import { showAlert } from "../utils";



const ForgetPassword = () => {

  const handleFormData = async (data: any) => {
    try {
      const res = await userForgetPasswordService({ email: data.email });
      if (res.success) {
        showAlert("Forget Password", res.message, "success");
      } else {
        showAlert("Forget Password", res.message, "error");
      }
    } catch (err: any) {
      showAlert("Forget Password", err?.response?.data?.message || "Internal Server Error", "error");
    }
  };

  return (

    <div className=" container-fluid py-3 px-4 overflow-hidden">
      
          <ResetPasswordForm onSubmit={handleFormData} />
       
    </div>
  )
}

export default ForgetPassword