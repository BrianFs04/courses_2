import React, { useEffect, useState, useContext } from 'react';
import { FirebaseContext } from '../../firebase';

import Orden from '../ui/Orden';

const Ordenes = () => {
	// Context con las operaciones de firebase
	const { firebase } = useContext(FirebaseContext);

	// State con las ordenes
	const [ordenes, setOrdenes] = useState([]);

	useEffect(() => {
		const ObtenerOrdenes = () => {
			firebase.db
				.collection('ordenes')
				.where('completado', '==', false)
				.onSnapshot(manejarSnapshot);
		};
		ObtenerOrdenes();
	}, []);

	const manejarSnapshot = (snapshot) => {
		const ordenes = snapshot.docs.map((doc) => ({
			id: doc.id,
			...doc.data(),
		}));
		setOrdenes(ordenes);
	};
	return (
		<>
			<h1 className='text-3xl font-light mb-4'>Ordenes</h1>
			<div className='sm:flex sm:flex-wrap -mx-3'>
				{ordenes.map((orden) => (
					<Orden key={orden.id} orden={orden} />
				))}
			</div>
		</>
	);
};

export default Ordenes;
