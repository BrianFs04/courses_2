import { OBTENER_PRODUCTOS_EXITO } from '../../types';

const FirebaseReducer = (state, action) => {
    switch (action.type) {
        case OBTENER_PRODUCTOS_EXITO:
            return {
                ...state,
                menu: action.payload,
            };
        default:
            return state;
    }
};

export default FirebaseReducer;
