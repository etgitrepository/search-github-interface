import { RepositoryData } from '../repository';

interface FavoritesRepositoryData extends RepositoryData {
	evaluation?: number;
}

export interface FavoritesState {
	savedRepos: FavoritesRepositoryData[];
}

export enum FAVORITES_ACTION_TYPES {
	ADD_FAVORITE,
	REMOVE_FAVORITE,
	SET_EVALUATION,
}

export type FavoritesActions =
	| {
			type: FAVORITES_ACTION_TYPES.ADD_FAVORITE;
			payload: RepositoryData;
	  }
	| {
			type: FAVORITES_ACTION_TYPES.REMOVE_FAVORITE;
			payload: RepositoryData;
	  }
	| {
			type: FAVORITES_ACTION_TYPES.SET_EVALUATION;
			payload: {
				id: string;
				evaluation?: number;
			};
	  };
