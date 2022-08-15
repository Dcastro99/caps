'use strict';

const EventEmmitter = require('events');
const chance = require('chance');
const Chance = new chance();
const caps = new EventEmmitter();

// //Creates new customer
// function customer() {
//   // A utility that uses Chance to make a payload for the vendor request event
//   return {
//     orderID: Chance.string({ length: 7 }),
//     store: Chance.pickone(['Game Stop', 'Foot locker', 'Best Buy', 'Target', 'Cabelas', 'Dairy Queen']),
//     customer: Chance.name({ nationality: 'en', middle: true }),
//     address: Chance.address(),

//   };
// }
// //Creates new order
// function newOrder(orderInfo) {
//   const { orderID, store, customer, address } = orderInfo;
//   const obj = {
//     status: 'pickup',
//     time: Chance.date(),
//     payload: {
//       store,
//       orderID,
//       customer,
//       address,
//     },
//   };
//   caps.emit('change', { message: 'EVENT', payload: obj });
//   return obj;
// }


// //checks and listen for all "change" emits/events.
// caps.addListener('change', (recording) =>
//   console.log(recording.message, recording.payload ? { ...recording.payload } : ''),
// );

// // if order picked up => emit in-transit
// function inTransit(event) {
//   event.status = 'in-Transit!';
//   event.time = Chance.date();
//   caps.emit('change', { message: 'EVENT', payload: event });
//   return event;
// }

// // if driver delivers package =. emit delivered
// function orderDelivered(payload) {
//   payload.status = 'delivered';
//   payload.time = Chance.date();
//   caps.emit('change', { message: `DRIVER: delivered ${payload.payload.orderID}` });
//   return payload;
// }

// //vendor listens for "order" then passes to driver
// const vendor = (pickup) => {
//   pickup.status = 'pickup';
//   caps.emit('driverListener', driver(pickup));
// };

// //if status is 'pickup' then emit messege 'else' move to delivey method
// const driver = (pickup) => {
//   if (pickup?.status == 'pickup') {
//     caps.emit('change', { message: `Driver: Picked up ${pickup.payload.orderID}` });
//     return inTransit(pickup);
//   } else {
//     caps.emit('location', orderDelivered(pickup));
//   }
// };

// //emits vendor thank you and emits payload
// const delivery = (pickup) => {
//   caps.emit('change', { message: `VENDOR: Thank you for delivering ${pickup.payload.orderID}` });
//   caps.emit('change', { message: 'EVENT', payload: pickup });
// };



// caps.addListener('order', vendor);
// caps.addListener('driverListener', driver);
// caps.addListener('location', delivery);


// setInterval(() => {
//   caps.emit('order', newOrder(customer()));
// }, 2000);


//FUNCTIONS REFACTORED


function generateCustomer() {
  // A utility that uses Chance to make a payload for the vendor request event
  return {
    orderID: Chance.string({ length: 7 }),
    store: Chance.pickone(['Game Stop', 'Foot locker', 'Best Buy', 'Target', 'Cabelas', 'Dairy Queen']),
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
  return obj;
}
//checks and listen for all "change" emits/events.
caps.addListener('message', (recording) =>
  console.log(recording.message, recording.payload ? { ...recording.payload } : ''),
);

function changeStatus(newStatus, orderObject, notifyDriver) {
  orderObject.status = newStatus;
  orderObject.time = Chance.date();
  caps.emit('message', { message: 'EVENT', payload: orderObject });
  if (notifyDriver) {
    caps.emit('driverListener', orderObject);
  }
  return orderObject;
}

function onNewOrder(newOrder) {
  changeStatus('pickup', newOrder, true);
}

function driverListener(order) {
  if (order.status == 'pickup') {
    caps.emit('message', { message: `DRIVER: picked up ${order.payload.orderID}` });
    changeStatus('in-transit', order, true);
    return;
  } else {
    caps.emit('message', { message: `DRIVER: delivered ${order.payload.orderID}` });
    caps.emit('onDelivery', order);
    return;
  }
}

function onDelivery(order) {
  caps.emit('message', { message: `VENDOR: Thank you for delivering ${order.payload.orderID}` });
  changeStatus('delevered', order);
}
caps.addListener('newOrder', onNewOrder);
caps.addListener('driverListener', driverListener);
caps.addListener('onDelivery', onDelivery);


setInterval(() => {
  caps.emit('newOrder', generateNewOrder(generateCustomer()));
}, 2000);
