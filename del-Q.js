const { io } = require('socket.io-client');
// const Chance = new require('chance')();
const dQ = io('ws://localhost:3001/del-Q');

dQ.on('qIfno', (data) => {
  console.log('messageID:', data.messageID);
  console.log('Payload:', data.payload);
});
