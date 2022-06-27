import Express from 'express';
import morgan from 'morgan';
import dotenv from 'dotenv';
dotenv.config();
import Cors from 'cors';
import router from './router/router';
import http from 'http';

const PORT = process.env.PORT || 3002;

const app = Express();
app.use(morgan('dev'));
app.use(Cors()).use(Express.json());
app.use(router);

const server = http.createServer(app);

server.listen(PORT, () => {
  console.log(`🦆🦆🦆 Server is running at http://localhost:${PORT} 🦆🦆🦆`);
});

export default app;
