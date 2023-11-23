import { RepositoryData } from '../../repository';
import {
	FAVORITES_ACTION_TYPES,
	FavoritesActions,
	FavoritesState,
} from '../types';

export const favoritesReducer = (
	state: FavoritesState,
	action: FavoritesActions,
) => {
	switch (action.type) {
		case FAVORITES_ACTION_TYPES.ADD_FAVORITE:
			return {
				...state,
				savedRepos: [...state.savedRepos, { ...action.payload, evaluation: 0 }],
			};
		case FAVORITES_ACTION_TYPES.REMOVE_FAVORITE:
			return {
				...state,
				savedRepos: state.savedRepos.filter(
					(repo: RepositoryData) => repo.id !== action.payload.id,
				),
			};

		case FAVORITES_ACTION_TYPES.SET_EVALUATION:
			return {
				...state,
				savedRepos: state.savedRepos.map((repo: RepositoryData) => {
					if (repo.id === action.payload.id) {
						return {
							...repo,
							evaluation: action.payload.evaluation,
						};
					}

					return repo;
				}),
			};
		default:
			return state;
	}
};
