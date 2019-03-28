import { queueOrders, testOrders } from '../../testMachines';
import partsList from '../../testMachines/partsList';

// The above code will create a queue for each machine and the test it needs to run
// FactoryMachines will be wrapped in MachinesStatus( using context api) that takes machineOperations as an input
// MachineStatus will return the status of what test are running on each machine by streaming results of running test
// As well return a 'startTest' function that begines running machineOperations

function displayTest(testOperations) {
  const operationsComplete = testOperations.isEmpty();

  if (operationsComplete) return null;

  console.log(testOperations.dequeue());
  displayTest(testOperations);
}

const FactoryMachines = ({ machines, orders }) => {
  const machinesOperations = queueOrders({ machines, orders, partsList });
  // console.log(machines);
  // console.log(machinesOperations);
  return (
    <div className="factoryMachines">
      <h1>Factory Machines</h1>
      {machines.map(({ machine_id, name }) => {
        return (
          <div>
            <div className="machineName">{name}</div>
            <ul className="machineOperations">
              {displayTest(machinesOperations[machine_id])}
            </ul>
          </div>
        );
      })}
      <style jsx>{`
        .FactoryMachines {
          display: flex;
          flex-direction: column;
        }
      `}</style>
    </div>
  );
};

export default FactoryMachines;
