const cursos = [
	{
		titulo: 'Javascript Moderno Guía definitiva Construye +10 Proyectos',
		tecnologia: 'Javascript ES6',
	},
	{
		titulo: 'React - La Guía Completa: Hooks Context Redux MERN +15 Apps',
		tecnologia: 'React',
	},
	{
		titulo: 'Node js - Bootcamp Desarrollo Web inc. MVC y REST API',
		tecnologia: 'React',
	},
	{
		titulo: 'React js - ReactJS Avanzado - FullStack React GraphQL y Apollo',
		tecnologia: 'React',
	},
];

const resolvers = {
	Query: {
		obtenerCursos: () => cursos,
		obtenerTecnologia: () => cursos,
	},
};

export default resolvers;
