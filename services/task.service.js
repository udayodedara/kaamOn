import db from "../models/index.js";

const Task = db.Task;

export const assignTask = async (taskId, assigneeId) => {
  const [updatedTask] = await Task.update(
    { assigneeId },
    { where: { id: taskId } }
  );

  return updatedTask;
};
