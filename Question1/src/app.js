import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

// Express
const app = express();
const PORT = 3000;
// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
// Middleware setup
app.use(cors());
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(cookieParser());

//routes import
import userRoutes from "./routes/userRoutes.js";
import postRoutes from "./routes/postRoutes.js";

// routes decclaration
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/post", postRoutes);

export default app;
