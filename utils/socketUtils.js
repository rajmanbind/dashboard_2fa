exports.setupSocket = (io) => {
    io.on('connection', (socket) => {
      console.log('Socket connected:', socket.id);
      // Implement real-time monitoring logic here
    });
  };
  