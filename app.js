import db from "./models/index.js";
import express from "express";
import userRoutes from "./routes/user.routes.js";
import taskRoutes from "./routes/task.routes.js";
import proposalRoutes from "./routes/proposal.routes.js";

const app = express();
app.use(express.json());
app.use("/api/user", userRoutes);
app.use("/api/task", taskRoutes);
app.use("/api/proposal", proposalRoutes);

app.get("/", async (req, res) => {
  try {
    res.status(200).send("Ping");
  } catch (error) {
    res.status(400).send("Catch");
  }
});

const PORT = 3000;

db.sequelize
  .sync({ alter: true })
  .then(() => {
    console.log("Database synced.");
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => {
    console.error("Failed to sync DB", err.message);
  });
