import exp from "express";
import { connect } from "mongoose";
import { config } from "dotenv";
import { UserApp } from "./APIs/UserApi.js";
import cors from 'cors'
//Read environment variables
config();


// Create HTTP Server
const app = exp();

const FRONTEND_URL = process.env.FRONTEND_URL || "https://user-management-mini-app-cm7l.vercel.app";

// add cors and handle preflight via middleware
app.use(
  cors({
    origin: FRONTEND_URL,
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Add body parser middleware
app.use(exp.json());
// Forward req to UserAPI if path starts with /user-api
app.use("/user-api", UserApp);

// Connect to DB
async function connectDB() {
  try {
    await connect(process.env.DB_URL);
    console.log("Connected to DB");
    //assign port number
    const port = process.env.PORT;
    app.listen(port, () => console.log(`Server on port ${port}`));
  } catch (err) {
    console.log("err in DB connection :", err);
  }
}

connectDB();

//err handling middleware
app.use((err, req, res, next) => {
  // Mongoose validation error
  if (err.name === "ValidationError") {
    return res.status(400).json({
      message: "Validation failed",
      errors: err.errors,
    });
  }
  // Invalid ObjectId
  if (err.name === "CastError") {
    return res.status(400).json({
      message: "Invalid ID format",
    });
  }
  // Duplicate key
  if (err.code === 11000) {
    return res.status(409).json({
      message: "Duplicate field value",
    });
  }
  res.status(500).json({
    message: "Internal Server Error",
  });
});
