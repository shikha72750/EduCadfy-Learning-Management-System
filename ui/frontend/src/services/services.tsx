import axios from "axios";
import { store } from "../redux/store";

const BASE_URL = "http://localhost:8000";
const PUBLIC_ROUTES = [
  "/user/register",
  "/user/login",
  "/admin/login",
  "/user/user-master-plan",
  "public/get-rec-plan",
];

const api = axios.create({ baseURL: BASE_URL });

api.interceptors.request.use(
  (config) => {
    if (!config?.url) return config;

    const url = config.url.startsWith("http")
      ? new URL(config.url).pathname
      : config.url;

    const isPublic = PUBLIC_ROUTES.some((route) => url.includes(route));

    if (!isPublic) {
      const tokenFromStore = store.getState().auth.token;
      const tokenFromStorage = localStorage.getItem("token");
      const token =
        tokenFromStore ||
        (tokenFromStorage ? JSON.parse(tokenFromStorage) : null);

      if (token) {
        const headers = {
          ...(config.headers as Record<string, unknown> | undefined),
          Authorization: `Bearer ${token}`,
        };
        config.headers = headers as any;
      }
    }

    return config;
  },
  (error) => Promise.reject(error),
);

export const userRegisterService = async (data: any) => {
  const res = await api.post("/user/register", data);
  return res?.data;
};

export const userLoginService = async (data: any) => {
  const res = await api.post("/user/login", data);
  return res?.data;
};

export const adminLoginService = async (data: any) => {
  const res = await api.post("/admin/login", data);
  return res?.data;
};

export const userUpdatePasswordService = async (data: any) => {
  const res = await api.put("/user/update-password", data);
  return res?.data;
};

export const adminUpdatePasswordService = async (data: any) => {
  const res = await api.put("/admin/update-password", data);
  return res?.data;
};

export const userForgetPasswordService = async (data: any) => {
  const res = await api.post("/user/forget-password", data);
  return res?.data;
};

export const adminForgetPasswordService = async (data: any) => {
  const res = await api.post("/admin/forget-password", data);
  return res?.data;
};

export const createMasterPlan = async (data: any) => {
  const res = await api.post("/admin/create-master-plan", data);
  return res?.data;
};

export const getMasterPlan = async () => {
  const res = await api.get("/admin/get-master-plan");
  return res?.data;
};

export const deleteMasterPlan = async (id: any) => {
  const res = await api.delete(`/admin/delete-master-plan/${id}`);
  return res?.data;
};

export const getMasterPlanById = async (id: any) => {
  const res = await api.get(`/admin/get-master-plan/${id}`);
  return res?.data;
};

export const updateMasterPlan = async (id: any, data: any) => {
  const res = await api.put(`/admin/update-master-plan/${id}`, data);
  return res?.data;
};

export const createMasterCourse = async (data: FormData) => {
  const res = await api.post("/admin/create-master-course", data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return res?.data;
};

export const getMasterCourse = async () => {
  const res = await api.get("/admin/get-master-course");
  return res?.data;
};

export const deleteMasterCourse = async (id: any) => {
  const res = await api.delete(`/admin/delete-master-course/${id}`);
  return res?.data;
};

export const getMasterCourseById = async (id: any) => {
  const res = await api.get(`/admin/get-master-course/${id}`);
  return res?.data;
};

export const updateMasterCourse = async (id: any, data: FormData) => {
  const res = await api.put(`/admin/update-master-course/${id}`, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return res?.data;
};

export const getFile = async (fileName: string) => {
  const res = await api.get(`/file/${fileName}`, {
    responseType: "blob",
  });
  return res?.data;
};

export const getAllUsers = async () => {
  const res = await api.get("/admin/get-all-users");
  return res?.data;
};

export const deleteUser = async (id: any) => {
  const res = await api.delete(`/admin/delete-user/${id}`);
  return res?.data;
};

export const getDashboardStats = async () => {
  const res = await api.get("/admin/get-dashboard-stats");
  return res?.data;
};

// Public APIs
export const getRecMasterPlan = async () => {
  const res = await api.get("/public/get-rec-plan");
  return res?.data;
};

export const getPublicMasterPlan = async () => {
  const res = await api.get("/public/get-master-plan");
  return res?.data;
};

// users
export const userpurchasePlan = async (plan_id: any) => {
  const res = await api.post("/user/user-purchase-plan", { plan_id });
  return res?.data;
};

export const getUsersPlan = async () => {
  const res = await api.get("/user/user-purchased-plan");
  return res?.data;
};

export const getUsersViewCourse = async () => {
  const res = await api.get("/user/user-view-course");
  return res?.data;
};

export const getUserState = async () => {
  try {
    const res = await api.get("/user/user-state");
    return res?.data;
  } catch (error) {
    console.error("Failed to fetch user state", error);
    return null;
  }
};

export const resetPassword = async (data: any) => {
  try {
    const res = await api.post("/user/forget-password", data);
    return res?.data;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const userUpdateProfile = async (data: any) => {
  const formData = new FormData();
  
  formData.append("name", data.name);
  formData.append("email", data.email);
  formData.append("mobile", data.mobile);
  formData.append("address", data.address);
  
  if (data.profile) {
    formData.append("profile", data.profile); // File object
  }

  const res = await api.put("/user/update-profile", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return res?.data;
};