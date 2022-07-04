import { transactionsSchema } from "../schema/schemas.js";

function transactionsMiddleware(require, response, next) {
    const validation = transactionsSchema.validate(require.body, { abortEarly: true });

    if (validation.error) {
        return response.status(422).send(validation.error.details);
    }

    next();
}

export default transactionsMiddleware;