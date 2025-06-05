const dotenv = require("dotenv");
const connectDB = require("./src/config/mongoose.config");
const app = require("./src/app");

dotenv.config();

async function startServer() {
  try {
    await connectDB();

    const port = process.env.PORT || 3000;

    app.listen(port, "0.0.0.0", () => {
      console.log(`🚀 Server running at http://localhost:${port}`);
    });
  } catch (err) {
    console.error("❌ Failed to start server:", err.message);
    process.exit(1);
  }
}

startServer();
