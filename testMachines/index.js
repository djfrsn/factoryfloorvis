import Queue from '../utils/Queue';

// Groupings of Test Queues(stored as hash) will map to Machine ID
export function queueOrders({ machines, orders, partsList }) {
  // Create a Queue for each machine to store it's test operations
  const MachineQueues = machines.reduce((MachineQueue, { machine_id }) => {
    return { ...MachineQueue, [machine_id]: new Queue() };
  }, {});

  // For each order enqueue all required test to the appropriate MachineQueue
  orders.forEach(order => {
    const { required_test } = partsList[order];

    required_test.forEach(machine_id =>
      MachineQueues[machine_id].enqueue({
        machine_id,
        order,
        test_name: machines[machine_id].name,
        test_status: 'untested'
      })
    );
  });

  return MachineQueues;
}
