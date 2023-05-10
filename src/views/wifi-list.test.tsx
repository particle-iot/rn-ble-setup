import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
jest.mock('@particle/react-native-ble-setup-library', () => {
	return {
		useBLESetup: jest.fn()
	};
});
import { renderNetworkThunk, WiFiList } from './wifi-list';
import { useBLESetup } from '@particle/react-native-ble-setup-library';

describe('WiFiList view', () => {
	const onBack = jest.fn();
	const onContinue = jest.fn();
	const setSelectedNetwork = jest.fn();

	it('shows the list', () => {
		const scanForWiFiNetworksMock = jest.fn();

		(useBLESetup as jest.Mock).mockReturnValue({
			isScanningWiFiNetworks: false,
			scanForWiFiNetworks: scanForWiFiNetworksMock,
			foundWiFiNetworks: [{
				rssi: -321
			}]
		});
		const { toJSON } = render(
			<WiFiList
				onBack={onBack}
				onContinue={onContinue}
				setSelectedNetwork={setSelectedNetwork} />
		);
		expect(toJSON()).toMatchSnapshot();
		expect(scanForWiFiNetworksMock).toBeCalled();
		expect(setSelectedNetwork).toBeCalledWith(undefined);
	});

	it('shows the indicator when scanning', () => {
		const scanForWiFiNetworksMock = jest.fn();

		(useBLESetup as jest.Mock).mockReturnValue({
			isScanningWiFiNetworks: true,
			scanForWiFiNetworks: scanForWiFiNetworksMock
		});
		const { toJSON } = render(
			<WiFiList
				onBack={onBack}
				onContinue={onContinue}
				setSelectedNetwork={setSelectedNetwork} />
		);
		expect(toJSON()).toMatchSnapshot();
		expect(scanForWiFiNetworksMock).not.toBeCalled();
		expect(setSelectedNetwork).not.toBeCalled();
	});

	it('highlights the selected network', () => {
		const scanForWiFiNetworksMock = jest.fn();
		const selectedNetwork = {
			ssid: 'foo',
			rssi: -123
		};

		(useBLESetup as jest.Mock).mockReturnValue({
			isScanningWiFiNetworks: false,
			scanForWiFiNetworks: scanForWiFiNetworksMock,
			foundWiFiNetworks: [selectedNetwork]
		});
		const { toJSON } = render(
			<WiFiList
				onBack={onBack}
				onContinue={onContinue}
				setSelectedNetwork={setSelectedNetwork}
				selectedNetwork={selectedNetwork} />
		);
		expect(toJSON()).toMatchSnapshot();
	});

	it('selects the network', () => {
		const networks = [{
			ssid: 'foo',
			rssi: -123
		}];
		const setSelectedNetworkMock = jest.fn();
		const renderNetwork = renderNetworkThunk({
			setSelectedNetwork: setSelectedNetworkMock
		});

		const { getByTestId } = render(renderNetwork({ item: networks[0] }));
		fireEvent.press(getByTestId('button'));
		expect(setSelectedNetworkMock).toBeCalledWith(networks[0]);
	});
});
