const { io } = require('socket.io-client');
const Chance = new require('chance')();
const socket = io('ws://localhost:3001');

function generateCustomer() {
  // A utility that uses Chance to make a payload for the vendor request event
  return {
    orderID: Chance.string({ length: 7 }),
    store: Chance.pickone(['Game Stop', 'Foot locker', 'Best Buy', 'Target', 'Cabelas', 'Dairy Queen', 'Apple', 'Amazon', 'CodeFellows']),
    customer: Chance.name({ nationality: 'en', middle: true }),
    address: Chance.address(),

  };
}

function generateNewOrder(orderInfo) {
  const { orderID, store, customer, address } = orderInfo;
  const obj = {
    status: 'pickup',
    time: Chance.date(),
    payload: {
      store,
      orderID,
      customer,
      address,
    },
  };
  socket.emit('order', obj);
}
setInterval(() => {
  generateNewOrder(generateCustomer());
}, 10000);
