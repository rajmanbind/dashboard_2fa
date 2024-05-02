module.exports = {
    mongoURI: 'mongodb://localhost:27017',
    jwtSecret: 'YOUR_JWT_SECRET',
    port: process.env.PORT || 3000,
    socketPort: process.env.SOCKET_PORT || 4000
  };
  