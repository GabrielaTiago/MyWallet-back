export const ERRORS = {
  bad_request: 400,
  unauthorized: 401,
  forbidden: 403,
  not_found: 404,
  conflict: 409,
  unprocessable_entity: 422,
};

export default function throwCustomError(type, message) {
  const customError = { type: ERRORS[type], message };
  throw customError;
}
