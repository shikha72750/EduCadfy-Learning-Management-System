
import 'dotenv/config';
import {users} from "../../entities/user"
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'
import { createResponse } from "../../helper/createResponse";
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
          const token= jwt.sign({email:isExist.email},process.env.JWT_SECRET as string,{expiresIn:'24h'})
           return createResponse(res, true, 200, "Login successfull",{ isExist,token}, false,);
         }
     } 
 }catch(error){
 return createResponse(res, false, 500, "Internal Server Error", [], true);
 }
};
