import dotenv from "dotenv";
dotenv.config(); // ✅ MUST be at the top

import app from "./app.js";
import { connectDB } from "./db/index.js";

const PORT = process.env.PORT || 5001;

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ Failed to connect to database:", err);
    process.exit(1);
  });
