import React from 'react';
import { View, Text, TextInput, Pressable, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { Style } from '../styles';

export interface DeviceDetailsArguments {
	setupCode: string,
	setSetupCode: React.Dispatch<React.SetStateAction<string>>,
	mobileSecret: string,
	setMobileSecret: React.Dispatch<React.SetStateAction<string>>,
	onContinue: () => void
}

// eslint-disable-next-line
export const DeviceDetails = ({ setupCode, setSetupCode, mobileSecret, setMobileSecret, onContinue }: DeviceDetailsArguments): React.ReactElement => {
	return (
		<KeyboardAvoidingView
			style={Style.vertical}
			behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
			<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
				<View style={Style.vertical}>
					<Text style={Style.emoji}>✨️</Text>
					<Text style={Style.h2}>BLE WiFi setup</Text>
					<View>
						<Text>Setup code</Text>
						<TextInput
							style={Style.input}
							onChangeText={setSetupCode}
							value={setupCode}
						/>
					</View>
					<View>
						<Text>Mobile secret</Text>
						<TextInput
							style={Style.input}
							onChangeText={setMobileSecret}
							value={mobileSecret}
						/>
					</View>
					<View style={Style.nav}>
						<Pressable style={Style.button} onPress={onContinue}>
							<Text style={Style.buttonText}>Continue</Text>
						</Pressable>
					</View>
				</View>
			</TouchableWithoutFeedback>
		</KeyboardAvoidingView>
	);
};
