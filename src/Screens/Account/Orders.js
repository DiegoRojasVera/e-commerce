import { ScrollView, Text, StyleSheet, ActivityIndicator, View } from 'react-native'
import React, { useState, useCallback } from 'react'
import { useFocusEffect } from '@react-navigation/native';
import { size } from 'lodash';
import StatusBar from "../../components/StatusBar";
import Search from '../../components/Search/Search';
import ListOrder from '../../components/Order/ListOrder';
import useAuth from '../../hooks/useAuth';
import { getOrdersAPI } from '../../api/order';
import colors from '../../../styles/colors';

export default function Orders(props) {
    const [orders, setOrders] = useState(null);
    const { auth } = useAuth();
    const { item, setReloadFavorite } = props;


    useFocusEffect(
        useCallback(() => {
            (async () => {
                const response = await getOrdersAPI(auth);
                setOrders(response)

            })();
        }, [])

    );

    return (
        <>
            <StatusBar />
            <ScrollView style={styles.container}>
                <Text style={styles.title}>Mis Pedidos</Text>
                {!orders ? (
                    <ActivityIndicator size="large" color="black" style={styles.loading} />
                ) : size(orders) === 0 ? (
                    <Text style={styles.noOrdertext}>No tienes pedidos</Text>
                ) : (
                    <ListOrder orders={orders} />
                )}


            </ScrollView>
        </>
    )
}
const styles = StyleSheet.create({
    container: {
        padding: 20,
    },
    title: {
        fontSize: 20,
    },
    loading: {
        marginTop: 20,
    },
    noOrdertext: {
        textAlign: 'center',
        paddingTop: 20,
        fontSize: 18
    },
  
})