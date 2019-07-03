import express     from 'express';

import bodyParser  from 'body-parser';
import compression from 'compression';
import cors        from 'cors';


import { createServer } from 'http';

import
{
  graphqlExpress,
  graphiqlExpress
}
from 'apollo-server-express';

import schema from './schema';

const app = express();

const iql =
  {
    endpointURL: '/graphql'
  };

// 跨域访问
app.use(cors());

// 启用压缩
app.use(compression());

// 设置 Request 数据体积上限
app.use(bodyParser.json({ limit: '8mb' }));
app.use(bodyParser.urlencoded({ extended: true }));

// GraphQL 服务
app.use('/graphql', bodyParser.json(), graphqlExpress({ schema }));

// GraphQL 调试
app.use('/graphiql', graphiqlExpress(iql));

app.all('*', function(req, res, next)
{
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With,Content-Type,Access-Token");
  res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
  res.header("X-Powered-By",' 3.2.1');
  res.header("Content-Type", "application/json;charset=utf-8");
  next();
});

const server = createServer(app);

const callback = () =>
{
  console.log(`Apollo Server is now running...`);
};

server.listen(4001, callback);
