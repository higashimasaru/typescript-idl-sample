import express from 'express';
import { requestHandler } from './bff.skeletons/requestHandler';
import UserBff from './bff.impls/UserBff';

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(
  (
    err: Error,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    console.error(err.stack);
    res.status(500);
    res.render('error', { error: err });
  }
);

app.post('/user/create', requestHandler(UserBff.create));
app.post('/user/read', requestHandler(UserBff.read));
app.post('/user/update', requestHandler(UserBff.update));
app.post('/user/delete', requestHandler(UserBff.delete));
// app.post('/user/error404', requestHandler(UserBff.error404));
app.post('/user/error500', requestHandler(UserBff.error500));

const port = process.env.PORT || 1337;
app.listen(port, () => {
  console.log(`Open http://localhost:${port}`);
});
