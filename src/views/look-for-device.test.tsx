import React from 'react';
import { render } from '@testing-library/react-native';
import { LookForDevice } from './look-for-device';
jest.mock('@particle/react-native-ble-setup-library', () => {
	return {
		useBLESetup: jest.fn()
	};
});
import { useBLESetup } from '@particle/react-native-ble-setup-library';

describe('LookForDevice view', () => {
	const onBack = jest.fn();
	const onContinue = jest.fn();
	const setupCode = 'foo';

	it('shows the indicator when searching', () => {
		const searchDevicesMock = jest.fn();

		(useBLESetup as jest.Mock).mockReturnValue({
			searchDevices: searchDevicesMock,
			isSearchingDevices: true
		});
		const { toJSON } = render(
			<LookForDevice
				setupCode={setupCode}
				onBack={onBack}
				onContinue={onContinue} />
		);
		expect(toJSON()).toMatchSnapshot();
		expect(searchDevicesMock).toBeCalledWith({ setupCode });
	});

	it('shows the information when a device was found', () => {
		const searchDevicesMock = jest.fn();

		(useBLESetup as jest.Mock).mockReturnValue({
			searchDevices: searchDevicesMock,
			device: { name: 'Foo' }
		});
		const { toJSON } = render(
			<LookForDevice
				setupCode={setupCode}
				onBack={onBack}
				onContinue={onContinue} />
		);
		expect(toJSON()).toMatchSnapshot();
	});

	it('shows the information when a device was found', () => {
		const searchDevicesMock = jest.fn();

		(useBLESetup as jest.Mock).mockReturnValue({
			searchDevices: searchDevicesMock
		});
		const { toJSON } = render(
			<LookForDevice
				setupCode={setupCode}
				onBack={onBack}
				onContinue={onContinue} />
		);
		expect(toJSON()).toMatchSnapshot();
	});
});
