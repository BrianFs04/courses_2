import { ApolloServer, gql } from 'apollo-server';

// GraphQL
import typeDefs from './db/schema';
import resolvers from './db/resolvers';

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
	console.log(url);
});
