import React from 'react'
import { StyleSheet, SafeAreaView, ActivityIndicator, Text } from 'react-native'

export default function ScreenLoading(props) {
    const { text, size, color } = props;

    return (
        <SafeAreaView style={style.container}>
            <ActivityIndicator size={size} color={color} style={style.loading} />
            <Text style={style.title}>{text}</Text>
        </SafeAreaView>
    )
}

const style = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
    },
    loading: {
        marginBottom: 10,
    },
    title: {
        fontSize: 18,
    },
});

ScreenLoading.defaultProps = {
    text: "Cargando...",
    color: "#000",
}