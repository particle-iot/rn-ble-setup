import React, { useState, useEffect } from 'react';
import { SafeAreaView, Text, View } from 'react-native';

import { useBLESetup, BLEStatus, INetwork } from '@particle/react-native-ble-setup-library';

import { DeviceDetails } from './views/device-details';
import { LookForDevice } from './views/look-for-device';
import { ConnectToDevice } from './views/connect-to-device';
import { WiFiList } from './views/wifi-list';
import { WiFiCredentials } from './views/wifi-credentials';
import { JoinWiFi } from './views/join-wifi';
import { ErrorModal } from './views/error-modal';
import { Style } from './styles';

export enum SetupStep {
	EnterDeviceDetails,
	LookForDevice,
	ConnectToDevice,
	WiFiList,
	WiFiCredentials,
	JoinWiFi
}

export const Root: React.FC<{ defaultCurrentStep?: SetupStep }> = ({
	defaultCurrentStep = SetupStep.EnterDeviceDetails
}) => {
	const [setupCode, setSetupCode] = useState<string>('');
	const [mobileSecret, setMobileSecret] = useState<string>('');
	const [currentStep, setCurrentStep] = useState<SetupStep>(defaultCurrentStep);
	const [selectedNetwork, setSelectedNetwork] = useState<INetwork | undefined>(undefined);
	const [wifiPassword, setWifiPassword] = useState<string | undefined>(undefined);

	// Get the status from the setup context
	const { status, device, disconnect, error, clearLastError } = useBLESetup();

	// Go to the beginning if we encounter any errors like disconnection
	useEffect(() => {
		if (!device && error) {
			setCurrentStep(SetupStep.EnterDeviceDetails);
		}
	}, [device, error]);

	// Make sure we can use BLE
	if (status !== BLEStatus.PoweredOn) {
		const messages = {
			[BLEStatus.Unknown]: 'Initializing BLE',
			[BLEStatus.Unsupported]: 'BLE is not supported',
			[BLEStatus.Unauthorized]: 'This app needs permission for precise location. Please go to Settings > Apps and turn them on',
			[BLEStatus.Resetting]: 'BLE is resetting',
			[BLEStatus.PoweredOff]: 'BLE is turned off',
		};
		return (
			<View style={Style.centered}>
				<Text>{ messages[status] }</Text>
			</View>
		);
	}

	// Rudimentary routing
	let step;
	// Step 1: Enter the device setup code and mobile secret
	// This data should be retreived from the backend
	if (currentStep === SetupStep.EnterDeviceDetails) {
		step = <DeviceDetails
			setupCode={setupCode}
			setSetupCode={setSetupCode}
			mobileSecret={mobileSecret}
			setMobileSecret={setMobileSecret}
			onContinue={() => setCurrentStep(SetupStep.LookForDevice)}
		/>;
	// Step 2: Search for BLE devices in provisioning mode, matching UUIDs
	// we specified.
	} else if (currentStep === SetupStep.LookForDevice) {
		step = <LookForDevice
			setupCode={setupCode}
			onBack={() => setCurrentStep(SetupStep.EnterDeviceDetails)}
			onContinue={() => setCurrentStep(SetupStep.ConnectToDevice)}
		/>;
	// Step 3: Connect to the device, handshake and establish secure connection
	} else if (currentStep === SetupStep.ConnectToDevice) {
		step = <ConnectToDevice
			mobileSecret={mobileSecret}
			onBack={() => setCurrentStep(SetupStep.EnterDeviceDetails)}
			onContinue={() => setCurrentStep(SetupStep.WiFiList)}
		/>;
	// Step 4: Request a list of available WiFi networks and present it
	// to the user.
	} else if (currentStep === SetupStep.WiFiList) {
		step = <WiFiList
			onBack={() => setCurrentStep(SetupStep.ConnectToDevice)}
			onContinue={() => setCurrentStep(SetupStep.WiFiCredentials)}
			selectedNetwork={selectedNetwork}
			setSelectedNetwork={setSelectedNetwork}
		/>;
	// (optional) Step 5: Enter credentials for WiFi network
	} else if (currentStep === SetupStep.WiFiCredentials) {
		step = <WiFiCredentials
			onBack={() => setCurrentStep(SetupStep.WiFiList)}
			onContinue={() => setCurrentStep(SetupStep.JoinWiFi)}
			selectedNetwork={selectedNetwork}
			wifiPassword={wifiPassword}
			setWifiPassword={setWifiPassword}
		/>;
	} else if (currentStep === SetupStep.JoinWiFi) {
		step = <JoinWiFi
			onContinue={async () => {
				await disconnect();
				setSelectedNetwork(undefined);
				setWifiPassword(undefined);
				setCurrentStep(SetupStep.EnterDeviceDetails);
			}}
			selectedNetwork={selectedNetwork}
			wifiPassword={wifiPassword}
		/>;
	}
	return (
		<SafeAreaView style={Style.centered}>
			{ step }
			<ErrorModal visible={!!error} error={error} onClose={clearLastError} />
		</SafeAreaView>
	);
};
