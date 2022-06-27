import Express from 'express';
import morgan from 'morgan';
import dotenv from 'dotenv';
dotenv.config();
import cors from 'cors';
import router from './router/router';
import { createServer } from "http";
import { Server, Socket } from "socket.io";
const PORT = process.env.PORT || 3002;

const app = Express();
app.use(morgan('dev'));
app.use(cors());
app.use(Express.json());
app.use(router);

//HTTP server
const httpServer = createServer(app);
//Websocket server
const io = new Server(httpServer, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  },
});

io.on('connection', (socket: any) => {
  console.log(`user is connected: ${socket.id}`);

  socket.on('disconnect', () => {
    console.log(`Client disconnected:${socket.id}`);
  })
})


httpServer.listen(PORT, () => {
  try {
  console.log(`🦆🦆🦆 Server is running at http://localhost:${PORT} 🦆🦆🦆`);
  } catch(err) {
    console.log('Error launching Server: ', err);
  }
});

export default app;
