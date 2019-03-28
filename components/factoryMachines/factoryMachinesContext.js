import React from 'react';

const FactoryMachinesContext = React.createContext();

export class FactoryMachinesProvider extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      steps: 0,
      startingOperationInterval: 0,
      machinesOperations: props.machinesOperations,
      testedOperations: props.machines.map(({ machine_id }) => {
        return {
          machine_id,
          tested_operations: []
        };
      })
    };
  }
  testOrders = () => {
    // Run queued test for each machine
    this.props.machines.forEach(({ machine_id }) => {
      this.runMachineOperations(this.props.machinesOperations[machine_id]);
    });
  };
  runMachineOperations = testOperations => {
    const operationsComplete = testOperations.isEmpty();
    // Run all operations until complete
    if (operationsComplete) return null;

    this.testOperation(testOperations.dequeue());
    // Run queued operations
    this.runMachineOperations(testOperations);
  };
  testOperation = operation => {
    const { machine_id } = operation;
    // we could add random stepTime between 50-500ms for some randomness
    const stepTime = 7500 * Math.random();
    // increment steps + 1 for each testOperation ran....can only run
    setTimeout(() => {
      this.setState(({ testedOperations }) => {
        const machine = testedOperations[machine_id];

        // Add latest operation and change its status to tested
        return {
          steps: this.state.steps + 1,
          startingOperationInterval: stepTime,
          testedOperations: {
            ...testedOperations,
            [machine_id]: {
              ...machine,
              tested_operations: machine.tested_operations.concat([
                {
                  ...operation,
                  test_status: 'success'
                }
              ])
            }
          }
        };
      });
    }, stepTime);
  };
  render() {
    const { children, machines } = this.props;

    return (
      <FactoryMachinesContext.Provider
        value={{
          state: this.state,
          testOrders: this.testOrders.bind(this),
          machines
        }}
      >
        {children}
      </FactoryMachinesContext.Provider>
    );
  }
}

export const FactoryMachinesConsumer = FactoryMachinesContext.Consumer;
