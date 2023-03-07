import signInSchema from "./signInSchema.js";
import signUpSchema from "./signUpSchema.js";
import transactionsSchema from "./transactionsSchema.js";

const schemas = {
  sign_up: signUpSchema,
  sign_in: signInSchema,
  transaction: transactionsSchema,
};

export default schemas;
