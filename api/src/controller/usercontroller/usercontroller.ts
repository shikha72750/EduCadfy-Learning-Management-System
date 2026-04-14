
import 'dotenv/config';
import {users} from "../../entities/user"
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'
import { createResponse } from "../../helper/createResponse";
import { forgetPasswordService } from '../../services/userForgetPasswordServices';
import { uploadFile } from '../../helper/fileUpload';
export const userRegister = async (req: any, res: any) => {
    try {
        const { name, email, password = "Test@12345", mobile } = req.body;
        const isExist = await users.findOne({ where: { email: email } });
        if (isExist) {
            return createResponse(res, false, 400, "User Already Exists", [], true);
        } else {
            const hashedPassword = await bcrypt.hash(password, 10)
            const result = await users.save({ name, email, mobile, password: hashedPassword })
            return createResponse(res, true, 200, "User register successfully", result, false);
        }


    } catch (error) {
        return createResponse(res, false, 500, "Internal Server Error", [], true);
    }
}

export const userLogin = async (req: any, res: any) => {
  const {email,password}=req.body;
 try{  
    const isExist = await users.findOne({ where: { email } });
     if(!isExist){
      return createResponse(res, false, 404, "User Not Found", [], true);
     }else{
         const isMatched=await bcrypt.compare(password,isExist?.password);
         if(!isMatched){
           return createResponse(res, false, 404, "Please enter valid password", [], true);
         }else{
          // const token=generateToken()
          const token= jwt.sign({email:isExist.email, id: isExist.id},process.env.JWT_SECRET as string,{expiresIn:'24h'})
           return createResponse(res, true, 200, "Login successfull",{ isExist,token}, false,);
         }
     } 
 }catch(error){
 return createResponse(res, false, 500, "Internal Server Error", [], true);
 }
};

export const getAllUsers = async (req: any, res: any) => {
  try {
    const allUsers = await users.find(); // fetch all registered users
    return createResponse(res, true, 200, "Users fetched successfully", allUsers, false);
  } catch (error) {
    return createResponse(res, false, 500, "Internal Server Error", [], true);
  }
};


export const userForgetPassword = async (req: any, res: any) => {
  const { email } = req.body;
  
  const result = await forgetPasswordService(email);
  
  return createResponse(
    res,
    result.success,
    result.status,
    result.message,
    [],
    !result.success
  );
};

export const userUpdatePassword = async (req: any, res: any) => {
  const { oldPassword, newPassword } = req.body;
  const userId = req.user.id; // Assuming from auth middleware

  try {
    const user = await users.findOne({ where: { id: userId } });
    if (!user) {
      return createResponse(res, false, 404, "User not found", [], true);
    }

    const isOldPasswordValid = await bcrypt.compare(oldPassword, user.password);
    if (!isOldPasswordValid) {
      return createResponse(res, false, 400, "Old password is incorrect", [], true);
    }

    const hashedNewPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedNewPassword;
    await user.save();

    return createResponse(res, true, 200, "Password updated successfully", [], false);
  } catch (error) {
    return createResponse(res, false, 500, "Internal Server Error", [], true);
  }
};


export const userUpdateProfile = async (req: any, res: any) => {
  console.log("🚀 HIT");
  console.log("Body:", req.body);
  console.log("File:", req.file);
  console.log("User:", req.user);
  try {
    const { name, mobile, address } = req.body;
    const userId = req.user.id;

    const user = await users.findOne({ where: { id: userId } });
    if (!user) return createResponse(res, false, 404, "User not found", [], true);

    // ✅ Sirf wahi update karo jo aaya hai
    const updateData: any = {};
    if (name && name !== "undefined") updateData.name = name;
    if (mobile && mobile !== "undefined") updateData.mobile = mobile;
    if (address && address !== "undefined") updateData.address = address;
    if (req.file) updateData.profile = req.file.filename;

    await users.update(userId, updateData);

    const updatedUser = await users.findOne({ where: { id: userId } });
    return createResponse(res, true, 200, "Profile updated successfully", updatedUser, false);

  } catch (error: any) {
    console.error("❌ Error:", error.message);
    return createResponse(res, false, 500, "Internal Server Error", [], true);
  }
};