import React from 'react';
import { render } from '@testing-library/react-native';
import { DeviceDetails } from './device-details';

describe('DeviceDetails view', () => {
	const setupCode = 'foo';
	const mobileSecret = 'bar';
	const setSetupCode = jest.fn();
	const setMobileSecret = jest.fn();
	const onContinue = jest.fn();

	it('shows the device info screen', () => {
		const { toJSON } = render(
			<DeviceDetails
				setupCode={setupCode}
				mobileSecret={mobileSecret}
				setSetupCode={setSetupCode}
				setMobileSecret={setMobileSecret}
				onContinue={onContinue} />
		);
		expect(toJSON()).toMatchSnapshot();
	});

	it('has a different behavior on Android', () => {
		jest.doMock('react-native/Libraries/Utilities/Platform', () => ({
			...jest.requireActual('react-native/Libraries/Utilities/Platform') as typeof Platform,
			OS: 'android'
		}));
		const { toJSON } = render(
			<DeviceDetails
				setupCode={setupCode}
				mobileSecret={mobileSecret}
				setSetupCode={setSetupCode}
				setMobileSecret={setMobileSecret}
				onContinue={onContinue} />
		);
		expect(toJSON()).toMatchSnapshot();
	});
});
