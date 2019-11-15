import Type from '../bff.types/UserBffType';

const create: Type['create'] = arg => {
  console.log('create', arg);
  const { name, age } = arg;
  const id = 1;
  const now = new Date();
  const createdAt = `${now}`;
  const updatedAt = createdAt;
  return { id, name, age, createdAt, updatedAt };
};

const read: Type['read'] = arg => {
  console.log('read', arg);
  const { id } = arg;
  const name = 'Alice';
  const age = 20;
  const now = new Date();
  const createdAt = `${now}`;
  const updatedAt = createdAt;
  return { id, name, age, createdAt, updatedAt };
};

const update: Type['update'] = arg => {
  console.log('update', arg);
  const { id, name, age } = arg;
  const now = new Date();
  const createdAt = `${now}`;
  const updatedAt = createdAt;
  return { id, name, age, createdAt, updatedAt };
};

const deleteFunc: Type['delete'] = arg => {
  const { id } = arg;
  console.log('delete', id);
  return {};
};

const error404: Type['error404'] = arg => {
  const { id } = arg;
  console.log('error404', id);
  return {};
};

const error500: Type['error404'] = arg => {
  const { id } = arg;
  console.log('error500', id);
  throw new Error(`error500 ${id}`);
};

const UserBff: Type = {
  create,
  read,
  update,
  delete: deleteFunc,
  error404,
  error500,
};

export default UserBff;
