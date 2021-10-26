import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Vistas
import DetallePlatillo from './views/DetallePlatillo';
import FormularioPlatilo from './views/FormularioPlatillo';
import Menu from './views/Menu';
import NuevaOrden from './views/NuevaOrden';
import ProgresoPedido from './views/ProgresoPedido';
import ResumenPedido from './views/ResumenPedido';

// Componentes
import BotonResumen from './components/ui/BotonResumen';

// Importar el state de context
import FirebaseState from './context/firebase/firebaseState';
import PedidosState from './context/pedidos/pedidosState';

const Stack = createNativeStackNavigator();

const App = () => {
    return (
        <>
            <FirebaseState>
                <PedidosState>
                    <NavigationContainer>
                        <Stack.Navigator
                            screenOptions={{
                                headerStyle: { backgroundColor: '#FFDA00' },
                                headerTitleStyle: { fontWeight: 'bold' },
                                headerTintColor: '#000',
                            }}
                        >
                            <Stack.Screen
                                name="NuevaOrden"
                                component={NuevaOrden}
                                options={{
                                    title: 'Nueva Orden',
                                }}
                            />
                            <Stack.Screen
                                name="Menu"
                                component={Menu}
                                options={{
                                    title: 'Nuestro Menú',
                                    headerRight: props => <BotonResumen />,
                                }}
                            />
                            <Stack.Screen
                                name="DetallePlatillo"
                                component={DetallePlatillo}
                                options={{
                                    title: 'Detalle Platillo',
                                }}
                            />
                            <Stack.Screen
                                name="FormularioPlatillo"
                                component={FormularioPlatilo}
                                options={{
                                    title: 'Ordenar Platillo',
                                }}
                            />
                            <Stack.Screen
                                name="ResumenPedido"
                                component={ResumenPedido}
                                options={{
                                    title: 'Resumen del pedido',
                                }}
                            />
                            <Stack.Screen
                                name="ProgresoPedido"
                                component={ProgresoPedido}
                                options={{
                                    title: 'Progreso del pedido',
                                }}
                            />
                        </Stack.Navigator>
                    </NavigationContainer>
                </PedidosState>
            </FirebaseState>
        </>
    );
};

export default App;
