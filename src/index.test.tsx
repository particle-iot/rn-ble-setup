import React from 'react';
import { render } from '@testing-library/react-native';
jest.mock('react-native-ble-plx', () => {
	return {
		BleManager: jest.fn()
	};
});
jest.mock('@particle/react-native-ble-setup-library', () => {
	return {
		SetupProvider: jest.fn()
	};
});
import { BleManager } from 'react-native-ble-plx';
import { SetupProvider } from '@particle/react-native-ble-setup-library';
import { App, SERVICE_UUID, VERSION_CHAR_UUID, TX_CHAR_UUID, RX_CHAR_UUID } from './index';
import { View } from 'react-native';

jest.mock('expo', () => {
	return {
		registerRootComponent: jest.fn()
	};
});

describe('App', () => {
	it('renders the root', () => {
		(SetupProvider as jest.Mock).mockReturnValue(<View testID='fake-child' />);
		render(
			<App />
		);
		expect(SetupProvider).toBeCalledWith({
			manager: new BleManager,
			children: expect.anything(),
			serviceUUID: SERVICE_UUID,
			versionCharacteristicUUID: VERSION_CHAR_UUID,
			txCharacteristicUUID: TX_CHAR_UUID,
			rxCharacteristicUUID: RX_CHAR_UUID
		}, {});
	});
});
