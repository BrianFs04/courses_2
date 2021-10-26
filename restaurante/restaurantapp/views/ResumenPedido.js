import React, { useContext, useEffect } from 'react';
import { useNavigation } from '@react-navigation/core';
import { Alert, View } from 'react-native';
import {
    Container,
    List,
    ListItem,
    Thumbnail,
    Text,
    Left,
    Body,
    Button,
    H1,
    Footer,
    FooterTab,
} from 'native-base';

import globalStyles from '../styles/global';
import firebase from '../firebase';
import PedidosContext from '../context/pedidos/pedidosContext';

const ResumenPedido = () => {
    const navigation = useNavigation();
    // Context
    const { pedido, total, mostrarResumen, eliminarProducto, pedidoRealizado } =
        useContext(PedidosContext);

    useEffect(() => {
        calcularTotal();
    }, [pedido]);

    const calcularTotal = () => {
        let nuevoTotal = 0;
        nuevoTotal = pedido.reduce(
            (nuevoTotal, articulo) => nuevoTotal + articulo.total,
            0,
        );
        mostrarResumen(nuevoTotal);
    };

    // Redirecciona a progreso de pedido
    const progresoPedido = () => {
        Alert.alert(
            'Revisa tu pedido',
            'Una vez que realizas tu pedido, no podrás cambiarlo',
            [
                {
                    text: 'Confirmar',
                    onPress: async () => {
                        // Crear un objeto
                        const pedidoObj = {
                            tiempoEntrega: 0,
                            completado: false,
                            total: Number(total),
                            orden: pedido, // array
                            creado: Date.now(),
                        };

                        try {
                            const pedido = await firebase.db
                                .collection('ordenes')
                                .add(pedidoObj);
                            pedidoRealizado(pedido.id);
                            // Redireccionar a progreso
                            navigation.navigate('ProgresoPedido');
                        } catch (error) {
                            console.log(error);
                        }
                    },
                },
                {
                    text: 'Revisar',
                    style: 'cancel',
                },
            ],
        );
    };

    // Elimina un producto del arreglo de pedido
    const confirmarEliminacion = id => {
        Alert.alert(
            '¿Deseas eliminar este artículo?',
            'Una vez eliminado no se puede recuperar',
            [
                {
                    text: 'Confirmar',
                    onPress: () => {
                        // Eliminar del state
                        eliminarProducto(id);
                    },
                },
                {
                    text: 'Cancelar',
                    style: 'cancel',
                },
            ],
        );
    };

    return (
        <Container style={globalStyles.contenedor}>
            <View style={globalStyles.contenido}>
                <H1 style={globalStyles.titulo}>Resumen Pedido</H1>
                {pedido.map((platillo, i) => {
                    const { cantidad, nombre, imagen, id, precio } = platillo;
                    return (
                        <List key={id + i}>
                            <ListItem thumbnail>
                                <Left>
                                    <Thumbnail
                                        large
                                        square
                                        source={{ uri: imagen }}
                                    />
                                </Left>
                                <Body>
                                    <Text>{nombre}</Text>
                                    <Text>Cantidad: {cantidad}</Text>
                                    <Text>Precio: ${precio}</Text>
                                    <Button
                                        full
                                        small
                                        danger
                                        style={{ marginTop: 20 }}
                                        onPress={() => confirmarEliminacion(id)}
                                    >
                                        <Text
                                            style={[
                                                globalStyles.btnTexto,
                                                { color: '#FFF' },
                                            ]}
                                        >
                                            Eliminar
                                        </Text>
                                    </Button>
                                </Body>
                            </ListItem>
                        </List>
                    );
                })}
                <Text style={globalStyles.cantidad}>
                    Total a pagar: ${total}
                </Text>
                <Button
                    style={{ marginTop: 30 }}
                    onPress={() => navigation.navigate('Menu')}
                    full
                    dark
                >
                    <Text style={[globalStyles.btnTexto, { color: '#FFDA00' }]}>
                        Seguir Pidiendo
                    </Text>
                </Button>
            </View>
            <Footer>
                <FooterTab>
                    <Button
                        style={globalStyles.btn}
                        onPress={() => progresoPedido()}
                        full
                    >
                        <Text style={globalStyles.btnTexto}>
                            Ordenar pedido
                        </Text>
                    </Button>
                </FooterTab>
            </Footer>
        </Container>
    );
};

export default ResumenPedido;
