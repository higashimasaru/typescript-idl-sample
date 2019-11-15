import Type from '../bff.types/UserBffType';
import { post } from './post';
import { AsyncRemote } from '../types/remoteTypes';

const create = post<Type['create']>('/user/create');
const read = post<Type['read']>('/user/read');
const update = post<Type['update']>('/user/update');
const deleteFunc = post<Type['delete']>('/user/delete');
const error404 = post<Type['error404']>('/user/error404');
const error500 = post<Type['error500']>('/user/error500');

export const UserBff: AsyncRemote<Type> = {
  create,
  read,
  update,
  delete: deleteFunc,
  error404,
  error500,
};
