// import mongoose from "mongoose";
// import colors from "colors";
// import dotenv from "dotenv";

// dotenv.config();

// const connectDB = async () => {
//   try {
//     const conn = await mongoose.connect(process.env.MONGO_URI);
//     console.log(`✅ MongoDB Connected: ${conn.connection.host}`.cyan.underline);
//   } catch (error) {
//     console.error(`❌ Error: ${error.message}`.red.bold);
//     process.exit(1);
//   }
// };

// export default connectDB;





import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect("mongodb+srv://chaitanyapatil1177_db_user:krishna1177@cluster0.me6qsr8.mongodb.net/ll");
    console.log("✅ MongoDB Connected");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1);
  }
};

export default connectDB;
