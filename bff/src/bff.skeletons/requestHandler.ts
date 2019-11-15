import express from 'express';
import { RemoteFunction, RemoteParameter } from '../types/remoteTypes';

export const requestHandler = <T extends RemoteFunction>(
  func: (arg: RemoteParameter<T>) => ReturnType<T>
) => (
  req: express.Request,
  res: express.Response,
  next?: express.NextFunction
) => {
  const { body } = req;
  try {
    const response = func(body);
    res.json(response);
  } catch (err) {
    if (next) {
      next(err);
    }
  }
};
