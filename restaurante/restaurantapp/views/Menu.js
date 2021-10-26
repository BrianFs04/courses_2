import React, { useContext, useEffect, Fragment } from 'react';
import { View, StyleSheet } from 'react-native';
import { Container, List, ListItem, Thumbnail, Text, Body } from 'native-base';
import { useNavigation } from '@react-navigation/core';

import globalStyles from '../styles/global';
import FirebaseContext from '../context/firebase/firebaseContext';
import PedidosContext from '../context/pedidos/pedidosContext';

const Menu = () => {
    // Context de firebase
    const { menu, obtenerProductos } = useContext(FirebaseContext);

    // Context de pedido
    const { seleccionarPlatillo } = useContext(PedidosContext);

    // Hook para redireccionar
    const navigation = useNavigation();

    useEffect(() => {
        obtenerProductos();
    }, []);

    const transformCategoria = categoria => {
        const t1 = categoria.charAt(0).toUpperCase();
        const t2 = categoria.slice(1, -1);
        const t3 = categoria.slice(-1);

        return `${t1}${t2}${t3}s`;
    };

    const mostrarHeading = (categoria, i) => {
        if (i > 0) {
            const categoriaAnterior = menu[i - 1].categoria;

            if (categoriaAnterior !== categoria) {
                return (
                    <View style={styles.separador}>
                        <Text style={styles.separadorTexto}>
                            {transformCategoria(categoria)}
                        </Text>
                    </View>
                );
            }
        } else {
            return (
                <View style={styles.separador}>
                    <Text style={styles.separadorTexto}>
                        {transformCategoria(categoria)}
                    </Text>
                </View>
            );
        }
    };

    return (
        <>
            <Container style={globalStyles.contenedor}>
                <List>
                    {menu.map((platillo, i) => {
                        const {
                            imagen,
                            nombre,
                            descripcion,
                            categoria,
                            precio,
                            id,
                        } = platillo;
                        return (
                            <Fragment key={id}>
                                {mostrarHeading(categoria, i)}
                                <ListItem
                                    onPress={() => {
                                        // eliminar algunas propiedades del platillo
                                        const { existencia, ...platillo2 } =
                                            platillo;
                                        seleccionarPlatillo(platillo2);
                                        navigation.navigate('DetallePlatillo');
                                    }}
                                >
                                    <Thumbnail large source={{ uri: imagen }} />
                                    <Body>
                                        <Text>{nombre}</Text>
                                        <Text note numberOfLines={2}>
                                            {descripcion}
                                        </Text>
                                        <Text note>Precio: {precio}</Text>
                                    </Body>
                                </ListItem>
                            </Fragment>
                        );
                    })}
                </List>
            </Container>
        </>
    );
};

const styles = StyleSheet.create({
    separador: {
        backgroundColor: '#000',
        padding: '2.5%',
    },
    separadorTexto: {
        color: '#FFDA00',
        fontWeight: 'bold',
        textTransform: 'uppercase',
    },
});

export default Menu;
