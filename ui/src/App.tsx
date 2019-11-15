import React, { useEffect } from 'react';
import { UserBff } from './bff.stubs/UserBff';

const App: React.FC = () => {
  useEffect(() => {
    console.log('mount');
    (async () => {
      try {
        // create
        const cerateRes = await UserBff.create({ name: 'Alice', age: 20 });
        console.log('create', cerateRes);

        // read
        const { id } = cerateRes;
        const readRes = await UserBff.read({ id });
        console.log('read', readRes);

        // update
        const { age } = readRes;
        const updateRes = await UserBff.update({ ...readRes, age: age + 1 });
        console.log('update', updateRes);

        // delete
        const deleteRes = await UserBff.delete({ id });
        console.log('delete', deleteRes);

        try {
          // error404
          const errorRes = await UserBff.error404({ id });
          console.log('error404', errorRes);
        } catch (e) {
          console.log(e);
        }
        try {
          // error500
          const errorRes = await UserBff.error500({ id });
          console.log('error500', errorRes);
        } catch (e) {
          console.log(e);
        }
      } catch (e) {
        console.log(e);
      }
    })();
  }, []);
  return <div></div>;
};

export default App;
