import React, { Dispatch, createContext, useReducer } from 'react';

import { FavoritesActions, FavoritesState } from '../types';
import { favoritesReducer } from './favorites-reducer';

interface FavoritesContext {
	state: FavoritesState;
	dispatch: Dispatch<FavoritesActions>;
}

export const favoritesContext = createContext<FavoritesContext>({
	state: { savedRepos: [] },
	dispatch: () => null,
});

export const FavoritesProvider = ({
	children,
}: {
	children: React.ReactNode;
}) => {
	const [state, dispatch] = useReducer(favoritesReducer, {
		savedRepos: [],
	});

	return (
		<favoritesContext.Provider value={{ state, dispatch }}>
			{children}
		</favoritesContext.Provider>
	);
};
