import transactionsRepository from "../repositories/transactionsRepository.js";
import formatDay from "../utils/formatDay.js";

async function getAllTransactions(userId) {
  const transactions = await transactionsRepository.getAllTransactions();
  const balance = await transactionsRepository.getBalance(userId);

  return { balance, transactions };
}

async function createTransaction(userId, amount, description, type) {
  const day = formatDay();
  let formatedAmout = convertAmountToNumber(amount);

  if (type === "expense") {
    formatedAmout = formatedAmout * -1;
  }

  await transactionsRepository.createTransaction(
    userId,
    day,
    formatedAmout,
    description,
    type
  );
}

async function updateTransaction(userId, id, amount, description, type) {
  const transaction = await transactionsRepository.findTransactionById(id);

  if (!transaction) {
    const error = { type: "not_found", message: "Transação não encontrada" };
    throw error;
  }

  if (transaction.userId !== userId) {
    const error = {
      type: "unauthorized",
      message: "Usuário não permitido",
    };
    throw error;
  }

  let formatedAmout = convertAmountToNumber(amount);

  if (type === "expense") {
    formatedAmout = formatedAmout * -1;
  }

  await transactionsRepository.updateTransaction(
    id,
    formatedAmout,
    description,
    type
  );
}

async function deleteTransaction(userId, id) {
  const transaction = await transactionsRepository.findTransactionById(id);

  if (!transaction) {
    const error = { type: "not_found", message: "Transação não encontrada" };
    throw error;
  }

  if (transaction.userId !== userId) {
    const error = {
      type: "unauthorized",
      message: "Usuário não permitido",
    };
    throw error;
  }
  
  await transactionsRepository.deleteTransaction(id);
}

function getsNumberOfPeriodsAndCommas(amount) {
  let numberOfPeriods = 0;
  let numberOfCommas = 0;

  for (const character of amount) {
    const currentCharacter = character;

    if (currentCharacter === ".") numberOfPeriods++;

    if (currentCharacter === ",") numberOfCommas++;
  }

  return { numberOfPeriods, numberOfCommas };
}

function checkNumbersOfPeriodsAndCommas(amount) {
  const { numberOfPeriods, numberOfCommas } =
    getsNumberOfPeriodsAndCommas(amount);
  let formatedAmout = "";

  if (numberOfPeriods === 0 && numberOfCommas === 0) {
    formatedAmout = amount.concat(".00");
    return formatedAmout;
  }

  if (numberOfCommas === 1) {
    formatedAmout = amount.replace(/,/g, ".");
    return formatedAmout;
  }

  return amount;
}

function removesPeriodsAndCommasFromAmount(amount) {
  const newAmout = checkNumbersOfPeriodsAndCommas(amount);
  const amountArray = newAmout.split(".");
  const sizeAmount = amountArray.length;
  const integerPart = sizeAmount - 1;
  const decimalFraction = amountArray[sizeAmount - 1];
  let formatedAmout = "";

  if (sizeAmount > 2) {
    for (let i = 0; i < integerPart; i++) {
      const item = amountArray[i];
      formatedAmout = formatedAmout.concat(item);
    }
  } else {
    formatedAmout = amountArray[0].replace(/[.,]/g, "");
  }

  return formatedAmout.concat(`.${decimalFraction}`);
}

function convertAmountToNumber(amount) {
  const str = removesPeriodsAndCommasFromAmount(amount);
  const number = Number(str);
  return number;
}

const transactionsService = {
  createTransaction,
  deleteTransaction,
  getAllTransactions,
  updateTransaction,
};

export default transactionsService;
