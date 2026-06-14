import { ensureServerInitialized } from './bootstrap';

type RouteHandler = (req: Request) => Promise<Response>;

export function createNextHandler(handler: RouteHandler): RouteHandler {
  return async (req: Request) => {
    ensureServerInitialized();
    return handler(req);
  };
}
