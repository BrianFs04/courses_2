import React, { useReducer } from 'react';
import _ from 'lodash';

import FirebaseReducer from './firebaseReducer';
import FirebaseContext from './firebaseContext';

// Types
import { OBTENER_PRODUCTOS_EXITO } from '../../types';

import firebase from '../../firebase';

const FirebaseState = props => {
    // Crear state inicial
    const initialState = {
        menu: [],
    };

    // useReducer con dispatch para ejecutar las funciones
    const [state, dispatch] = useReducer(FirebaseReducer, initialState);

    // Función que se ejecuta para traer los productos
    const obtenerProductos = () => {
        // Consultar firebase
        firebase.db
            .collection('productos')
            .where('existencia', '==', true) // Trae solo los que esten en existencia
            .onSnapshot(manejarSnapshot);

        function manejarSnapshot(snapshot) {
            let platillos = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data(),
            }));

            // Ordenar por categoria con lodash
            platillos = _.sortBy(platillos, 'categoria');

            // Tenemos resultados de la base de datos
            dispatch({
                type: OBTENER_PRODUCTOS_EXITO,
                payload: platillos,
            });
        }
    };

    return (
        <FirebaseContext.Provider
            value={{ menu: state.menu, firebase, obtenerProductos }}
        >
            {props.children}
        </FirebaseContext.Provider>
    );
};

export default FirebaseState;
