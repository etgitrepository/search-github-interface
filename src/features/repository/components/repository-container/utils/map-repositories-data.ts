import { RepositoryData } from '../../..';
import { SearchRepositoriesQueryQuery } from '../../../../../data/gql/graphql';

export const mapRepositoriesData = (
	data: SearchRepositoriesQueryQuery | undefined,
): (RepositoryData | undefined)[] => {
	if (!data?.search.nodes) {
		return [];
	}

	return data.search.nodes
		.map((item) => {
			switch (item?.__typename) {
				case 'Repository':
					return {
						name: item.name,
						stars: item.stargazerCount,
						forks: item.forkCount,
						id: item.id,
						url: item.url,
					};
				default:
					return undefined;
			}
		})
		.filter((item) => item !== undefined);
};
