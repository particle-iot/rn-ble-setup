import React from 'react';
import { render } from '@testing-library/react-native';
import { JoinWiFi } from './join-wifi';
jest.mock('@particle/react-native-ble-setup-library', () => {
	return {
		useBLESetup: jest.fn()
	};
});
import { useBLESetup } from '@particle/react-native-ble-setup-library';

describe('JoinWiFi view', () => {
	const onContinue = jest.fn();

	it('shows the joining view', () => {
		(useBLESetup as jest.Mock).mockReturnValue({});
		const { toJSON } = render(
			<JoinWiFi onContinue={onContinue} />
		);
		expect(toJSON()).toMatchSnapshot();
	});

	it('shows the indicator when joining', () => {
		(useBLESetup as jest.Mock).mockReturnValue({
			isJoiningWiFiNetwork: true
		});
		const { toJSON } = render(
			<JoinWiFi
				onContinue={onContinue}
				selectedNetwork={{ ssid: 'foo' }} />
		);
		expect(toJSON()).toMatchSnapshot();
	});

	it('joins the network', () => {
		const joinWiFiNetworkMock = jest.fn();
		(useBLESetup as jest.Mock).mockReturnValue({
			joinWiFiNetwork: joinWiFiNetworkMock
		});
		const selectedNetwork = { ssid: 'foo' };
		const wifiPassword = 'bar';
		const { toJSON } = render(
			<JoinWiFi
				onContinue={onContinue}
				selectedNetwork={selectedNetwork}
				wifiPassword={wifiPassword} />
		);
		expect(toJSON()).toMatchSnapshot();
		expect(joinWiFiNetworkMock).toBeCalledWith(selectedNetwork, wifiPassword);
	});
});
