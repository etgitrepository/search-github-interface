import { mapRepositoriesData } from './map-repositories-data';

describe('mapRepositoriesData', () => {
	it('should return empty array if data is undefined', () => {
		const data = {
			search: {
				pageInfo: {
					hasNextPage: false,
					hasPreviousPage: false,
					startCursor: '',
					endCursor: '',
				},
				nodes: undefined,
			},
		};

		const result = mapRepositoriesData(data);

		expect(result).toEqual([]);
	});

	it('should return empty array if no repository data is returned', () => {
		const data = {
			search: {
				pageInfo: {
					hasNextPage: false,
					hasPreviousPage: false,
					startCursor: '',
					endCursor: '',
				},
				nodes: [
					{
						__typename: 'User',
						id: '123',
					},
				],
			},
		} as any;

		const result = mapRepositoriesData(data);

		expect(result).toEqual([]);
	});

	it('should return mapped data', () => {
		const data = {
			search: {
				pageInfo: {
					hasNextPage: false,
					hasPreviousPage: false,
					startCursor: '',
					endCursor: '',
				},
				nodes: [
					{
						__typename: 'Repository',
						id: '1',
						name: 'name',
						stargazerCount: 1,
						url: 'url',
						forkCount: 1,
					},
					{
						__typename: 'Repository',
						id: '2',
						name: 'name-2',
						stargazerCount: 2,
						url: 'url-2',
						forkCount: 2,
					},
				],
			},
		} as any;

		const result = mapRepositoriesData(data);

		expect(result).toEqual([
			{
				id: '1',
				name: 'name',
				stars: 1,
				url: 'url',
				forks: 1,
			},
			{
				id: '2',
				name: 'name-2',
				stars: 2,
				url: 'url-2',
				forks: 2,
			},
		]);
	});
});
