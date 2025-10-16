





// 77
import express from "express";
import dotenv from "dotenv";
import colors from "colors";
import cors from "cors";
import connectDB from "./config/db.js";

import authRoutes from "./routes/authRoutes.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";

dotenv.config();

// Connect MongoDB
connectDB();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Test route
app.get("/", (req, res) => {
  res.send("🚀 Server running successfully!");
});

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/category", categoryRoutes);
app.use("/api/product", productRoutes);
app.use("/api/order", orderRoutes);
// Start server
const PORT = process.env.PORT || 6001;
app.listen(PORT, () =>
  console.log(`✅ Server running on http://localhost:${PORT}`.yellow.bold)
);















// // // 77
// import express from "express";
// import dotenv from "dotenv";
// import colors from "colors";
// import cors from "cors";
// // import orderRoutes from "./routes/orderRoutes.js";
// import connectDB from "./config/db.js";

// import authRoutes from "./routes/authRoutes.js";
// import categoryRoutes from "./routes/categoryRoutes.js";
// import productRoutes from "./routes/productRoutes.js";
// // import  orderRoutes from "./routes/orderRoutes.js"
// dotenv.config();

// // Connect MongoDB
// connectDB();

// const app = express();

// // Middlewares
// app.use(cors());
// app.use(express.json());

// // Test route
// app.get("/", (req, res) => {
//   res.send("🚀 Server running successfully!");
// });

// // Routes
// app.use("/api/auth", authRoutes);
// app.use("/api/category", categoryRoutes);
// app.use("/api/product", productRoutes);
// // app.use("/api/order", orderRoutes);

// // Start server
// const PORT = process.env.PORT || 6001;
// app.listen(PORT, () =>
//   console.log(`✅ Server running on http://localhost:${PORT}`.yellow.bold)
// );









