import { act, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useSearchRepositories } from '../../../../data';
import { RepositoryContainer } from './repository-container';
import { MemoryRouter } from 'react-router-dom';
import { favoritesContext } from '../../../favorites';
import { FAVORITES_ACTION_TYPES } from '../../../favorites/types';

jest.mock('@mui/material', () => ({
	...jest.requireActual('@mui/material'),
	CircularProgress: () => <p>Loading...</p>,
}));

jest.mock('@mui/icons-material', () => ({
	...jest.requireActual('@mui/icons-material'),
	Favorite: () => 'Favorite',
	FavoriteBorderOutlined: () => 'Unfavorite',
}));

jest.mock('../../../../data');

describe('RepositoryContainer', () => {
	const mockData = (isLoading = false) => {
		const nodes = [
			{
				__typename: 'Repository',
				id: 1,
				name: 'react',
				description:
					'A declarative, efficient, and flexible JavaScript library for building user interfaces.',
				stargazerCount: 167472,
				forkCount: 33424,
			},
			{
				__typename: 'Repository',
				id: 2,
				name: 'react-native',
				description: 'A framework for building native apps with React.',
				stargazerCount: 90369,
				forkCount: 18696,
			},
		];

		const pageInfo = {
			endCursor: 'end-cursor',
			hasNextPage: true,
			hasPreviousPage: true,
			startCursor: 'start-cursor',
		};

		(useSearchRepositories as jest.Mock).mockReturnValue({
			isLoading,
			data: {
				search: {
					pageInfo,
					nodes,
				},
			},
		});
	};

	const setup = (isLoading = false, dispatch = jest.fn()) => {
		mockData(isLoading);

		return render(
			<MemoryRouter>
				<favoritesContext.Provider
					value={{ state: { savedRepos: [] }, dispatch }}
				>
					<RepositoryContainer />
				</favoritesContext.Provider>
			</MemoryRouter>,
		);
	};

	afterEach(() => {
		jest.clearAllMocks();
	});

	it('should render loading state', async () => {
		const isLoading = true;
		setup(isLoading);

		const input = screen.getByPlaceholderText('Search repository...');

		await act(async () => {
			await userEvent.type(input, 'react');
		});

		expect(await screen.findByText('Loading...')).toBeInTheDocument();
	});

	it('should render the repositories returned from the API', async () => {
		setup();

		expect(await screen.findByText('react')).toBeInTheDocument();
	});

	it('should trigger new search when query changes', async () => {
		setup();

		const input = screen.getByPlaceholderText('Search repository...');

		await act(async () => {
			await userEvent.type(input, 'react');
		});

		await waitFor(() =>
			expect(useSearchRepositories).lastCalledWith({
				query: 'react',
			}),
		);
	});

	it('should handle favorite click', async () => {
		const dispatch = jest.fn();
		setup(false, dispatch);

		const favoriteButton = (await screen.findAllByText(/Unfavorite/))[0];

		await act(async () => {
			await userEvent.click(favoriteButton);
		});

		expect(dispatch).toHaveBeenCalledWith({
			type: FAVORITES_ACTION_TYPES.ADD_FAVORITE,
			payload: {
				forks: 33424,
				id: 1,
				name: 'react',
				stars: 167472,
				url: undefined,
			},
		});
	});
});
