import React, { useContext } from 'react';
import { Button, Text } from 'native-base';
import { useNavigation } from '@react-navigation/core';

import globalStyles from '../../styles/global';
import PedidosContext from '../../context/pedidos/pedidosContext';

const BotonResumen = () => {
    const navigation = useNavigation();

    // Leer el objeto de pedido
    const { pedido } = useContext(PedidosContext);

    if (!pedido.length) {
        return null;
    }
    return (
        <>
            <Button
                style={[globalStyles.btn, { marginRight: -20 }]}
                onPress={() => navigation.navigate('ResumenPedido')}
            >
                <Text style={globalStyles.btnTexto}>Ir a pedido</Text>
            </Button>
        </>
    );
};

export default BotonResumen;
