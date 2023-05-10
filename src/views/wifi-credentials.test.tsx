import React from 'react';
import { render } from '@testing-library/react-native';
import { WiFiCredentials } from './wifi-credentials';

describe('WiFiCredentials view', () => {
	const onBack = jest.fn();
	const onContinue = jest.fn();
	const setWifiPassword = jest.fn();

	beforeEach(() => {
		jest.clearAllMocks();
	});

	it('shows the form', () => {
		const selectedNetwork = {
			security: 0
		};
		const { toJSON } = render(
			<WiFiCredentials
				onBack={onBack}
				onContinue={onContinue}
				selectedNetwork={selectedNetwork}
				wifiPassword='123456789'
				setWifiPassword={setWifiPassword} />
		);
		expect(toJSON()).toMatchSnapshot();
	});

	it('disables the continue button if password it too short', () => {
		jest.doMock('react-native/Libraries/Utilities/Platform', () => ({
			...jest.requireActual('react-native/Libraries/Utilities/Platform') as typeof Platform,
			OS: 'android'
		}));
		const selectedNetwork = {
			security: 3
		};
		const { toJSON } = render(
			<WiFiCredentials
				onBack={onBack}
				onContinue={onContinue}
				selectedNetwork={selectedNetwork}
				wifiPassword='123'
				setWifiPassword={setWifiPassword} />
		);
		expect(toJSON()).toMatchSnapshot();
	});

	it('shows the back button when no network was selected', () => {
		const { toJSON } = render(
			<WiFiCredentials
				onBack={onBack}
				onContinue={onContinue}
				setWifiPassword={setWifiPassword} />
		);
		expect(toJSON()).toMatchSnapshot();
	});
});
