import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';
import * as moment from 'moment';
import * as chalk from 'chalk';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, _: Response, next: Function) {
    const now = new Date();
    const dateString = moment(now).format('YYYY-MM-DD HH:mm:ss');
    console.log(
      `[${chalk.green(dateString)}] Request URL: ${chalk.yellow(req.originalUrl)}, Method: ${chalk.yellow(
        req.method,
      )}`,
    );
    next();
  }
}
