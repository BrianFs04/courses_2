import React, { useContext } from 'react';
import { Image, View } from 'react-native';
import {
    Container,
    Footer,
    FooterTab,
    Button,
    Body,
    Text,
    H1,
    Card,
    CardItem,
} from 'native-base';
import { useNavigation } from '@react-navigation/core';

import globalStyles from '../styles/global';
import PedidosContext from '../context/pedidos/pedidosContext';

const DetallePlatillo = () => {
    // Pedido context
    const { platillo } = useContext(PedidosContext);
    const { nombre, imagen, descripcion, precio } = platillo;

    // Redireccionar
    const navigation = useNavigation();

    return (
        <Container style={globalStyles.contenedor}>
            <View style={globalStyles.contenido}>
                <H1 style={globalStyles.titulo}>{nombre}</H1>
                <Card>
                    <CardItem>
                        <Body>
                            <Image
                                style={globalStyles.imagen}
                                source={{ uri: imagen }}
                            />
                            <Text style={{ marginTop: 20 }}>{descripcion}</Text>
                            <Text style={globalStyles.cantidad}>
                                Precio: ${precio}
                            </Text>
                        </Body>
                    </CardItem>
                </Card>
            </View>
            <Footer>
                <FooterTab>
                    <Button
                        style={globalStyles.btn}
                        onPress={() =>
                            navigation.navigate('FormularioPlatillo')
                        }
                    >
                        <Text style={globalStyles.btnTexto}>
                            Ordenar platillo
                        </Text>
                    </Button>
                </FooterTab>
            </Footer>
        </Container>
    );
};

export default DetallePlatillo;
