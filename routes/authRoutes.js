// import express from "express";
// import { registerController, loginController } from "../controller/authController.js";

// const router = express.Router();

// // Test route
// router.get("/", (req, res) => res.send("Auth route working ✅"));

// // Register
// router.post("/register", registerController);

// // Login
// router.post("/login", loginController);

// export default router;







///2
import express from "express";
import { registerController, loginController } from "../controller/authController.js";

const router = express.Router();

// Test route
router.get("/", (req, res) => res.send("Auth route working ✅"));

// Register
router.post("/register", registerController);

// Login
router.post("/login", loginController);

export default router;
