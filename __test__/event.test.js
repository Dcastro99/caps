
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

  // // These tests are wired with async/await --- so much cleaner!
  // it('should respond with a 404 on an invalid method', async () => {
  //   const response = await mockRequest.put('/food');
  //   expect(response.status).toBe(404);
  // });
});
