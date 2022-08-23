const { io } = require('socket.io-client');
const Chance = new require('chance')();
const customerIo = io('ws://localhost:3001/customer');

function generateCustomer() {
  // A utility that uses Chance to make a payload for the vendor request event
  return {
    orderID: Chance.string({ length: 7 }),
    // store: Chance.pickone(['Game Stop', 'Foot locker', 'Best Buy', 'Target', 'Cabelas', 'Dairy Queen', 'Apple', 'Amazon', 'CodeFellows']),
    // store: Chance.pickone(['acme-widgets', '1-800-flowers', 'Nike', 'Zara', 'Walmart', 'Target']),
    store: Chance.pickone(['acme-widgets', '1-800-flowers']),

    customer: Chance.name({ nationality: 'en', middle: true }),
    address: Chance.address(),
  };
}

function generateNewOrder(orderInfo) {
  const { orderID, store, customer, address } = orderInfo;
  const obj = {
    messageID: Chance.bb_pin(),
    status: 'pickup',
    time: Chance.date(),
    payload: {
      store,
      orderID,
      customer,
      address,
    },
  };
  customerIo.emit('order', obj);

}

setInterval(() => {
  generateNewOrder(generateCustomer());
}, 10000);

// setTimeout(() => {
//   process.exit();
// }, 8000);

