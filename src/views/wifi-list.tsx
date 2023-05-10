import React, { useEffect } from 'react';
import { ActivityIndicator, View, Text, Pressable, FlatList, TouchableOpacity } from 'react-native';
import { useBLESetup, INetwork } from '@particle/react-native-ble-setup-library';
import { Style } from '../styles';

export interface ListNetworksArguments {
	onBack: () => void,
	onContinue: () => void,
	selectedNetwork?: INetwork,
	setSelectedNetwork: React.Dispatch<INetwork|undefined>
}

export interface RenderNetworkThunkArguments {
	selectedNetwork?: INetwork,
	setSelectedNetwork: React.Dispatch<INetwork|undefined>
}

export const renderNetworkThunk = ({ selectedNetwork, setSelectedNetwork }: RenderNetworkThunkArguments) => {
	return ({ item }: { item: INetwork}): React.ReactElement<INetwork> => {
		const isSelected = item.ssid === selectedNetwork?.ssid;

		return (
			<TouchableOpacity
				style={isSelected ? Style.listItemSelected : Style.listItem}
				testID='button'
				onPress={() => setSelectedNetwork(item)}>
				<Text style={isSelected ? Style.listItemTextSelected : undefined}>{ `${item.ssid} (${item.rssi}dB)` }</Text>
			</TouchableOpacity>
		);
	};
};

// eslint-disable-next-line
export const WiFiList = ({ onBack, onContinue, selectedNetwork, setSelectedNetwork }: ListNetworksArguments): React.ReactElement => {
	const { scanForWiFiNetworks, isScanningWiFiNetworks, foundWiFiNetworks } = useBLESetup();

	const scan = () => {
		setSelectedNetwork(undefined);
		scanForWiFiNetworks();
	};

	useEffect(() => {
		if (!isScanningWiFiNetworks) {
			scan();
		}
	}, []);

	const renderNetwork = renderNetworkThunk({ selectedNetwork, setSelectedNetwork });
	const networkKeyExtractor = (network: INetwork) => network.ssid ? network.ssid : '';

	const content = isScanningWiFiNetworks ?
		(
			<View style={Style.vertical}>
				<ActivityIndicator size="large" color="#000000" />
				<Text style={Style.h2}>Scanning for networks...</Text>
			</View>
		)
		:
		(
			<View style={Style.vertical}>
				<Text style={Style.h2}>Found networks</Text>
				<FlatList
					data={foundWiFiNetworks}
					renderItem={renderNetwork}
					keyExtractor={networkKeyExtractor}
					extraData={selectedNetwork}
					style={Style.list} />
			</View>
		);

	return (
		<View style={Style.vertical}>
			<Text style={Style.emoji}>📶️</Text>
			{content}
			<View style={Style.nav}>
				<Pressable style={Style.button} onPress={onBack}>
					<Text style={Style.buttonText}>Back</Text>
				</Pressable>
				<Pressable
					style={isScanningWiFiNetworks ? Style.buttonDisabled : Style.button}
					onPress={scan}
					disabled={isScanningWiFiNetworks}>
					<Text style={Style.buttonText}>Rescan</Text>
				</Pressable>
				<Pressable
					style={selectedNetwork ? Style.button : Style.buttonDisabled}
					onPress={onContinue}
					disabled={!selectedNetwork} >
					<Text style={Style.buttonText}>Continue</Text>
				</Pressable>
			</View>
		</View>
	);
};
