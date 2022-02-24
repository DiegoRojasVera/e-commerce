import React from 'react';
import { View, Text, StyleSheet, Image, TextInput } from 'react-native';
import { Button, IconButton } from 'react-native-paper';
import { deleteProductCartApi, increaseProductCartApi, decreaseProductCartApi } from "../../api/cart";
import { API_URL } from '../../Utils/constants';
import colors from '../../../styles/colors';


export default function Product(props) {
    const { product, setRealoadCart } = props;

    const calcPrice = (price, discount) => {
        if (!discount) return price;

        const discountAmount = (price * discount) / 100;
        return (price - discountAmount).toFixed();

    };

    const deleteProductCart = async () => {
        const response = await deleteProductCartApi(product._id);
        if (response) setRealoadCart(true);

    };

    const increaseProductCart = async () => {
        const response = await increaseProductCartApi(product._id);
        if (response) setRealoadCart(true);
    };

    const decreaseProductCart = async () => {
        const response = await decreaseProductCartApi(product._id);
        if (response) setRealoadCart(true);
    }


    return (
        <View style={styles.product}>
            <View style={styles.containerImage}>
                <Image
                    style={styles.image}
                    source={{ uri: `${API_URL}${product.main_image.url}` }}
                />
            </View>
            <View style={styles.info}>
                <View>
                    <Text
                        style={styles.name}
                        numberOfLines={3}
                        ellipsizeMode='tail'
                    >
                        {product.title}
                    </Text>
                    {/* falta comentario aqui del producto */}
                </View>
                <View style={styles.prices}>
                    <Text style={styles.currentPrice}>
                        ${" "}{calcPrice(product.price, product.discount)}
                    </Text>
                </View>
                {product.discount && (
                    <View style={styles.countainerDiscount}>
                        <Text style={styles.discountText}>Ahorras:</Text>
                        <Text style={styles.discountValue}>
                            ${" "}{((product.price * product.discount) / 100).toFixed()}(
                            {product.discount}%)
                        </Text>
                    </View>
                )}
                <View style={styles.btnsContainer}>
                    <View style={styles.selectQuantity}>
                        <IconButton
                            icon="plus"
                            color='#fff'
                            size={16}
                            style={styles.btnQuantity}
                            onPress={increaseProductCart}
                        />
                        <TextInput style={styles.inputQuantity} value={product.quantity.toString()} />
                        <IconButton
                            icon="minus"
                            color='#fff'
                            size={16}
                            style={styles.btnQuantity}
                            onPress={decreaseProductCart}
                        />
                    </View>
                    <Button
                        color='#b12704'
                        mode='contained'
                        onPress={deleteProductCart}>
                        Eliminar
                    </Button>
                </View>
            </View>
        </View>
    );
}


const styles = StyleSheet.create({
    product: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 15,
        borderRadius: 5,
        borderEndWidth: 0.5,
        borderColor: "#dadde1"
    },
    containerImage: {
        width: "40%",
        height: 170,
        backgroundColor: "#ebebeb",
        padding: 5
    },
    image: {
        height: "100%",
        resizeMode: "contain"
    },
    info: {
        padding: 5,
        width: "60%",
        justifyContent: "space-between"
    },
    name: {
        fontSize: 16,
    },
    prices: {
        flexDirection: "row",
        marginTop: 5,
        alignItems: "flex-end",
    },
    currentPrice: {
        fontSize: 16,
        color: "#b12704"
    },
    btnsContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        position: "relative",
        width: "100%"
    },
    selectQuantity: {
        flexDirection: "row",
        alignItems: "center",
    },
    btnQuantity: {
        backgroundColor: colors.primary,
        borderRadius: 5,
        margin: 0
    },
    inputQuantity: {
        paddingHorizontal: 5,
        fontSize: 16
    },
    countainerDiscount: {
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 5
    },
    discountText: {
        fontSize: 12,
        color: "#747474",
    },
    discountValue: {
        fontSize: 12,
        color: "#747474",
        paddingLeft: 5
    }
});