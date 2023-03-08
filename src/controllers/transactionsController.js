import transactionsService from "../services/transactionsService.js";

async function getAllTransactions(req, res) {
  const { id: userId } = res.locals.user;

  const transactions = await transactionsService.getAllTransactions(userId);

  res.status(200).send(transactions);
}

async function createTransaction(req, res) {
  const { id: userId } = res.locals.user;
  const { amount, description, type } = req.body;

  await transactionsService.createTransaction(
    userId,
    amount,
    description,
    type
  );

  res.sendStatus(201);
}

async function updateTransaction(req, res) {
  const { amount, description, type } = req.body;
  const { id: userId } = res.locals.user;
  const { id } = req.params;

  await transactionsService.updateTransaction(
    userId,
    id,
    amount,
    description,
    type
  );

  res.status(200).send("Updated!");
}

async function deleteTransaction(req, res) {
  const { id: userId } = res.locals.user;
  const { id } = req.params;

  await transactionsService.deleteTransaction(userId, id);

  res.status(200).send("Deleted!");
}

const transactionsController = {
  createTransaction,
  deleteTransaction,
  getAllTransactions,
  updateTransaction,
};

export default transactionsController;
