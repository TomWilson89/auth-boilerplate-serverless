import { Response, Request, NextFunction } from 'express';
import jwt = require('jsonwebtoken');

import asyncHandler from '../../middlewares/async';
import { IUSer, IUserDocument } from './user.interface';
import HttpError from '../../errors/http';
import User from './user.model';

class UserControllerClass {
  private validParams: (keyof IUSer)[] = ['email', 'password'];

  private sendToken = (user: IUserDocument, status: number, res: Response) => {
    const token = user.getToken();

    res.status(status).json({ data: token });
  };

  public create = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const { name, lastName, password, email } = req.body;
    const body: any = { name, lastName, password, email };

    const user = await User.create(body);

    this.sendToken(user, 201, res);
  });

  public login = async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).select('+password');

    if (!user) {
      return next(new HttpError('InvalidCredentials', 401));
    }

    if (!(await user.matchPassword(password))) {
      return next(new HttpError('InvalidCredentials', 401));
    }

    this.sendToken(user, 200, res);
  };

  public me = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    res.json({ data: req.user });
  });
}

const UserController = new UserControllerClass();

export default UserController;
