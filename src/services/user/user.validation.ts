import { Request, Response, NextFunction } from 'express';
import isEmail from 'validator/lib/isEmail';

import HttpError from '../../errors/http';

class UserValidationClass {
  public create = (req: Request, res: Response, next: NextFunction) => {
    const { body } = req;

    const errors: HttpError[] = [];

    if (!body.email) errors.push(new HttpError('FieldIsRequired', 422, { field: 'email' }));

    if (body.email && !isEmail(body.email)) {
      errors.push(new HttpError('FieldIsNotValid', 422, { field: 'email' }));
    }
    if (!body.password) errors.push(new HttpError('FieldIsRequired', 422, { field: 'password' }));

    if (body.password && body.password.length < 6) {
      errors.push(new HttpError('FieldIsTooShort', 422, { field: 'password', limit: '6' }));
    }

    if (body.password && body.password.length > 20) {
      errors.push(new HttpError('FieldIsTooLong', 422, { field: 'password', limit: '20' }));
    }

    if (errors.length) next(errors);
    else next();
  };

  public login = (req: Request, res: Response, next: NextFunction) => {
    const { body } = req;

    const errors: HttpError[] = [];

    if (!body.email) errors.push(new HttpError('FieldIsRequired', 422, { field: 'email' }));

    if (body.email && !isEmail(body.email)) {
      errors.push(new HttpError('FieldIsNotValid', 422, { field: 'email' }));
    }
    if (!body.password) errors.push(new HttpError('FieldIsRequired', 422, { field: 'password' }));

    if (
      (body.password && body.password.length < 6) ||
      (body.password && body.password.length > 20)
    ) {
      errors.push(new HttpError('FieldIsNotValid', 422, { field: 'password' }));
    }

    if (errors.length) next(errors);
    else next();
  };
}

export const UserValidation = new UserValidationClass();

export default UserValidation;
