import { CodegenConfig } from '@graphql-codegen/cli';
import 'dotenv/config';

const config: CodegenConfig = {
	schema: [
		{
			[process.env.REACT_APP_API_URL as string]: {
				headers: {
					Authorization: `bearer ${process.env.REACT_APP_API_TOKEN}`,
					'user-agent': 'node.js',
				},
			},
		},
	],
	documents: 'src/data/operations/**/*.ts',
	ignoreNoDocuments: true, // for better experience with the watcher
	generates: {
		'./src/data/gql/': {
			preset: 'client',
		},
	},
};

export default config;
