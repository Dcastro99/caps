const socketIo = require('socket.io');
const Chance = new require('chance')();
// Our socket server
const io = socketIo(3001);
const driver = io.of('/driver');
const vendor = io.of('/vendor');
const customer = io.of('/customer');


// QUEUES>>>>>>>>
let vendorQueueMap = [];
let driverQueue = [];



// SERVER-IO>>>>>>>>
io.on('connection', (client) => {
  client.on('test', (data) => {
    console.log('We Are Live!!', data);
  });
});



// CUSTOMER-IO>>>>>>>>
customer.on('connect', (customer) => {
  // New order from customer
  customer.on('order', (data) => {
    console.log('new order from', data.payload.store);
    vendor.to(data.payload.store).emit('customerOrder', data);
  });
});



// DRIVER-IO>>>>>>>>
driver.on('connect', (driver) => {
  // if there are messages in the driver queue, send them
  // if (driverQueue.length > 0) {
  //   return driverQueue;
  // }

  driver.on('newDriver', (driverName) => {
    console.log('SocketID:', driver.id);
    console.log('creating new room for driver ', driverName);
    // vendorQueueMap[vendorName] = [];
    driver.join(driverName);
  });

  // when a driver connects, get the order queue, grab the first order, and send it to the driver.

  driver.on('inTransit', (data) => {


    // driverQueue.push(data.payload.store, data.messageID, { type: 'driver in-transit', payload: data.payload });
    setTimeout(() => {
      data.status = 'in-transit';
      driverQueue.push({ driverName: data.driverName, messeageID: data.messageID, type: 'driver in-transit', payload: data.payload });
      console.log('EVENT', data);
    }, 500);
  });

  driver.on('delivered', (data) => {
    vendorQueueMap.push({ messeageID: data.messageID, type: 'driver delivered', payload: data.payload });
    // driverQueue.push(data.payload.store, data.messageID, { type: 'driver delivered', payload: data.payload });
    console.log('DRIVER QUEUE', driverQueue);
    data.status = 'delivered';
    setTimeout(() => {
      console.log('EVENT', data);
      vendor.to(data.payload.store).emit('delivered', data);

    }, 2000);
  });

  function getAll(driverName) {
    const names = [driverName];
    let messageArry = [];

    names.forEach((n) => {
      // console.log('OK C,MON!', x.payload.store);
      driverQueue.map(x => {
        console.log('x marks the spot ', x);
        if (x.driverName === driverName) {
          // console.log('WHATIS X?', x);
          messageArry.push(x);
          driverQueue.splice(driverQueue.indexOf(x), 1);
          // console.log('VENDORINFO::', messageArry);
        }
        //
      });
    });
    if (messageArry.length > 0) {
      driver.emit('DriverQueue', messageArry);
    }
  }


  driver.on('getAll', (driver) => {
    console.log('trying to get all for driver', driver);
    getAll(driver);
  });

});



// VENDOR-IO>>>>>>>>
vendor.on('connect', (vendor) => {

  function getAll(vendorname) {
    const names = [vendorname];
    let messageArry = [];

    names.forEach((n) => {
      // console.log('OK C,MON!', x.payload.store);
      vendorQueueMap.map(x => {
        if (x.payload.store === vendorname) {
          // console.log('WHATIS X?', x);
          messageArry.push(x);
          vendorQueueMap.splice(vendorQueueMap.indexOf(x), 1);
          // console.log('VENDORINFO::', messageArry);
        }
        //
      });
    });
    if (messageArry.length > 0) {
      vendor.emit('VendorQueue', messageArry);
    }
  }


  vendor.on('getAll', (vendor) => {
    getAll(vendor);
  });

  vendor.on('newVendor', (vendorName) => {
    console.log('SocketID:', vendor.id);
    console.log('creating new room for ', vendorName);
    // vendorQueueMap[vendorName] = [];
    vendor.join(vendorName);
  });


  vendor.on('pickup', (data) => {
    // vendorQueueMap.push({ messeageID: data.messageID, type: 'driver pickedup', payload: data.payload });
    console.log('VENDOR QUEUE', vendorQueueMap);
    console.log('EVENT', data);
    // orderQueue.push(data);
    // console.log('>>>>>>>>>>>', 'STUFFS!!!');

    setTimeout(() => {
      // not sure why io emit works here and not client.io
      const driverName = Chance.pickone(['driver1', 'driver2', 'driver3']);
      data.driverName = driverName;
      driver.to(driverName).emit('newOrderForDriver', data);
    }, 1500);
  });

  vendor.on('leaveRoom', (vendorName) => {
    console.log('customer', vendorName, 'left the room.');
    vendor.leave(vendorName);
  });

});


