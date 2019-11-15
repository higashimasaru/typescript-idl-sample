/**
 * リモート関数
 *
 * const foo: RemoteFunction = (arg: { id: number }) => ({ name: '' });
 */
export type RemoteFunction = (arg: any) => any;

/**
 * リモートインターフェース
 *
 * const Foo: Remote = {
 *   foo: (arg: { id: number }) => ({ name: '' }),
 * };
 */
export type Remote = { [key: string]: RemoteFunction };

/**
 * RemoteFunction の引数の型を取得する
 *
 * type Foo = (arg: { id: number }) => { name: string };
 * type Arg = RemoteParameter<Foo>;
 * // type Arg = { id: number };
 */
export type RemoteParameter<T extends RemoteFunction> = T extends (
  arg: infer P
) => any
  ? P
  : never;

/**
 * RemoteFunction を非同期にする
 *
 * type Foo = (arg: { id: number }) => { name: string };
 * type Bar = AsyncRemoteFunction<Foo>;
 * // type Bar = (arg: {id:number}) => Promise<{name: string}>
 */
type AsyncRemoteFunction<T extends RemoteFunction> = (
  arg: RemoteParameter<T>
) => Promise<ReturnType<T>>;

/**
 * Remote の各メンバを非同期にする
 *
 * type Foo = { foo: (arg: { id: number }) => { name: string } };
 * type Bar = AsyncRemote<Foo>;
 * type Bar = { foo: (arg: { id: number }) => Promise<{ name: string }> };
 */
export type AsyncRemote<T extends { [P in keyof T]: RemoteFunction }> = {
  [P in keyof T]: AsyncRemoteFunction<T[P]>;
};
