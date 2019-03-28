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

export function testOrders(orders) {
  console.log('peek', orders[0].peek());
  console.log('dequeue', orders[0].dequeue());
  console.log('peek', orders[0].peek());

  // will step through each item in each queue and update its status from 'untested' -> 'testing' -> 'test_complete'
  // This will be done in random intervals between of 50-500ms to simulate test taking different amounts of times
  // during each 'factory step'
}
