import { Logger } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import morgan from 'morgan';

export function loggerMiddleware(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const logger = new Logger('HTTP');
  morgan.token('url', (request): string => request.url);
  morgan(
    ':method :url :status (:res[Content-Length] length) (:response-time ms)',
    {
      stream: {
        write: (text: string): void => logger.log(text),
      },
    },
  )(req, res, next);
}
