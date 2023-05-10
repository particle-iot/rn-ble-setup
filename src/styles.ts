import { StyleSheet } from 'react-native';

export const Style = StyleSheet.create({
	centered: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		padding: 20
	},
	vertical: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		flexDirection: 'column',
		width: '100%'
	},
	modalBackground: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: 'rgba(0, 0, 0, 0.5)'
	},
	modal: {
		margin: 20,
		backgroundColor: 'white',
		borderRadius: 20,
		padding: 35,
		alignItems: 'center',
		shadowColor: '#000',
		shadowOffset: {
			width: 0,
			height: 2
		},
		shadowOpacity: 0.25,
		shadowRadius: 4,
		elevation: 5,
		width: '90%'
	},
	modalBody: {
		marginBottom: 20,
		textAlign: 'center'
	},
	nav: {
		bottom: 20,
		position: 'absolute',
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		flexDirection: 'row',
	},
	button: {
		alignItems: 'center',
		justifyContent: 'center',
		paddingVertical: 12,
		paddingHorizontal: 16,
		marginHorizontal: 8,
		borderRadius: 4,
		elevation: 3,
		backgroundColor: 'black',
		color: 'white'
	},
	buttonDisabled: {
		alignItems: 'center',
		justifyContent: 'center',
		paddingVertical: 12,
		paddingHorizontal: 16,
		marginHorizontal: 8,
		borderRadius: 4,
		elevation: 3,
		backgroundColor: '#ccc',
		color: 'white'
	},
	buttonText: {
		fontSize: 16,
		lineHeight: 21,
		fontWeight: 'bold',
		letterSpacing: 0.25,
		color: 'white',
	},
	input: {
		height: 40,
		width: 200,
		marginBottom: 20,
		borderWidth: 1,
		borderRadius: 4,
		padding: 10,
	},
	h2: {
		fontSize: 16,
		lineHeight: 21,
		fontWeight: 'bold',
		marginBottom: 20
	},
	emoji: {
		fontSize: 96,
		marginBottom: 20
	},
	list: {
		flex: 1,
		alignSelf: 'stretch',
		margin: 20,
		marginBottom: 85
	},
	listItem: {
		padding: 10,
		fontSize: 18
	},
	listItemSelected: {
		padding: 10,
		fontSize: 18,
		backgroundColor: 'black',
		borderRadius: 4
	},
	listItemTextSelected: {
		color: 'white'
	}
});
