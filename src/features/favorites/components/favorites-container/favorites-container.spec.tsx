import { MemoryRouter } from 'react-router-dom';
import { FavoritesContainer } from './favorites-container';
import { fireEvent, render, screen } from '@testing-library/react';

import { favoritesContext } from '../../context/favorites-provider';
import { FAVORITES_ACTION_TYPES } from '../../types';

const defaultState = {
	savedRepos: [
		{
			id: '1',
			name: 'react',
			description:
				'A declarative, efficient, and flexible JavaScript library for building user interfaces.',
			stars: 167472,
			forks: 33424,
			evaluation: 5,
			url: 'some-url',
		},
	],
};

describe('FavoritesContainer', () => {
	const setup = (state = defaultState, dispatch = jest.fn()) => {
		return render(
			<MemoryRouter>
				<favoritesContext.Provider value={{ state, dispatch }}>
					<FavoritesContainer />
				</favoritesContext.Provider>
			</MemoryRouter>,
		);
	};

	it('will render no favorites message', () => {
		setup({ savedRepos: [] });

		expect(
			screen.getByText('No repositories saved as favorites.'),
		).toBeInTheDocument();
	});

	it('will render favorites', () => {
		setup();

		expect(screen.getByText('react')).toBeInTheDocument();
	});

	it('will handle evaluation change', () => {
		const dispatch = jest.fn();
		setup(defaultState, dispatch);

		fireEvent.click(screen.getAllByRole('radio')[0]);

		expect(dispatch).toHaveBeenCalledWith({
			type: FAVORITES_ACTION_TYPES.SET_EVALUATION,
			payload: {
				id: '1',
				evaluation: 1,
			},
		});
	});

	it('will handle remove click', () => {
		const dispatch = jest.fn();
		setup(defaultState, dispatch);

		fireEvent.click(screen.getByRole('button', { name: 'Remove' }));

		expect(dispatch).toHaveBeenCalledWith({
			type: FAVORITES_ACTION_TYPES.REMOVE_FAVORITE,
			payload: {
				id: '1',
				name: 'react',
				description:
					'A declarative, efficient, and flexible JavaScript library for building user interfaces.',
				stars: 167472,
				forks: 33424,
				evaluation: 5,
				url: 'some-url',
			},
		});
	});
});
