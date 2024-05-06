import { plainToClass } from "class-transformer";
import { ValidationError, validate } from "class-validator";
import { NextFunction, Request, RequestHandler, Response } from "express";
import HttpException from "../exceptions/http.exception";

const validationMiddleware = (
    type: any,
    skipMissingProperties = false
  ): RequestHandler => {
    return (req: Request, res: Response, next: NextFunction) => {
      validate(plainToClass(type, req.body), { skipMissingProperties }).then(
        (errors: ValidationError[]) => {
          if (errors.length > 0) {
            const messages = errors
              .map((error: ValidationError) => {
                return Object.values(error.constraints!);
              })
              .join(', ');
            next(new HttpException(400, messages));
          }
        }
      );
    };
  };
  
  export default validationMiddleware;