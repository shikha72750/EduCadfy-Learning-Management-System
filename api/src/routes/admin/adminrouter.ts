import express from 'express';
import { adminLogin, adminRegister } from '../../controller/admincontroller/admincontroller';
const adminRouter=express.Router();

adminRouter.post("/register", adminRegister)
adminRouter.post("/login", adminLogin)

export default adminRouter;