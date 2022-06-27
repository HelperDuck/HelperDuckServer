import Express from 'express';
import morgan from 'morgan';
import dotenv from 'dotenv';
dotenv.config();
import cors from 'cors';
import router from './router/router';
import http from 'http';
import { Server } from 'socket.io';

const PORT = process.env.PORT || 3002;

const app = Express();
app.use(morgan('dev'));
app.use(cors()).use(Express.json());
app.use(router);

//HTTP server
const server = http.createServer(app);
//Websocket server
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
  },
});
io.on("connection", () => {
  console.log('user is connected')
})


server.listen(PORT, () => {
  console.log(`🦆🦆🦆 Server is running at http://localhost:${PORT} 🦆🦆🦆`);
});

export default app;
