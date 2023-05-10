import { BleManager } from 'react-native-ble-plx';
import { SetupProvider } from '@particle/react-native-ble-setup-library';
import { Root } from './src/root';

// Service UUID
export const SERVICE_UUID = '6e400021-b5a3-f393-e0a9-e50e24dcca9e';
// Version characteristic UUID
export const VERSION_CHAR_UUID = '6e400024-b5a3-f393-e0a9-e50e24dcca9e';
// TX characteristic UUID
export const TX_CHAR_UUID = '6e400022-b5a3-f393-e0a9-e50e24dcca9e';
// RX characteristic UUID
export const RX_CHAR_UUID = '6e400023-b5a3-f393-e0a9-e50e24dcca9e';

export default function App() {
  // Instantiate the BLE Manager. There can only be one instance
  // therefore we need to pass it around
  const bleManager = new BleManager();

  return (
    <SetupProvider
        manager={bleManager}
        serviceUUID={SERVICE_UUID}
        versionCharacteristicUUID={VERSION_CHAR_UUID}
        txCharacteristicUUID={TX_CHAR_UUID}
        rxCharacteristicUUID={RX_CHAR_UUID}>
      <Root />
    </SetupProvider>
  );
}
