import FactoryMachines from '../components/factoryMachines';

import machinesList from '../testMachines/machineList';

const orders = ['A1', 'C1', 'E1', 'D1', 'C1', 'B1', 'E1'];

function FactoryFloor() {
  return (
    <div>
      <FactoryMachines machines={machinesList} orders={orders} />
    </div>
  );
}

export default FactoryFloor;
