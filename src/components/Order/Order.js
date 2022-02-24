import { View, Text, StyleSheet, Image } from 'react-native';
import React from 'react';
import { API_URL } from '../../Utils/constants';

export default function Order(props) {
    const { order } = props;
    const { item, setReloadFavorite } = props;

    const calcPrice = (price, discount) => {
        if (!discount) return price;

        const discountAmount = (price * discount) / 100;
        return (price - discountAmount).toFixed(2);

    };

    return (
        <View style={styles.container}>
            <View style={styles.containerImage}>
                <Image
                    style={styles.image}
                    source={{ uri: `${API_URL}${order.product.main_image.url}` }} />
            </View>
            <View style={styles.info}>
                <Text
                    style={styles.name}
                    numberOfLines={2}
                    ellipsizeMode='tail'
                >
                    {order.product.title}
                </Text>
                {/* <Text>Usuario: {order.user.username}</Text> */}
                <Text>Cantidad: {order.quantity}</Text>
                <Text>
                    Total pagado: $
                    <Text>
                        {calcPrice(order.product.price, order.product.discount)}
                    </Text>
                    {order.product.discount && (
                        <Text>
                        <Text style={styles.oldPrice}>  {order.product.price} $ </Text>
                        </Text>
                    )}
                </Text>
            </View>
        </View>

    )
}

const styles = StyleSheet.create({
    container: {
        borderBottomWidth: 1,
        borderColor: "#ddd",
        marginHorizontal: -20,
        paddingVertical: 5,
        flexDirection: "row",
    },
    containerImage: {
        width: "30%",
        height: 120,
        padding: 10
    },
    image: {
        height: "100%",
        resizeMode: "contain",
    },
    info: {
        width: "70%",
        justifyContent: "center",
    },
    name: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 5
    },
    oldPrice: {
        marginLeft: 7,
        fontSize: 11,
        color: "#747474",
        textDecorationLine: "line-through",
        
    },
})