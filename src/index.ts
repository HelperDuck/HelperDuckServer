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

//will keep track of the participants
const participants: any = {}; //TODO: Type check 

const socketToRoom: any = {}; //TODO: Type check

io.on('connection', (socket: any) => {
  console.log(`user is connected: ${socket.id}`);
  socket.emit('me', socket.id);
  
  socket.on('joiningRoom', (roomId: string) => {
    if (participants[roomId]) {
      participants[roomId].push(socket.id);
    } else {
      participants[roomId] = socket.id;
    }
    socketToRoom[socket.id] = roomId;
    
    const participantsInRoom = participants[roomId].filter(
      (id: string) => id !== socket.id
    );
    
    socket.emit('allParticipants', participantsInRoom);
    console.log('allParticipants', participantsInRoom);
  })
  
  socket.on('sendingSignalToServer', (data: { userToSignal: string | string[]; signal: any; callerId: string; }) => {
    io.to(data.userToSignal).emit('userHasJoined', {
      signal: data.signal,
      callerId: data.callerId,
    });
    console.log('CallerId emitted from userHasJoined', data.callerId);
  });

  socket.on('disconnect', () => {
    console.log(`Client disconnected:${socket.id}`);
  })
  
  socket.on('returningSignalToServer', (data: { callerId: string | string[]; signal: any; }) => {
    io.to(data.callerId).emit('ServerReceivedTheReturnedSignal', {
      signal: data.signal,
      id: socket.id,
    });
  });
  
})

httpServer.listen(PORT, () => {
  try {
  console.log(`🦆🦆🦆 Server is running at http://localhost:${PORT} 🦆🦆🦆`);
  } catch(err) {
    console.log('Error launching Server: ', err);
  }
});

export default app;
