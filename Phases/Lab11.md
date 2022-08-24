> ## Phase 1 Requirements

Today, we begin the first of a 4-Phase build of the **CAPS** system, written in Node.js. In this first phase, our goal is to setup a pool of events and handler functions, with the intent being to refactor parts of the system throughout the week, but keep the handlers themselves largely the same. The task of “delivering a package” doesn’t change (the handler), even if the mechanism for triggering that task (the event) does.

The following user/developer stories detail the major functionality for this phase of the project.

- As a vendor, I want to alert the system when I have a package to be picked up.

- As a driver, I want to be notified when there is a package to be delivered.

- As a driver, I want to alert the system when I have picked up a package and it is in transit.

- As a driver, I want to alert the system when a package has been delivered.

- As a vendor, I want to be notified when my package has been delivered.



# LAB - 11

## Deployment Test

- Author: Danny Castro
- TA/code assistance: Josh McClung


### Setup

`.env` requirements

- `PORT` - 3000

### Running the app

- node events.js

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

![](/img/uml-lab11.png)
