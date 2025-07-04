import express from "express";
import {
  creteTask,
  deleteTask,
  getAllTasks,
  getTaskById,
  updateTask,
} from "../controllers/task.controller.js";

const router = express.Router();

router.post("/", creteTask);
router.get("/", getAllTasks);
router.get("/:id", getTaskById);
router.put("/:id", updateTask);
router.delete("/:id", deleteTask);

export default router;
