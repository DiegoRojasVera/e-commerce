import React, { useState, useCallback, useEffect } from 'react'
import { StyleSheet, View, Text } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { size } from 'lodash'
import StatusBar from "../components/StatusBar";
import Search from "../components/Search";
import ScreenLoading from "../../src/components/Search/ScreenLoading";
import FavoriteList from '../components/Favorites/FavoriteList';
import useAuth from "../hooks/useAuth"
import { getFavoriteApi } from '../api/favorite';
import colors from "../../styles/colors"

export default function Favorites() {
    const [products, setProducts] = useState(null);
    const [reloadFavorite, setReloadFavorite] = useState(false)
    const { auth } = useAuth();

    useFocusEffect(
        useCallback(() => {
            setProducts(null);

            (async () => {
                const response = await getFavoriteApi(auth);
                setProducts(response);
            })();

            setReloadFavorite(false);
        }, [reloadFavorite])
    );

    return (
        <>
            <View style={{position: 'relative', zIndex:1}}>
                <StatusBar backgroundColor={colors.bgDark} bartStyle="light-content" />
                <Search />
                {!products ? (
                    <ScreenLoading text="Cargando Lista" />

                ) : size(products) === 0 ? (
                    <View style={styles.container}>
                        <Text style={styles.title} >Lista de Favoritos</Text>
                        <Text>No tienes productos en tu Lista</Text>
                        <Text>{products.titlet}</Text>
                    </View>
                ) : (
                    <FavoriteList products={products} setReloadFavorite={setReloadFavorite} />
                )}
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingVertical: 20,
        paddingHorizontal: 10,
        zIndex: 1

    },
    title: {
        fontWeight: "bold",
        fontSize: 20

    }
})

