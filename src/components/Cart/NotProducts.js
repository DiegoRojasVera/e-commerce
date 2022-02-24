import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function NotProducts() {
    return (
        <View style={{ position: 'relative', zIndex: 1 }}>
            <View style={styles.container}>
                <Text style={styles.text}>NO TIENES PRODUCCTO EN EL CARRITO. . .</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
        
    },

    text: {
        fontSize: 16,
    },
});