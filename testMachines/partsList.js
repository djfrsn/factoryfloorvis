// Required test values map to machine id
// 0 - Vibration
// 1 - Thermal
// 2 - Humidity
// 3 - Radiation
const partsList = {
  A1: {
    required_test: ['0', '1', '3']
  },
  B1: {
    required_test: ['0', '3']
  },
  C1: {
    required_test: ['1', '3', '2']
  },
  D1: {
    required_test: ['0', '1', '3', '2']
  },
  E1: {
    required_test: ['0', '1', '3', '2']
  }
};

export default partsList;
