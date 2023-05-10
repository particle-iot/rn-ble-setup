import React from 'react';
import { Modal, View, Pressable, Text } from 'react-native';
import { Style } from '../styles';

export interface ErrorModalArguments {
	visible: boolean,
	error?: Error,
	onClose: () => void
}

// eslint-disable-next-line
export const ErrorModal = ({ visible, error, onClose }: ErrorModalArguments): React.ReactElement => {
	return (<Modal
		animationType="fade"
		transparent={true}
		visible={visible}
		onRequestClose={onClose}
	>
		<View style={Style.modalBackground}>
			<View style={Style.modal}>
				<Text style={Style.emoji}>😓️</Text>
				<Text style={Style.h2}>{error?.name}</Text>
				<Text style={Style.modalBody}>{error?.message}.</Text>
				<Pressable style={Style.button} onPress={onClose}>
					<Text style={Style.buttonText}>Dismiss</Text>
				</Pressable>
			</View>
		</View>
	</Modal>);
};
