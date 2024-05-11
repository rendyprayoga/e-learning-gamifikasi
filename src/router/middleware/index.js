/**
 * Create next middleware pipeline.
 *
 * @param {Object} context
 * @param {Array} middleware List of middleware.
 * @param {Number} nextIndex  Next middleware index.
 */
function middlewarePipeline(context, middleware, nextIndex) {
  const nextMiddleware = middleware[nextIndex];

  if (!nextMiddleware) {
    return context.next;
  }

  return (result) => {
    if (result !== undefined) {
      // Stop if we already has a result.
      return context.next(result);
    }

    const nextPipeline = middlewarePipeline(context, middleware, nextIndex + 1);
    nextMiddleware({ ...context, next: nextPipeline });
  };
}

/**
 * Route guard.
 *
 * @param {Object} to
 * @param {Object} from
 * @param {Function} next
 */
export default function (to, from, next) {
  if (!to.meta.middleware) {
    return next();
  }

  const context = { to, from, next };
  const middleware = to.meta.middleware;
  const nextPipeline = middlewarePipeline(context, middleware, 1);

  middleware[0]({ ...context, next: nextPipeline });
}
