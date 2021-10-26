import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Container, Button, Text } from 'native-base';
import { useNavigation } from '@react-navigation/core';

import globalStyles from '../styles/global';

const NuevaOrden = () => {
    const navigation = useNavigation();
    return (
        <>
            <Container style={globalStyles.contenedor}>
                <View style={[globalStyles.contenido, styles.contenido]}>
                    <Button
                        style={globalStyles.btn}
                        rounded
                        block
                        onPress={() => navigation.navigate('Menu')}
                    >
                        <Text style={globalStyles.btnTexto}>
                            Crear Nueva Orden
                        </Text>
                    </Button>
                </View>
            </Container>
        </>
    );
};

const styles = StyleSheet.create({
    contenido: {
        justifyContent: 'center',
    },
});

export default NuevaOrden;
