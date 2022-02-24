import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Button } from "react-native-paper";
import Toast from "react-native-root-toast";
import { addProductCartApi, } from "../../api/cart";
import colors from '../../../styles/colors';

export default function Buy(props) {
    const { product, quantity } = props;


    const addProductCart = async () => {
        const response = await addProductCartApi(product._id, quantity)

        if (response) {
            Toast.show("Producto añadido al carrito", {
                position: Toast.positions.CENTER
            })

        } else {
            Toast.show("ERROR al añadir el producto al carrito", {
                position: Toast.positions.CENTER
            })
        }
    };


    return (
        <View style={{ zIndex: 1 }}>
            <Button

                mode="text"
                color={colors.primary}
                icon="cart"
                onPress={addProductCart}
            >
                Añadir al carrito
            </Button>
        </View>
    )
}

const styles = StyleSheet.create({
    btnBuyCotent: {
        backgroundColor: "#008fe9",
        paddingVertical: 5,
    },
    btnlabel: {
        fontSize: 18,
    },
    btn: {
        marginTop: 20,
    }

})

