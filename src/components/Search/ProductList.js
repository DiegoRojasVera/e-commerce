import React from 'react'
import { StyleSheet, View, Text, ScrollView, Image, TouchableWithoutFeedback } from 'react-native';
import { Button } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { map } from "lodash";
import { API_URL } from '../../Utils/constants';
import colors from '../../../styles/colors';

export default function ProductList(props) {
    const { products } = props;
    const navigation = useNavigation();

    const calcPrice = (price, discount) => {
        if (!discount) return price;
        const discountAmount = (price * discount) / 100;
        return (price - discountAmount).toFixed(2)
    }

    const goToProduct = id => {
        console.log("Cargar producot ->" + id)
         navigation.push('product', { idProduct: id });
    };
    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.title}>RESULTADOS</Text>
            {map(products, product => (
                <TouchableWithoutFeedback
                    key={product._id}
                    onPress={() => goToProduct(product._id)}
                >
                    <View style={styles.product}>
                        <View style={styles.containerImage} >
                            <Image
                                style={styles.image}
                                source={{ uri: `${API_URL}${product.main_image.url}` }}
                            />
                        </View>
                        <View style={styles.info}>
                            <Text style={styles.name} numberOfLines={3} ellipsizeMode='tail'>
                                {product.title}
                            </Text>
                            <View style={styles.price}>
                                <Text style={styles.currentPrice}>
                                    {calcPrice(product.price, product.discount)} $
                                </Text>
                                {product.discount && (
                                    <Text style={styles.oldPrice} >{product.price} Gs.</Text>
                                )}
                            </View>
                            <Button style={styles.btn} color={colors.primary}>
                                Ver Producto
                            </Button>

                        </View>
                    </View>
                </TouchableWithoutFeedback>
            ))
            }
        </ScrollView >
    )
}

const styles = StyleSheet.create({
    container: {
        paddingVertical: 20,
        paddingHorizontal: 10,
    },
    title: {
        fontWeight: "bold",
        fontSize: 19,
    },
    product: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 15,
        borderRadius: 5,
        borderWidth: 0.5,
        borderColor: "#dadde1"
    },
    image: {
        height: "100%",
        resizeMode: "contain"
    },
    containerImage: {
        width: "40%",
        height: 200,
        backgroundColor: "#ebebeb",
        padding: 5,
    },
    info: {
        padding: 10,
        width: "60%"
    },
    name: {
        fontSize: 16,
    },
    price: {
        flexDirection: "row",
        alignItems: "flex-end",
        marginTop: 5,
    },
    currentPrice: {
        fontSize: 12,
    },
    oldPrice: {
        marginLeft: 7,
        fontSize: 14,
        color: "#747474",
        textDecorationLine: 'line-through',
    },
    btn: {
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,

    },
});