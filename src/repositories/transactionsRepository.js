import { ObjectId } from "mongodb";
import { database } from "../database/mongodb.js";

async function getAllTransactions() {
  const transactions = await database
    .collection("transactions")
    .find()
    .toArray();
  return transactions;
}

async function getBalance() {
  const total = await database
    .collection("transactions")
    .aggregate([
      {
        $group: {
          _id: null,
          balance: { $sum: "$amount" },
        },
      },
    ])
    .toArray();
  return total[0].balance;
}

async function createTransaction(userId, day, amount, description, type) {
  await database
    .collection("transactions")
    .insertOne({ userId, day, amount, description, type });
}

async function updateTransaction(transactionId, amount, description, type) {
  await database.collection("transactions").updateOne(
    {
      _id: ObjectId(transactionId),
    },
    {
      $set: {
        amount,
        description,
        type,
      },
    }
  );
}

async function deleteTransaction(transactionId) {
  await database.collection("transactions").deleteOne({
    _id: ObjectId(transactionId),
  });
}

const transactionsRepository = {
  createTransaction,
  deleteTransaction,
  getAllTransactions,
  getBalance,
  updateTransaction,
};

export default transactionsRepository;
