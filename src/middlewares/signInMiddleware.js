import { signInSchema } from "../schema/schemas.js";

function signInMiddleware(require, response, next) {
    const validation = signInSchema.validate(require.body, { abortEarly: true });

    if (validation.error) {
        return response.status(422).send(validation.error.details);
    }

    next();
}

export default signInMiddleware;