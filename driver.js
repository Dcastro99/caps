const { io } = require('socket.io-client');
const Chance = new require('chance')();
const socket = io('ws://localhost:3001');

socket.on('newOrderForDriver', (data) => {
  setNewTime(data);
  console.log('pickup', data.payload.orderID);
  setTimeout(() => {
    socket.emit('inTransit', data);
  }, 1500);

  setNewTime(data);
  setTimeout(() => {
    socket.emit('delivered', data);
  }, 1500);
  setTimeout(() => {

    console.log('delivered', data.payload.orderID);
  }, 2500);
});

function setNewTime(params) {
  params.time = Chance.date();
  return params;
}
