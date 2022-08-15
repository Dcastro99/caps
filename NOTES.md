
# > **TODO and example**

1. [ ] event 1 from vendor alert drivers' system that an order request was received and a package needs a driver to pick it up
2. [ ] event 2, from the drivers perspective, this is his first notificaiton, the system is telling him here is a package that neesd to be picked up and delivered

3. [ ] event 3, from the drivers perspective, i want to EMIT a notification back to the system that i picked up said package and am "in-transit"
4. [ ] event 4, from the drivers perspective, when i drop off said package, i want to EMIT a notification back to the system that i have drop it off.
5. [ ] event 5, from the vendors perspective, i want to receive an alert from the driver that the package was delivered.

## **Exapmple**

```javascript
methods: {
  newOrder: {
  //generates new order
  },

  customer : {
    // generates customer data
  },
  inTransit: {
    // changes status to in-transit and updates time, then returns the object
  },
  orderDelivered: {
    // changes status to deliverd and updates time, then returns the object
  },
  vendor: {
    // changes status to pickup and emits the word "driverListener" and calls the driver method
  },
  driver: {
    // this method checks if there is a pickup object and if that objects status is "pickup".
    // - if it is we emit the word "change", and reutnr the result of a call to the inTransit method
    // - if it is not we emit the word 'location' and call the order delivered message
  },
  delivery: {
    // this method emits two words for 'change' ...
  }
}
```


