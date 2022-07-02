import joi from "joi";

const singInSchema = joi.object({
    email: joi.string().email().required(),
    password: joi.string().required().min(4)
});

const signUpSchema = joi.object({
    name: joi.string().required().min(1),
    email: joi.string().email().required(),
    password: joi.string().required().min(4),
    confirmPassword: joi.ref('password')
});

export {singInSchema, signUpSchema};