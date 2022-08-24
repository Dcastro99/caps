
const { generateNewOrder, changeStatus, caps, onDelivery } = require('../events');


describe('generates new order', () => {
  it('should create status and time. passes payload', () => {
    const obj = generateNewOrder(
      {
        store: 'string',
        orderID: 'string',
        customer: 'string',
        address: 'string',
      },
    );
  });


});
