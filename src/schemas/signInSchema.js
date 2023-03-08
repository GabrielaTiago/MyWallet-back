import joi from "joi";

const signInSchema = joi.object({
  email: joi.string().email().trim().required().messages({
    "string.empty": `O valor do email não é permitido ser vazio`,
    "any.required": `O campo email é obrigatório`,
    "string.email": `Este valor não corresponde a um email válido`,
  }),
  password: joi.string().trim().required().messages({
    "string.empty": `O valor da senha não é permitido ser vazio`,
    "any.required": `O campo senha é obrigatório`,
  }),
});

export default signInSchema;
