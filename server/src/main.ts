import express from 'express';

import { AddressInfo } from 'net';

import routerHandler from './router';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// logger
app.use(async (req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "*");
  res.header("Access-Control-Allow-Methods", "PUT,PATCH,POST,GET,DELETE,OPTIONS");
  res.header("Content-Type", "application/json;charset=utf-8");

  const start: number = new Date().getTime()
  await next()
  const ms: number = new Date().getTime() - start
  console.info(`${req.method} ${req.originalUrl} - ${ms}ms`)
})

// router
app.use('/', routerHandler);

// Not found
app.use((req, res, next) => {
  res.status(404).json({
    msg: 'not found!'
  });
});

// server start up
const port = 8000;
const server = app.listen(port)
server.on('listening', () => {
    const addr: AddressInfo = server.address() as AddressInfo;
    console.log('Listening on ' + addr?.port);
});
server.on('error', (error: any) => {
  if (error.syscall !== 'listen') {
    throw error;
  }

  var bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
});
