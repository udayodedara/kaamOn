import db from "../models/index.js";
import { assignTask } from "../services/task.service.js";

const Proposal = db.Proposal;

export const createProposal = async (req, res) => {
  try {
    const proposal = await Proposal.create(req.body);

    res.status(201).json(proposal);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getAllProposals = async (req, res) => {
  try {
    const proposals = await Proposal.findAll();
    res.status(200).json(proposals);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getAllProposalsByTaskId = async (req, res) => {
  try {
    const proposals = await Proposal.findAll({
      where: { taskId: req.params.taskId },
    });
    res.status(200).json(proposals);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const acceptProposal = async (req, res) => {
  try {
    // const { taskId, assigneeId } = req.body;
    const { proposalId } = req.params;

    const proposal = await Proposal.findByPk(proposalId);
    console.log("proposal", proposal);

    await assignTask(proposal.taskId, proposal.userId);
    const [updatedProposal] = await Proposal.update(
      { status: "APPROVED" },
      { where: { id: proposalId } }
    );
    res.status(200).json(updatedProposal);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
