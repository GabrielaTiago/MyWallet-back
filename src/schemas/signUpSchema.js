import joi from "joi";

const passwordRegex = /^(?=.*\d)(?=.*\W+)(?=.*[A-Z])(?=.*[a-z])[^.\n]{8,}$/;

const signUpSchema = joi.object({
  name: joi.string().required().messages({
    "string.empty": `O valor da senha não é permitido ser vazio`,
    "any.required": `O campo senha é obrigatório`,
    "string.pattern.base": `A senha precisa ter no mínimo 8 caracteres, dentre eles conter: 1 letra maiúscula e 1 caracter especial`,
  }),
  email: joi.string().email().trim().required().messages({
    "string.empty": `O valor do email não é permitido ser vazio`,
    "any.required": `O campo email é obrigatório`,
    "string.email": `Este valor não corresponde a um email válido`,
  }),
  password: joi.string().trim().pattern(passwordRegex).required().messages({
    "string.empty": `O valor da senha não é permitido ser vazio`,
    "any.required": `O campo senha é obrigatório`,
    "string.pattern.base": `A senha precisa ter no mínimo 8 caracteres, dentre eles conter: 1 letra maiúscula e 1 caracter especial`,
  }),
  confirmPassword: joi.string().valid(joi.ref("password")).messages({
    "string.empty": `O valor de confirmação senha não é permitido ser vazio`,
    "any.required": `O campo de confirmação da senha é obrigatório`,
    "any.only": `As senhas não são correspondentes`,
  }),
});

export default signUpSchema;
