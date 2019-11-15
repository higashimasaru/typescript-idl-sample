type UserBffType = {
  create: (arg: {
    name: string; //      名前
    age: number; //       年齢
  }) => {
    id: number; //        ID
    name: string; //      名前
    age: number; //       年齢
    createdAt: string; // 作成日時
    updatedAt: string; // 更新日時
  };
  read: (arg: {
    id: number; //        ID
  }) => {
    id: number; //        ID
    name: string; //      名前
    age: number; //       年齢
    createdAt: string; // 作成日時
    updatedAt: string; // 更新日時
  };
  update: (arg: {
    id: number; //        ID
    name: string; //      名前
    age: number; //       年齢
  }) => {
    id: number; //        ID
    name: string; //      名前
    age: number; //       年齢
    createdAt: string; // 作成日時
    updatedAt: string; // 更新日時
  };
  delete: (arg: {
    id: number; //        ID
  }) => {};
  error404: (arg: {
    id: number; //        ID
  }) => {};
  error500: (arg: {
    id: number; //        ID
  }) => {};
};

export default UserBffType;
