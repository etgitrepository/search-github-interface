/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
    "\n\tquery searchRepositoriesQuery($query: String!, $first: Int) {\n\t\tsearch(type: REPOSITORY, query: $query, first: $first) {\n\t\t\tpageInfo {\n\t\t\t\tstartCursor\n\t\t\t\tendCursor\n\t\t\t\thasNextPage\n\t\t\t\thasPreviousPage\n\t\t\t}\n\t\t\tnodes {\n\t\t\t\t... on Repository {\n\t\t\t\t\t__typename\n\t\t\t\t\tid\n\t\t\t\t\tname\n\t\t\t\t\tstargazerCount\n\t\t\t\t\turl\n\t\t\t\t\tforkCount\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n": types.SearchRepositoriesQueryDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n\tquery searchRepositoriesQuery($query: String!, $first: Int) {\n\t\tsearch(type: REPOSITORY, query: $query, first: $first) {\n\t\t\tpageInfo {\n\t\t\t\tstartCursor\n\t\t\t\tendCursor\n\t\t\t\thasNextPage\n\t\t\t\thasPreviousPage\n\t\t\t}\n\t\t\tnodes {\n\t\t\t\t... on Repository {\n\t\t\t\t\t__typename\n\t\t\t\t\tid\n\t\t\t\t\tname\n\t\t\t\t\tstargazerCount\n\t\t\t\t\turl\n\t\t\t\t\tforkCount\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n"): (typeof documents)["\n\tquery searchRepositoriesQuery($query: String!, $first: Int) {\n\t\tsearch(type: REPOSITORY, query: $query, first: $first) {\n\t\t\tpageInfo {\n\t\t\t\tstartCursor\n\t\t\t\tendCursor\n\t\t\t\thasNextPage\n\t\t\t\thasPreviousPage\n\t\t\t}\n\t\t\tnodes {\n\t\t\t\t... on Repository {\n\t\t\t\t\t__typename\n\t\t\t\t\tid\n\t\t\t\t\tname\n\t\t\t\t\tstargazerCount\n\t\t\t\t\turl\n\t\t\t\t\tforkCount\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;