import { queueOrders, testOrders } from '../../testMachines';
import partsList from '../../testMachines/partsList';

import {
  FactoryMachinesProvider,
  FactoryMachinesConsumer
} from './factoryMachinesContext';

// FactoryMachines will be wrapped in FactoryMachinesProvider( using context api) that takes machineOperations as an input
// FactoryMachinesConsumer will return the status of what test are running on each machine by streaming results as state

const FactoryMachinesContainer = ({ machines, orders, children }) => {
  const machinesOperations = queueOrders({ machines, orders, partsList });
  return (
    <FactoryMachinesProvider
      machines={machines}
      machinesOperations={machinesOperations}
    >
      {children}
    </FactoryMachinesProvider>
  );
};

const FactoryMachines = ({ machines, orders }) => {
  return (
    <FactoryMachinesConsumer>
      {factory_data => {
        const { machines, testOrders, state } = factory_data;

        return (
          <div className="factoryMachines">
            <h1>Factory Machines</h1>
            <h2>Factory Steps: {state.steps}</h2>
            <button onClick={testOrders}>Test Orders</button>
            {machines.map(({ machine_id, name }) => {
              const { tested_operations } = state.testedOperations[machine_id];
              return (
                <div key={machine_id}>
                  <div className="machineName">{name}</div>
                  <ul className="machineOperations">
                    {tested_operations.map((test_result, key) => {
                      const { order, test_status } = test_result;
                      return (
                        <li key={key}>
                          Order: {order}
                          <br />
                          Test Status: {test_status}
                        </li>
                      );
                    })}
                  </ul>
                </div>
              );
            })}
            <style jsx>{`
              .FactoryMachines {
                display: flex;
                flex-direction: column;
              }
              button {
                margin-bottom: 1rem;
              }
              .machineOperations {
                list-style: none;
              }
            `}</style>
          </div>
        );
      }}
    </FactoryMachinesConsumer>
  );
};

export default props => (
  <FactoryMachinesContainer {...props}>
    <FactoryMachines />
  </FactoryMachinesContainer>
);
