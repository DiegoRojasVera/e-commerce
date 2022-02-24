import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { map } from 'lodash';
import ScreenLoading from '../Search/ScreenLoading';
import Product from '../../components/Cart/Product';
import { getProductApi } from '../../api/product';


export default function ProductsList(props) {
    const { cart, products, setProducts, setRealoadCart, setTotalPayment } = props;

    function calcPrice(price, discount) {
        if (!discount) return price;

        const discountAmount = (price * discount) / 100;
        return (price - discountAmount).toFixed(0);
    }



    useEffect(() => {
        setProducts(null);

        (async () => {
            const productTemp = [];
            let totalPaymentTemp = 0;

            for await (const product of cart) {
                const response = await getProductApi(product.idProduct);
                response.quantity = product.quantity;
                productTemp.push(response);

                const priceProduct = calcPrice(response.price, response.discount);

                totalPaymentTemp += priceProduct * response.quantity;
            }


            setProducts(productTemp);
            // console.log(totalPaymentTemp);
            setTotalPayment(totalPaymentTemp);
        })();
    }, [cart]);


    return (
        <View>
            <Text style={styles.title}>Productos:</Text>
            {!products ? (
                <ScreenLoading text="Cargando carrito" />
            ) : (
                map(products, (product) => (
                    <Product
                        key={product._id}
                        product={product}
                        setRealoadCart={setRealoadCart}
                    />
                ))
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    title: {
        fontSize: 18,
        fontWeight: "bold",
    },
})