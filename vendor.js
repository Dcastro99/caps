const { io } = require('socket.io-client');

const vendors = ['Game Stop', 'Foot locker', 'Best Buy', 'Target', 'Cabelas', 'Dairy Queen', 'Apple', 'Amazon', 'CodeFellows'];
function setupVendorPool() {
  vendors.forEach((v) => {
    const socket = io('ws://localhost:3001');
    socket.emit('newVendor', v);
    socket.on('customerOrder', (data) => {
      console.log('New order from ', data.payload.store);
      socket.emit('pickup', data);
    });

    socket.on('delivered', (body) => {
      setTimeout(() => {
        console.log('Thank you for deliviering ORDER:', body.payload.orderID);
      }, 1500);
    });
  });

}


setupVendorPool();


