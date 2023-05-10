import React from 'react';
import { render } from '@testing-library/react-native';
import { ErrorModal } from './error-modal';

describe('ErrorModal view', () => {
	const visible = true;
	const onClose = jest.fn();

	it('shows the modal', () => {
		const { toJSON } = render(
			<ErrorModal
				visible={visible}
				onClose={onClose} />
		);
		expect(toJSON()).toMatchSnapshot();
	});
});
