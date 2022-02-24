import React from 'react'
import { StyleSheet, View, Text } from 'react-native'

export default function ResultNotFound(props) {
    const { search } = props;
    return (

        <View style={styles.container}>
            <View style={{ zIndex: 1 }}>
                <Text style={styles.searxhText, {zIndex:1}}>No hay resultados para {search}.</Text>
            </View>
        </View>

    )
}

const styles = StyleSheet.create({
    container: {
        padding: 20
    },
    searxhText: {
        fontSize: 18,
        fontWeight: "bold",
        
    }
})