import React, { useContext, useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Container, Text, H1, H3, Button } from 'native-base';
import { useNavigation } from '@react-navigation/core';

import globalStyles from '../styles/global';
import PedidosContext from '../context/pedidos/pedidosContext';
import firebase from '../firebase';
import Countdown from 'react-countdown';

const ProgresoPedido = () => {
    const navigation = useNavigation();

    const { idPedido } = useContext(PedidosContext);

    const [tiempo, setTiempo] = useState(0);
    const [completado, setCompletado] = useState(false);

    useEffect(() => {
        const obtenerProducto = () => {
            firebase.db
                .collection('ordenes')
                .doc(idPedido)
                .onSnapshot(function (doc) {
                    setTiempo(doc.data().tiempoentrega);
                    setCompletado(doc.data().completado);
                });
        };
        obtenerProducto();
    }, []);

    // Muestra el countdown
    const renderer = ({ minutes, seconds }) => {
        return (
            <Text style={styles.tiempo}>
                {minutes}:{seconds}
            </Text>
        );
    };

    return (
        <>
            <Container style={globalStyles.contenedor}>
                <View style={[globalStyles.contenido, { marginTop: 50 }]}>
                    {completado ? (
                        <>
                            <H1 style={styles.textoCompletado}>Orden Lista</H1>
                            <H3 style={styles.textoCompletado}>
                                Por favor, pase a recoger su pedido
                            </H3>
                            <Button
                                style={[globalStyles.btn, { marginTop: 100 }]}
                                rounded
                                block
                                dark
                                onPress={() =>
                                    navigation.navigate('NuevaOrden')
                                }
                            >
                                <Text style={globalStyles.btnTexto}>
                                    Comenzar una orden nueva
                                </Text>
                            </Button>
                        </>
                    ) : !tiempo ? (
                        <>
                            <Text style={{ textAlign: 'center' }}>
                                Hemos recibido tu orden...
                            </Text>
                            <Text style={{ textAlign: 'center' }}>
                                Estamos calculando el tiempo de entrega
                            </Text>
                        </>
                    ) : (
                        <>
                            <Text style={{ textAlign: 'center' }}>
                                Su orden estará lista en:
                            </Text>
                            <Text style={{ textAlign: 'center' }}>
                                <Countdown
                                    date={Date.now() + tiempo * 60000}
                                    renderer={renderer}
                                />
                            </Text>
                        </>
                    )}
                </View>
            </Container>
        </>
    );
};

const styles = StyleSheet.create({
    tiempo: {
        marginBottom: 20,
        fontSize: 60,
        textAlign: 'center',
        marginTop: 30,
    },
    textoCompletado: {
        textAlign: 'center',
        textTransform: 'uppercase',
        marginBottom: 20,
    },
});

export default ProgresoPedido;
