import React from 'react';
import { Routes, Route } from 'react-router';

import firebase, { FirebaseContext } from './firebase';

import Ordenes from './components/pages/Ordenes.jsx';
import Menu from './components/pages/Menu.jsx';
import NuevoPlatillo from './components/pages/NuevoPlatillo.jsx';

import SideBar from './components/ui/SideBar.jsx';

function App() {
	return (
		<FirebaseContext.Provider value={{ firebase }}>
			<div className='md:flex min-h-screen'>
				<SideBar />
				<div className='md:w-3/5 xl:w-4/5 p-6'>
					<Routes>
						<Route path='/' element={<Ordenes />} />
						<Route path='/menu' element={<Menu />} />
						<Route
							path='/nuevo-platillo'
							element={<NuevoPlatillo />}
						/>
					</Routes>
				</div>
			</div>
		</FirebaseContext.Provider>
	);
}

export default App;
