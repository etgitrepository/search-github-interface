import { FAVORITES_ACTION_TYPES } from '../types';
import { favoritesReducer } from './favorites-reducer';

describe('favoritesReducer', () => {
	it('will add a new favorite', () => {
		const state = {
			savedRepos: [],
		};

		const action = {
			type: FAVORITES_ACTION_TYPES.ADD_FAVORITE,
			payload: {
				forks: 33424,
				id: '1',
				name: 'react',
				stars: 167472,
				url: 'some-url',
				evaluation: 0,
			},
		};

		const newState = favoritesReducer(state, action);

		expect(newState.savedRepos).toEqual([
			{
				forks: 33424,
				id: '1',
				name: 'react',
				stars: 167472,
				url: 'some-url',
				evaluation: 0,
			},
		]);
	});

	it('will remove a favorite', () => {
		const state = {
			savedRepos: [
				{
					forks: 33424,
					id: '1',
					name: 'react',
					stars: 167472,
					url: 'some-url',
					evaluation: 0,
				},
			],
		};

		const action = {
			type: FAVORITES_ACTION_TYPES.REMOVE_FAVORITE,
			payload: {
				forks: 33424,
				id: '1',
				name: 'react',
				stars: 167472,
				url: 'some-url',
				evaluation: 0,
			},
		};

		const newState = favoritesReducer(state, action);

		expect(newState.savedRepos).toEqual([]);
	});

	it('will set evaluation', () => {
		const state = {
			savedRepos: [
				{
					forks: 33424,
					id: '1',
					name: 'react',
					stars: 167472,
					url: 'some-url',
					evaluation: 0,
				},
			],
		};

		const action = {
			type: FAVORITES_ACTION_TYPES.SET_EVALUATION,
			payload: {
				forks: 33424,
				id: '1',
				name: 'react',
				stars: 167472,
				url: 'some-url',
				evaluation: 3,
			},
		};

		const newState = favoritesReducer(state, action);

		expect(newState.savedRepos).toEqual([
			{
				forks: 33424,
				id: '1',
				name: 'react',
				stars: 167472,
				url: 'some-url',
				evaluation: 3,
			},
		]);
	});
});
