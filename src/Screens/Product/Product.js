import React, { useState, useEffect } from 'react'
import { StyleSheet, View, ScrollView, Text } from 'react-native'
import StatusBar from '../../components/StatusBar';
import Search from '../../components/Search/Search';
import ScreenLoading from "../../components/Search/ScreenLoading"
import CarouselImages from '../../components/Product/CarouselImages';
import Price from '../../components/Product/Price';
import Quantity from '../../components/Product/Quantity';
import Buy from '../../components/Product/Buy';
import Favorite from '../../components/Product/Favorite';
import { getProductApi } from '../../api/product';
import colors from '../../../styles/colors';

export default function Product(props) {
    const { route } = props;
    const { params } = route;
    const [product, setProduct] = useState(null);
    const [images, setImages] = useState([]);
    const [quantity, setQuantity] = useState(1);

    useEffect(() => {
        setProduct(null);
        (async () => {
            const response = await getProductApi(params.idProduct);
            setProduct(response)
            const arrayImages = [response.main_image]
            arrayImages.push(...response.images);
            setImages(arrayImages);
        })()
    }, [params]);

    return (
        <>
            <StatusBar backgroundColor={colors.bgDark} barstyle="light-content" />
            <Search />
            {!product ? (
                <ScreenLoading text="Cargando Producto" size="large" />
            ) : (
                <ScrollView style={styles.container}>
                    <Text style={styles.title}>{product.title}</Text>
                    <CarouselImages images={images} />
                    <View style={styles.containerView}>
                        <Price price={product.price} discount={product.discount} />
                        <Quantity quantity={quantity} setQuantity={setQuantity} />
                        <Buy product={product} quantity={quantity} />
                        <Favorite product={product} />
                    </View>
                </ScrollView>
            )}

        </>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingBottom: 50,
    },
    title: {
        fontWeight: "bold",
        fontSize: 20,
        marginBottom: 10,
        padding: 10,
    },
    containerView: {
        padding: 10,
    }
});