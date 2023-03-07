import joi from "joi";

const amoutRegex = /^\d+(,\d{2}|\.\d{2})?$/;

const transactionsSchema = joi.object({
  amout: joi.string().trim().pattern(amoutRegex).required().messages({
    "string.empty": `O valor da quantia não é permitido ser vazio`,
    "any.required": `O campo quantia é obrigatório`,
    "string.pattern.base": `Apenas números são aceitos`,
  }),
  description: joi.string().required().messages({
    "string.empty": `O valor da descrição não é permitido ser vazio`,
    "any.required": `O campo descrição é obrigatório`,
  }),
  type: joi.string().valid("income", "expense").messages({
    "string.empty": `O valor da senha não é permitido ser vazio`,
    "any.required": `O campo senha é obrigatório`,
    "any.only": `O tipo só pode ser 'expense' ou 'income'`,
  }),
});

export default transactionsSchema;
