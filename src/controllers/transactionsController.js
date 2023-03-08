import transactionsService from "../services/transactionsService.js";

async function getAllTransactions(req, res) {
  const transactions = await transactionsService.getAllTransactions();

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

const transactionsController = {
  createTransaction,
  getAllTransactions,
  updateTransaction,
};

export default transactionsController;
