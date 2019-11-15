import { RemoteFunction, RemoteParameter } from '../types/remoteTypes';

export const post = <T extends RemoteFunction>(input: RequestInfo) => async (
  arg: RemoteParameter<T>
): Promise<ReturnType<T>> => {
  const response = await fetch(input, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(arg),
  });
  if (!response.ok) {
    const message = `${response.status} (${response.statusText})`;
    throw new Error(message);
  }
  const json = await response.json();
  return json;
};
