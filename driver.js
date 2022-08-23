const { io } = require('socket.io-client');
const Chance = new require('chance')();


function setDriverUp() {

  const drivers = ['driver3', 'driver2', 'driver1'];
  drivers.forEach((D) => {
    const driver = io('ws://localhost:3001/driver');
    driver.emit('newDriver', D);
    driver.emit('getAll', D);

    driver.on('newOrderForDriver', (data) => {
      setNewTime(data);
      console.log(data.driverName, ' picked up ', data.payload.orderID);
      setTimeout(() => {
        driver.emit('inTransit', data);
      }, 1000);

      setNewTime(data);

      setTimeout(() => {
        driver.emit('delivered', data);
      }, 1500);

      setTimeout(() => {
        console.log('delivered', data.payload.orderID);
      }, 2500);
    });

    driver.on('DriverQueue', (data) => {
      console.log(data[0].driverName, 'delivered order(s)', data);

    });

  });
}

function setNewTime(params) {
  params.time = Chance.date();
  return params;
}
setDriverUp();
