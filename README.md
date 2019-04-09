
### Factory floor visualization.
## Specs

We are creating a Factory Operating System for next-generation hardware companies, and you are creating one of its UIs. Create an application to help a factory test supervisor visualize their test process, given the following:

- The factory has multiple test machines that test parts. See the list of machines below.
- Each part has a list of tests that need to be completed before shipping out of the factory. See the list of parts and their tests below.
- The factory operates in the time measurement called a "step"
- There can be one new part order per step
- Each test completes in one "step"
- Tests can happen in any order
- A given test can only be completed at a specific machine (e.g. thermal test can only run at a Thermal machine)
- Each machine can handle multiple parts at a time

Types of machines in the factory:
- Vibration
- Thermal
- Humidity
- Radiation

The company's parts list, as well as each of their required tests is given here:
- A1: vibration, thermal, radiation
- B1: vibration, radiation
- C1: thermal, radiation, humidity
- D1: vibration, thermal, radiation, humidity
- E1: humidity

Build an application that allows the factory test supervisor to view parts moving through the test factory. Also, allow the factory test supervisor see the parts that are completed with their tests. The initial part orders are given by this array:

```javascript
orders = ['A1', 'C1', 'E1', 'D1', 'C1', 'B1', 'E1'];
```

Build an interface for the factory test supervisor to add another part to the queue of part orders and continue stepping through the factory.

# Install

npm install

# Run

`npm run dev`
Go to localhost:3000 in browser

# Reference

Data structure implementations from : https://github.com/trekhleb/javascript-algorithms
