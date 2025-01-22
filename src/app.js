import express, { json } from "express";
import cors from "cors";
import { serve, setup } from "swagger-ui-express";
import swaggerDocument from "./docs/swagger.json" assert { type: "json" };
import clientRoutes from "./routes/clientRoutes.js";
import connectDB from "./config/db.js";
import dotenv from "dotenv";

dotenv.config();

const app = express();

connectDB();

app.use(cors());
app.use(json());

app.use("/api", clientRoutes);

app.use("/api-docs", serve, setup(swaggerDocument));

export default app;
