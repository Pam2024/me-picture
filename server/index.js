const { createServer } = require('http');
const { parse } = require('url');
const next = require('next');
const { Server } = require('socket.io');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = createServer((req, res) => {
    const parsedUrl = parse(req.url, true);
    handle(req, res, parsedUrl);
  });

  // Initialize Socket.io
  const io = new Server(server);
  
  // Store connected users
  const connectedUsers = new Map();
  
  io.on('connection', (socket) => {
    console.log('A user connected');
    
    // Handle user authentication/identification
    socket.on('authenticate', (userId) => {
      // Store the user's connection
      connectedUsers.set(userId, socket.id);
      console.log(`User ${userId} authenticated`);
    });
    
    // Handle photo added event
    socket.on('photoAdded', ({ walletId, photoUrl, addedByUserId, addedByUsername }) => {
      console.log(`Photo added to wallet ${walletId} by user ${addedByUserId}`);
      
      // Broadcast to all connected users except the sender
      socket.broadcast.emit('newPhoto', {
        walletId,
        photoUrl,
        addedByUserId,
        addedByUsername,
        timestamp: new Date()
      });
    });
    
    // Handle disconnection
    socket.on('disconnect', () => {
      // Remove user from connected users
      for (const [userId, socketId] of connectedUsers.entries()) {
        if (socketId === socket.id) {
          connectedUsers.delete(userId);
          console.log(`User ${userId} disconnected`);
          break;
        }
      }
    });
  });

  server.listen(3000, (err) => {
    if (err) throw err;
    console.log('> Ready on http://localhost:3000');
  });
});