import { gql } from 'apollo-server';

const typeDefs = gql`
	type Curso {
		titulo: String
	}
	type Tecnologia {
		tecnologia: String
	}
	type Query {
		obtenerCursos: [Curso]
		obtenerTecnologia: [Tecnologia]
	}
`;

export default typeDefs;
