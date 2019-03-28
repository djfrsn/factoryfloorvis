import { queueOrders, testOrders } from '../../testMachines';
import partsList from '../../testMachines/partsList';

// The above code will create a queue for each machine and the test it needs to run
// FactoryMachines will be wrapped in MachinesStatus( using context api) that takes machineOperations as an input
// MachineStatus will return the status of what test are running on each machine by streaming results of running test
// As well return a 'startTest' function that begines running machineOperations

const FactoryMachines = ({ machines, orders }) => {
  const machinesOperations = queueOrders({ machines, orders, partsList });
  // console.log(machinesOperations);
  const runOperations = testOrders(machinesOperations);
  return <div>Visual List of machines and current operation, etc</div>;
};

export default FactoryMachines;
