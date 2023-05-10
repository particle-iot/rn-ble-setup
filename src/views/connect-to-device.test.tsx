import React from 'react';
import { render } from '@testing-library/react-native';
jest.mock('@particle/react-native-ble-setup-library', () => {
	return {
		ConnectionStatus: {
			Disconnected: 1,
			Connecting: 2,
			Connected: 3
		},
		useBLESetup: jest.fn()
	};
});
import { ConnectionStatus, useBLESetup } from '@particle/react-native-ble-setup-library';
import { ConnectToDevice } from './connect-to-device';

describe('ConnectToDevice view', () => {
	const mobileSecret = 'foo';
	const onBack = jest.fn();
	const onContinue = jest.fn();

	it('shows information if no device is selected', () => {
		(useBLESetup as jest.Mock).mockReturnValue({});
		const { toJSON } = render(
			<ConnectToDevice mobileSecret={mobileSecret} onBack={onBack} onContinue={onContinue} />
		);
		expect(toJSON()).toMatchSnapshot();
		expect(onBack).toBeCalled();
	});

	it('shows information when disconnected', () => {
		const connectMock = jest.fn();
		(useBLESetup as jest.Mock).mockReturnValue({
			device: 'foo',
			connectionStatus: ConnectionStatus.Disconnected,
			connect: connectMock
		});
		const { toJSON } = render(
			<ConnectToDevice mobileSecret={mobileSecret} onBack={onBack} onContinue={onContinue} />
		);
		expect(toJSON()).toMatchSnapshot();
		expect(connectMock).toBeCalled();
	});

	it('shows information when connecting', () => {
		(useBLESetup as jest.Mock).mockReturnValue({
			device: { name: 'Foo' },
			connectionStatus: ConnectionStatus.Connecting
		});
		const { toJSON } = render(
			<ConnectToDevice mobileSecret={mobileSecret} onBack={onBack} onContinue={onContinue} />
		);
		expect(toJSON()).toMatchSnapshot();
	});

	it('shows information when connected', () => {
		(useBLESetup as jest.Mock).mockReturnValue({
			device: { name: 'Foo' },
			connectionStatus: ConnectionStatus.Connected
		});
		const { toJSON } = render(
			<ConnectToDevice mobileSecret={mobileSecret} onBack={onBack} onContinue={onContinue} />
		);
		expect(toJSON()).toMatchSnapshot();
	});
});
