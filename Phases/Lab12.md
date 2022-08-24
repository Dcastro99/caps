> ## Phase 2 Requirements

In **Phase 2**, we’ll be changing the underlying networking implementation of our `CAPS` system from using node events to using a library called `Socket.io` so that clients can communicate over a network. `Socket.io` manages the connection pool for us, making broadcasting much easier to operate, and works well both on the terminal (between servers) and with web clients.

The core functionality we’ve already built remains the same. The difference in this phase is that we’ll be creating a networking layer. As such, the user stories that speak to application functionality remain unchanged, but our developer story changes to reflect the work needed for refactoring.

- As a vendor, I want to alert the system when I have a package to be picked up.

- As a driver, I want to be notified when there is a package to be delivered.

- As a driver, I want to alert the system when I have picked up a package and it is in transit.

- As a driver, I want to alert the system when a package has been delivered.

- As a vendor, I want to be notified when my package has been delivered.

# LAB - 12

## Deployment Test

- Author: Danny Castro
- Collaborator and assistance: Josh McClung


### Setup

`.env` requirements

N/A

### Running the app

Must run 4 terminals:

- node caps.js
- node vendor.js
- node driver.js
- node customer.js

> ###Terminal view:

![](/img/terminal-view-lab12.png)

**Returns Object =>**

```javascript
EVENT {
  status: 'pickup',
  time: 2041-07-19T15:11:58.246Z,
  payload: {
    store: 'Dairy Queen',
    orderID: 'mi[8qe&',
    customer: 'Hulda Sophie Parker',
    address: '835 Meluk Pass'
  }
}
DRIVER: picked up mi[8qe&
EVENT {
  status: 'in-transit',
  time: 2033-05-31T14:34:40.919Z,
  payload: {
    store: 'Dairy Queen',
    orderID: 'mi[8qe&',
    customer: 'Hulda Sophie Parker',
    address: '835 Meluk Pass'
  }
}
DRIVER: delivered mi[8qe&
VENDOR: Thank you for delivering mi[8qe&
EVENT {
  status: 'delevered',
  time: 2044-12-22T11:34:35.081Z,
  payload: {
    store: 'Dairy Queen',
    orderID: 'mi[8qe&',
    customer: 'Hulda Sophie Parker',
    address: '835 Meluk Pass'
  }
}
```

### Tests


> ## UML

*(Created with figma)*

![](/img/CAPS-UML.png)

