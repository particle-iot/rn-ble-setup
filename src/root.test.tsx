import React from 'react';
import { render, waitFor, fireEvent } from '@testing-library/react-native';
jest.mock('@particle/react-native-ble-setup-library', () => {
	return {
		useBLESetup: jest.fn(),
		BLEStatus: jest.requireActual('@particle/react-native-ble-setup-library/src/types').BLEStatus
	};
});
import { Root, SetupStep } from './root';
import { useBLESetup, BLEStatus } from '@particle/react-native-ble-setup-library';
import { View, Text, Button } from 'react-native';

jest.mock('./views/device-details');
jest.mock('./views/look-for-device');
jest.mock('./views/connect-to-device');
jest.mock('./views/wifi-list');
jest.mock('./views/wifi-credentials');
jest.mock('./views/join-wifi');

import { DeviceDetails } from './views/device-details';
import { LookForDevice } from './views/look-for-device';
import { ConnectToDevice } from './views/connect-to-device';
import { WiFiList } from './views/wifi-list';
import { WiFiCredentials } from './views/wifi-credentials';
import { JoinWiFi } from './views/join-wifi';

const FakeComponent: React.FC<{
	testName?: '',
	onBack?: () => void,
	onContinue?: () => void
}> = ({
	testName,
	onBack,
	onContinue
}) => {
	return (
		<View>
			<Text>{testName}</Text>
			<Button onPress={onBack} title='Back' />
			<Button onPress={onContinue} title='Continue' />
		</View>
	);
};

describe('Root view', () => {
	const mockViews = () => {
		(DeviceDetails as jest.Mock).mockImplementation((props) => <FakeComponent {...props} testName='DeviceDetails' />);
		(LookForDevice as jest.Mock).mockImplementation((props) => <FakeComponent {...props} testName='LookForDevice' />);
		(ConnectToDevice as jest.Mock).mockImplementation((props) => <FakeComponent {...props} testName='ConnectToDevice' />);
		(WiFiList as jest.Mock).mockImplementation((props) => <FakeComponent {...props} testName='WiFiList' />);
		(WiFiCredentials as jest.Mock).mockImplementation((props) => <FakeComponent {...props} testName='WiFiCredentials' />);
		(JoinWiFi as jest.Mock).mockImplementation((props) => <FakeComponent {...props} testName='JoinWiFi' />);
	};

	it('shows the message about BLE being off', () => {
		(useBLESetup as jest.Mock).mockReturnValue({
			error: 'foo'
		});
		const { toJSON } = render(
			<Root />
		);
		expect(toJSON()).toMatchSnapshot();
	});

	it('shows the enter device details view', () => {
		(useBLESetup as jest.Mock).mockReturnValue({
			status: BLEStatus.PoweredOn
		});
		(DeviceDetails as jest.Mock).mockReturnValue(<View testID="DeviceDetails" />);
		const { toJSON } = render(
			<Root />
		);
		expect(toJSON()).toMatchSnapshot();
	});

	it('shows the look for device view', () => {
		(useBLESetup as jest.Mock).mockReturnValue({
			status: BLEStatus.PoweredOn
		});
		(LookForDevice as jest.Mock).mockReturnValue(<View testID="LookForDevice" />);
		const { toJSON } = render(
			<Root defaultCurrentStep={SetupStep.LookForDevice} />
		);
		expect(toJSON()).toMatchSnapshot();
	});

	it('shows the connect to device view', () => {
		(useBLESetup as jest.Mock).mockReturnValue({
			status: BLEStatus.PoweredOn
		});
		(ConnectToDevice as jest.Mock).mockReturnValue(<View testID="ConnectToDevice" />);
		const { toJSON } = render(
			<Root defaultCurrentStep={SetupStep.ConnectToDevice} />
		);
		expect(toJSON()).toMatchSnapshot();
	});

	it('shows the WiFi list view', () => {
		(useBLESetup as jest.Mock).mockReturnValue({
			status: BLEStatus.PoweredOn
		});
		(WiFiList as jest.Mock).mockReturnValue(<View testID="WiFiList" />);
		const { toJSON } = render(
			<Root defaultCurrentStep={SetupStep.WiFiList} />
		);
		expect(toJSON()).toMatchSnapshot();
	});

	it('shows the WiFi credentials view', () => {
		(useBLESetup as jest.Mock).mockReturnValue({
			status: BLEStatus.PoweredOn
		});
		(WiFiCredentials as jest.Mock).mockReturnValue(<View testID="WiFiCredentials" />);
		const { toJSON } = render(
			<Root defaultCurrentStep={SetupStep.WiFiCredentials} />
		);
		expect(toJSON()).toMatchSnapshot();
	});

	it('shows the join WiFi view', () => {
		(useBLESetup as jest.Mock).mockReturnValue({
			status: BLEStatus.PoweredOn
		});
		(JoinWiFi as jest.Mock).mockReturnValue(<View testID="JoinWiFi" />);
		const { toJSON } = render(
			<Root defaultCurrentStep={SetupStep.JoinWiFi} />
		);
		expect(toJSON()).toMatchSnapshot();
	});

	it('moves between the steps', () => {
		(useBLESetup as jest.Mock).mockReturnValue({
			status: BLEStatus.PoweredOn,
			disconnect: jest.fn()
		});
		mockViews();
		const { getByText }  = render(<Root />);

		// Moves forward in the steps
		expect(getByText('DeviceDetails')).toBeDefined();
		fireEvent.press(getByText('Continue'));
		expect(getByText('LookForDevice')).toBeDefined();
		fireEvent.press(getByText('Continue'));
		expect(getByText('ConnectToDevice')).toBeDefined();
		fireEvent.press(getByText('Continue'));
		expect(getByText('WiFiList')).toBeDefined();
		fireEvent.press(getByText('Continue'));
		expect(getByText('WiFiCredentials')).toBeDefined();

		// Moves back in the steps
		fireEvent.press(getByText('Back'));
		expect(getByText('WiFiList')).toBeDefined();
		fireEvent.press(getByText('Back'));
		expect(getByText('ConnectToDevice')).toBeDefined();
		fireEvent.press(getByText('Back'));
		// Connect to device returns to DeviceDetails not LookForDevice
		expect(getByText('DeviceDetails')).toBeDefined();
		fireEvent.press(getByText('Continue'));
		fireEvent.press(getByText('Back'));
		expect(getByText('DeviceDetails')).toBeDefined();
	});

	it('disconnects from BLE setup and returns to details after JoinWifi', async () => {
		const disconnect = jest.fn();
		(useBLESetup as jest.Mock).mockReturnValue({
			status: BLEStatus.PoweredOn,
			disconnect
		});
		const { getByText }  = render(<Root />);

		// Go to JoinWiFi
		fireEvent.press(getByText('Continue'));
		fireEvent.press(getByText('Continue'));
		fireEvent.press(getByText('Continue'));
		fireEvent.press(getByText('Continue'));
		fireEvent.press(getByText('Continue'));
		expect(getByText('JoinWiFi')).toBeDefined();
		fireEvent.press(getByText('Continue'));
		expect(disconnect).toHaveBeenCalled();
		await waitFor(() => expect(getByText('DeviceDetails')).toBeDefined());
	});
});
