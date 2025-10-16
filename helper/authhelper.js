import bcrypt from "bcrypt";

// 🔹 Hash password before saving
export const hashPassword = async (password) => {
  try {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    return hashedPassword;
  } catch (error) {
    console.error("Error hashing password:", error);
  }
};

// 🔹 Compare password during login
export const comparePassword = async (password, hashedPassword) => {
  try {
    return await bcrypt.compare(password, hashedPassword);
  } catch (error) {
    console.error("Error comparing password:", error);
  }
}
