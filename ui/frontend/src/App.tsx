import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.bundle.js";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import { About } from './components/About';
import Courses from './components/Courses';
import Contactus from './components/Contactus';
import Register from './components/Register';
import Login from './components/Login';
import AdminLogin from './components/AdminLogin';
import AdminDashboard from './admin/AdminDashborad';
import Users from './admin/Users';
import CreateMasterPlan from './admin/CreateMasterPlan';
import MasterPlan from './admin/MasterPlan';
import MasterCourse from './admin/MasterCourse';
import CreateMasterCourse from './admin/CreateMasterCard';
import UpdateMasterPlan from './admin/UpdateMasterPlan';
import UserDashboard from './user/UserDashboard';
import PurchaseCredit from './user/PurchaseCredit';
import UserPlans from './user/UserPlan';
import PurchaseCourse from './user/PurchaseCourse';
import CodeExplainer from './user/AiTools/AiTutor';
import BugDetective from './user/AiTools/BugDetective';
import CodeRoaster from './user/AiTools/CodeRoaster';
import VoiceChat from './user/AiTools/Chatbot';
import AIToolsPage from './user/AiToolsPages';
import UserCourse from "./user/PurchaseCourse";
import UpdatePassword from "./user/UpdatePassword";
import UpdateProfile from "./user/UpdateProfile";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          {/* Public Routes */}
          <Route path='/' element={<Home />} />
          <Route path='/about' element={<About />} />
          <Route path='/courses' element={<Courses />} />
          <Route path='/contact' element={<Contactus />} />
          <Route path='/register' element={<Register />} />
          <Route path='/login' element={<Login />} />
          <Route path='/admin-login' element={<AdminLogin />} />

          {/* Admin Routes */}
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
          <Route path="/admin/users" element={<Users />} />
          <Route path="/admin/create-master-plan" element={<CreateMasterPlan />} />
          <Route path="/admin/master-plan" element={<MasterPlan />} />
          <Route path="/admin/update-master-plan/:id" element={<UpdateMasterPlan />} />
          <Route path="/admin/create-master-course" element={<CreateMasterCourse />} />
          <Route path="/admin/master-course" element={<MasterCourse />} />

          {/* User Routes */}
          <Route path="/user-dashboard" element={<UserDashboard />} />
          <Route path="/user/purchase-credit" element={<PurchaseCredit />} />
          <Route path="/user/plans" element={<UserPlans />} />
          <Route path="/user/purchase-course" element={<PurchaseCourse />} />
          <Route path="/user/course" element={<UserCourse />} />
          <Route path="/user/ai-tools" element={<AIToolsPage />} />
          <Route path="/user/ai-tools/explainer" element={<CodeExplainer />} />
          <Route path="/user/ai-tools/debugger" element={<BugDetective />} />
          <Route path="/user/ai-tools/roaster" element={<CodeRoaster />} />
          <Route path="/user/ai-tools/voice" element={<VoiceChat />} />
          {/* User Routes mein add karo */}
         <Route path="/user/update-password" element={<UpdatePassword />} />
         <Route path="/user/update-profile" element={<UpdateProfile />} />
          <Route path="/user/purchase-course" element={<PurchaseCourse />} />  {/* already hai, check karo */}
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;