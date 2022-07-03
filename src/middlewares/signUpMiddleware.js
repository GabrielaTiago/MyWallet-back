import { signUpSchema } from "../schema/schemas.js";

function signUpMiddleware(require, response, next) {
    const validation = signUpSchema.validate(require.body, { abortEarly: true });

    if (validation.error) {
        return response.status(422).send(validation.error.details);
    }

    next();
}

export default signUpMiddleware;