const { io } = require('socket.io-client');

// const vendors = ['acme-widgets', '1-800-flowers', 'Nike', 'Zara', 'Walmart', 'Target'];
const vendors = ['acme-widgets', '1-800-flowers'];

function setupVendorPool() {
  vendors.forEach((v) => {
    const vendor = io('ws://localhost:3001/vendor');
    vendor.emit('newVendor', v);// Placing vendors into rooms
    vendor.emit('getAll', v);// checks queue for orders missed
    vendor.on('customerOrder', (data) => {
      console.log('New order from ', data.payload.store);

      // here when vendor gets new order, just send the new order to the CAPS sever and store it in the vendors ordersToDeliver array(queue). then when a driver connects, grab the first order in the queue, and set the driver name on the order.
      vendor.emit('pickup', data);
    });

    vendor.on('delivered', (body) => {
      setTimeout(() => {
        console.log('Thank you for deliviering ORDER:', body.payload.orderID);
      }, 1500);
    });

    vendor.on('VendorQueue', (data) => {
      console.log(data[0].payload.store, 'You\'re current order satatus:', data);
    });

  });
}


setupVendorPool();


