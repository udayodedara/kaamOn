import express from "express";
import {
  createProposal,
  getAllProposals,
  getAllProposalsByTaskId,
  acceptProposal,
} from "../controllers/proposal.controller.js";

const router = express.Router();

router.post("/", createProposal);
router.get("/", getAllProposals);
router.get("/:taskId", getAllProposalsByTaskId);
router.post("/accept/:proposalId", acceptProposal);
// router.put("/:id", updateTask);
// router.delete("/:id", deleteTask);

export default router;
