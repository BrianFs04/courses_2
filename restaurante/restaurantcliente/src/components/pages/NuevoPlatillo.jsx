import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import FileUploader from 'react-firebase-file-uploader';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import { FirebaseContext } from '../../firebase';

const NuevoPlatillo = () => {
	// State para las imagenes
	const [subiendo, setSubiendo] = useState(false);
	const [progreso, setProgreso] = useState(0);
	const [urlImagen, setUrlImagen] = useState('');

	// Context con las operaciones de firebase
	const { firebase } = useContext(FirebaseContext);

	// Hook para redireccionar
	const navigate = useNavigate();

	// Validación y leer los datos del formulario
	const formik = useFormik({
		initialValues: {
			nombre: '',
			precio: '',
			categoria: '',
			imagen: '',
			descripcion: '',
		},
		validationSchema: Yup.object({
			nombre: Yup.string()
				.min(3, 'Los platillos deben tener al menos 3 caracteres')
				.required('El nombre del platillo es obligatorio'),
			precio: Yup.number()
				.min(1, 'Debes agregar un número')
				.required('El precio es obligatorio'),
			categoria: Yup.string().required('La categoria es obligatoria'),
			descripcion: Yup.string()
				.min(10, 'La descripción debe ser más larga')
				.required('La descripcion es obligatoria'),
		}),
		onSubmit: (platillo) => {
			try {
				platillo.existencia = true;
				platillo.imagen = urlImagen;
				firebase.db.collection('productos').add(platillo);

				// Redireccionar
				navigate('/menu');
			} catch (error) {
				console.log(error);
			}
		},
	});

	// Todo sobre las imagenes
	const handleUploadStart = () => {
		setProgreso(0);
		setSubiendo(true);
	};
	const handleUploadError = (error) => {
		setSubiendo(false);
		console.log(error);
	};
	const handleUploadSuccess = async (nombreImg) => {
		setProgreso(100);
		setSubiendo(false);

		// Almacenar la URL de destino
		const url = await firebase.storage
			.ref('productos')
			.child(nombreImg)
			.getDownloadURL();
		console.log(url);
		setUrlImagen(url);
	};
	const handleProgress = (progreso) => {
		setProgreso(progreso);
		console.log(progreso);
	};
	return (
		<>
			<h1 className='text-3xl font-light mb-4'>Agregar Platillo</h1>
			<div className='flex justify-center mt-10'>
				<div className='w-full max-w-3xl '>
					<form onSubmit={formik.handleSubmit}>
						<div className='mb-4'>
							<label
								className='block text-gray-700 text-sm font-bold mb-2'
								htmlFor='nombre'
							>
								Nombre
							</label>
							<input
								id='nombre'
								className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
								type='text'
								placeholder='Nombre platillo'
								onChange={formik.handleChange}
								value={formik.values.nombre}
								onBlur={formik.handleBlur}
							/>
						</div>
						{formik.touched.nombre && formik.errors.nombre ? (
							<div
								className='bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-5'
								role='alert'
							>
								<p className='font-bold'>Hubo un error:</p>
								<p>{formik.errors.nombre}</p>
							</div>
						) : null}
						<div className='mb-4'>
							<label
								className='block text-gray-700 text-sm font-bold mb-2'
								htmlFor='precio'
							>
								Precio
							</label>
							<input
								id='precio'
								className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
								type='number'
								placeholder='$20'
								min='0'
								onChange={formik.handleChange}
								value={formik.values.precio}
								onBlur={formik.handleBlur}
							/>
						</div>
						{formik.touched.precio && formik.errors.precio ? (
							<div
								className='bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-5'
								role='alert'
							>
								<p className='font-bold'>Hubo un error:</p>
								<p>{formik.errors.precio}</p>
							</div>
						) : null}
						<div className='mb-4'>
							<label
								className='block text-gray-700 text-sm font-bold mb-2'
								htmlFor='categoria'
							>
								Categoria
							</label>
							<select
								name='categoria'
								id='categoria'
								className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
								onChange={formik.handleChange}
								value={formik.values.categoria}
								onBlur={formik.handleBlur}
							>
								<option value=''>-- Seleccione --</option>
								<option value='desayuno'>Desayuno</option>
								<option value='almuerzo'>Almuerzo</option>
								<option value='cena'>Cena</option>
								<option value='bebida'>Bebidas</option>
								<option value='postre'>Postres</option>
								<option value='ensaladas'>Ensaladas</option>
							</select>
						</div>
						{formik.touched.categoria && formik.errors.categoria ? (
							<div
								className='bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-5'
								role='alert'
							>
								<p className='font-bold'>Hubo un error:</p>
								<p>{formik.errors.categoria}</p>
							</div>
						) : null}
						<div className='mb-4'>
							<label
								className='block text-gray-700 text-sm font-bold mb-2'
								htmlFor='imagen'
							>
								Imagen
							</label>
							<FileUploader
								accept='image/*'
								id='imagen'
								name='imagen'
								randomizeFilename
								storageRef={firebase.storage.ref('productos')}
								onUploadStart={handleUploadStart}
								onUploadError={handleUploadError}
								onUploadSuccess={handleUploadSuccess}
								onProgress={handleProgress}
							/>
							{/* <input
								id='imagen'
								className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
								type='file'
								onChange={formik.handleChange}
								value={formik.values.imagen}
								onBlur={formik.handleBlur}
							/> */}
						</div>
						{subiendo && (
							<div className='h-12 w-full border relative'>
								<div
									className='bg-green-500 absolute left-0 top-0 text-white px-2 text-sm h-12 flex items-center'
									style={{ width: `${progreso}%` }}
								>
									{progreso}%
								</div>
							</div>
						)}
						{urlImagen && (
							<p className='bg-green-500 text-white p-3 text-center my-5'>
								La imagen se subió correctamente
							</p>
						)}
						<div className='mb-4'>
							<label
								className='block text-gray-700 text-sm font-bold mb-2'
								htmlFor='descripcion'
							>
								Descripción
							</label>
							<textarea
								id='descripcion'
								className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline h-40'
								placeholder='Descripción del platillo'
								onChange={formik.handleChange}
								value={formik.values.descripcion}
								onBlur={formik.handleBlur}
							></textarea>
						</div>
						{formik.touched.descripcion &&
						formik.errors.descripcion ? (
							<div
								className='bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-5'
								role='alert'
							>
								<p className='font-bold'>Hubo un error:</p>
								<p>{formik.errors.descripcion}</p>
							</div>
						) : null}
						<input
							type='submit'
							className='bg-gray-800 hover:bg-gray-900 w-full mt-5 p-2 text-white uppercase font-bold'
							value='Agregar platillo'
						/>
					</form>
				</div>
			</div>
		</>
	);
};

export default NuevoPlatillo;
