import { act, render, screen, waitFor } from '@testing-library/react';
import { RepositorySearch } from './RepositorySearch';
import userEvent from '@testing-library/user-event';

describe('RepositorySearch', () => {
	const setup = (setValue = jest.fn()) => {
		return render(<RepositorySearch setQuery={setValue} />);
	};

	it('should return the value entered by the user', async () => {
		const setValue = jest.fn();
		setup(setValue);

		const input = screen.getByPlaceholderText('Search repository...');

		await act(async () => {
			await userEvent.type(input, 'react');
		});

		await waitFor(() => expect(setValue).toHaveBeenCalledWith('react')); // But will get called within 350ms
	});
});
