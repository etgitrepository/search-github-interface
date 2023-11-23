import { useQuery } from '@tanstack/react-query';
import { graphql } from '../../gql';

import request from 'graphql-request';

const queryKey = ['searchRepositories'];

const searchRepositoriesByNameQueryDocument = graphql(/* GraphQL */ `
	query searchRepositoriesQuery($query: String!, $first: Int) {
		search(type: REPOSITORY, query: $query, first: $first) {
			pageInfo {
				startCursor
				endCursor
				hasNextPage
				hasPreviousPage
			}
			nodes {
				... on Repository {
					__typename
					id
					name
					stargazerCount
					url
					forkCount
				}
			}
		}
	}
`);

export const useSearchRepositories = ({ query }: { query: string }) => {
	return useQuery({
		queryKey: [...queryKey, query],
		queryFn: async () =>
			request(
				process.env.REACT_APP_API_URL as string,
				searchRepositoriesByNameQueryDocument,
				{
					query,
					first: 10,
				},
				{
					authorization: `bearer ${process.env.REACT_APP_API_TOKEN}`,
				},
			),
		enabled: !!query,
	});
};
