import React from 'react';
import { StyleSheet, View, Text, Image, TouchableWithoutFeedback } from 'react-native';
import { useNavigation } from "@react-navigation/native";
import { map } from "lodash";
import { API_URL } from "../../Utils/constants";

export default function ListPRoduct(props) {
    const { products } = props;
    const navigation = useNavigation();
    const goToProduct = (id) => {
        navigation.push("product", { idProduct: id })
    }
    return (
        <View style={styles.container}>
            {map(products, (product) => (
                <TouchableWithoutFeedback
                    key={product._id}
                    onPress={() => goToProduct(product._id)}
                >
                    <View style={styles.containerProduct}>
                        <View style={styles.product}>
                            <Image
                                style={styles.image}
                                source={{
                                    uri: `${product.main_image.url}`,
                                }
                            }
                            />
                            <Text
                                style={styles.name}
                                numberOfLines={1}
                                ellipsizeMode="tail"
                            >
                                {product.title}
                            </Text>
                        </View>
                    </View>
                </TouchableWithoutFeedback>
            ))}
        </View>
    );
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "row",
        flexWrap: "wrap",
        alignItems: "flex-start",
        margin: -3,
    },
    containerProduct: {
        width: "50%",
        padding: 3,

    },
    product: {
        backgroundColor: "#f0f0f0",
        padding: 10,

    },
    image: {
        height: 150,
        resizeMode: "contain"
    },
    name: {
        marginTop: 15,
        fontSize: 15,

    },
});