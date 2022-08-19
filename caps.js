const socketIo = require('socket.io');

// Our socket server
const io = socketIo(3001);




//Server connects with clients
io.on('connection', (client) => {

  //Creates rooms for vendor
  client.on('newVendor', (vendorName) => {
    console.log('creating new room for ', vendorName);
    client.join(vendorName);
  });

  // New order from customer
  client.on('order', (data) => {
    console.log('new order from', data.payload.store);
    client.to(data.payload.store).emit('customerOrder', data);

  });

  client.on('pickup', (data) => {
    console.log('EVENT', data);
    setTimeout(() => {
      // not sure why io emit works here and not client.io
      io.emit('newOrderForDriver', data);
    }, 1500);
  });

  client.on('inTransit', (data) => {
    // setTimeout(() => {
    data.status = 'in-transit';
    console.log('EVENT', data);
    // }, 1000);
  });

  client.on('delivered', (data) => {
    data.status = 'delivered';
    setTimeout(() => {
      console.log('EVENT', data);
      client.to(data.payload.store).emit('delivered', data);
    }, 2000);
  });
});



