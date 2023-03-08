import transactionsService from "../services/transactionsService.js";

async function getAllTransactions(req, res) {
  const { id: userId } = res.locals.user;

  const transactions = await transactionsService.getAllTransactions(userId);

  res.status(200).send(transactions);
}

async function createTransaction(req, res) {
  const { id: userId } = res.locals.user;
  const { amount, description, type } = req.body;

  await transactionsService.createTransaction(userId, amount, description, type);

  res.sendStatus(201);
}

const transactionsController = {
  getAllTransactions,
  createTransaction,
};

export default transactionsController;
