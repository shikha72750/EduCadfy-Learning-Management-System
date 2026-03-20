import express from "express";
import "dotenv/config";
import cors from "cors";

import userRouter from "./routes/user/userrouter";
import adminRouter from "./routes/admin/adminrouter";
import { AppDataSource } from "./dbConfig/dbConfig";
const app = express();
app.use(express.json());
app.use(cors());
const PORT = process.env.PORT || 8000;
AppDataSource.initialize()
  .then(() => {
    console.log("Database connected successfully..");
  })
  .catch((err) => {
    console.log(err);
  });
app.use("/user", userRouter);   
app.use("/admin", adminRouter); 
app.listen(PORT, () => {
  console.log("server is running on port:" + PORT);
});
// console.log("PORT:", process.env.PORT);
// console.log("JWT:", process.env.JWT_SECRET);