import express from "express";
import "dotenv/config";
import cors from "cors";
import swaggerUi from "swagger-ui-express";
import { AppDataSource } from "./dbConfig/dbConfig";
import userRouter from "./routes/user/userrouter";
import adminRouter from "./routes/admin/adminrouter";
import expressfileupload from "express-fileupload";
import swaggerOptions from "./config/swagger";
import chatbotRouter from './routes/user/chatbot'
import publicRouter from "./routes/public/publicRouter";


const app = express();

// ✅ Pehle middleware
app.use(express.json())  // ⬅️ upar aaya
app.use(cors());
// app.use(expressfileupload());
app.use("/uploads", express.static("uploads"));

// Phir routes
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerOptions));
app.use("/file", express.static('uploads'))
app.use('/api/claude', chatbotRouter)  // ✅ ab body parse hogi

app.use("/public", publicRouter);
app.use("/user", userRouter);   
app.use("/admin", adminRouter); 

const PORT = process.env.PORT || 8000;
AppDataSource.initialize()
  .then(() => console.log("Database connected successfully.."))
  .catch((err) => console.log(err));

app.listen(PORT, () => {
  console.log("server is running on port:" + PORT);
  console.log("swagger ui:" + "http://localhost:8000/api-docs/");
});