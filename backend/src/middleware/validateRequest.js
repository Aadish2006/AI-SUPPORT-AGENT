import { ApiError } from '../utils/ApiError.js';

export function validateRequest(schema) {
  return (req, _res, next) => {
    const parsed = schema.safeParse({
      body: req.body,
      params: req.params,
      query: req.query
    });

    if (!parsed.success) {
      throw new ApiError(400, 'Validation failed', parsed.error.flatten());
    }

    req.validated = parsed.data;
    next();
  };
}
