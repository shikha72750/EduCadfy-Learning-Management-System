import express from "express";
import { userLogin, userRegister } from "../../controller/usercontroller/usercontroller";
const userRouter = express.Router();
userRouter.post("/register", userRegister);  
userRouter.post("/login", userLogin);
export default userRouter;
