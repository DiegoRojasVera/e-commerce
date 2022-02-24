import { View, Text, StyleSheet } from 'react-native';
import React from 'react';
import { map } from 'lodash';
import Order from './Order';

export default function ListOrder(props) {
    const { orders } = props;
    const { item, setReloadFavorite } = props;


    return (
        <View style={styles.container}>
            {map(orders, (order) => (
                <Order key={order._id} order={order} />
            ))}
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        marginTop: 20,
        marginBottom: 40
    },
    currentPrice: {
        fontSize: 22,
    },
    prices: {
        flexDirection: 'row',
        marginTop: 5,
        alignItems: 'flex-end',
    },
})
