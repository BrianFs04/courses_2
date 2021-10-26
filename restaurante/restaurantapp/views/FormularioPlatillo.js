import React, { useContext, useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/core';
import { Alert, View } from 'react-native';
import {
    Container,
    Form,
    Icon,
    Grid,
    Col,
    Button,
    Text,
    Input,
    Footer,
    FooterTab,
} from 'native-base';

import globalStyles from '../styles/global';
import PedidosContext from '../context/pedidos/pedidosContext';

const FormularioPlatilo = () => {
    // State para cantidades
    const [cantidad, setCantidad] = useState(1);
    const [total, setTotal] = useState(0);

    // Context
    const { platillo, guardarPedido } = useContext(PedidosContext);
    const { precio } = platillo;

    // Redireccionar
    const navigation = useNavigation();

    // En cuanto el componente carga, calcular la cantidad a pagar
    useEffect(() => {
        calcularTotal();
    }, [cantidad]);

    // Calcula el total del platillo por su cantidad
    const calcularTotal = () => {
        const totalPagar = precio * cantidad;
        setTotal(totalPagar);
    };

    // Decrementar e incrementar
    const decrementar = () => {
        if (cantidad > 1) {
            setCantidad(current => +current - 1);
        }
    };

    const incrementar = () => {
        setCantidad(current => +current + 1);
    };

    // Confirma si la orden es correcta
    const confirmarOrden = () => {
        Alert.alert(
            '¿Deseas confirmar tu pedido?',
            'Un pedido confirmado ya no se podrá modificar',
            [
                {
                    text: 'Confirmar',
                    onPress: () => {
                        // Almacenar el pedido al pedido principal
                        const pedido = {
                            ...platillo,
                            cantidad,
                            total,
                        };

                        guardarPedido(pedido);

                        // Navegar hacía el resumen
                        navigation.navigate('ResumenPedido');
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
                <Form>
                    <Text style={globalStyles.titulo}>Cantidad</Text>
                    <Grid>
                        <Col>
                            <Button
                                props
                                dark
                                style={{ height: 80, justifyContent: 'center' }}
                                onPress={() => decrementar()}
                            >
                                <Icon style={{ fontSize: 40 }} name="remove" />
                            </Button>
                        </Col>
                        <Col>
                            <Input
                                style={{
                                    textAlign: 'center',
                                    fontSize: 20,
                                    marginTop: 40,
                                }}
                                keyboardType="numeric"
                                value={cantidad.toString()}
                                onChangeText={val => setCantidad(val)}
                            />
                        </Col>
                        <Col>
                            <Button
                                props
                                dark
                                style={{ height: 80, justifyContent: 'center' }}
                                onPress={() => incrementar()}
                            >
                                <Icon style={{ fontSize: 40 }} name="add" />
                            </Button>
                        </Col>
                    </Grid>
                    <Text style={[{ marginTop: 90 }, globalStyles.cantidad]}>
                        Subtotal: ${total}
                    </Text>
                </Form>
            </View>
            <Footer>
                <FooterTab>
                    <Button
                        style={globalStyles.btn}
                        onPress={() => confirmarOrden()}
                    >
                        <Text style={globalStyles.btnTexto}>
                            Agregar al pedido
                        </Text>
                    </Button>
                </FooterTab>
            </Footer>
        </Container>
    );
};

export default FormularioPlatilo;
