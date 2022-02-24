import React, { useState, useEffect } from 'react'
import { StyleSheet, View } from 'react-native';
import { Button } from 'react-native-paper';
import { size } from "lodash";
import useAuth from "../../hooks/useAuth"
import { isFavoriteApi, addFavoriteApi, deleteFavoriteApi } from '../../api/favorite';

// es el boton que se carga en el detalle del producto

export default function Favorite(props) {
    const { product } = props;
    const [isFavorite, setIsFavorite] = useState(undefined);
    const [loading, setLoading] = useState(false);
    const { auth } = useAuth();


    useEffect(() => {
        (async () => {
            const response = await isFavoriteApi(auth, product._id);
            if (size(response) === 0) setIsFavorite(false)
            else setIsFavorite(true);
        })()
    }, [product])

    const addFavorite = async () => {
        if (!loading) {
            setLoading(true);
            try {
                await addFavoriteApi(auth, product._id);
                setIsFavorite(true);
            } catch (error) {
                console.log(error);
            }
            setLoading(false)
        };

        // console.log("Producto añadido a la lista de favoritos");
        // console.log(product.title);
        // console.log(product._id);
    };

    const deleteFavorite = async () => {
        if (!loading) {
            setLoading(true);
            try {
                await deleteFavoriteApi(auth, product._id)
                setIsFavorite(false)
            } catch (error) {
                console.log(error)
            }
            setLoading(false);
        }
    }

    if (isFavorite === undefined) return null;


    return (
        <View style={{ zIndex: 1 }}>
            <Button
                mode="contained"
                contentStyle={
                    isFavorite
                        ? styles.btnAddDeleteContent :
                        styles.btnAddFavoritesContent
                }
                labelStyle={styles.btnLabel}
                style={styles.btn}
                onPress={isFavorite ? deleteFavorite : addFavorite}
                loading={loading}
            >

                {isFavorite ? "Eliminar de Favoritos" : "Añadir a favoritos"}
            </Button>
        </View>
    );
};

const styles = StyleSheet.create({
    btnAddFavoritesContent: {
        backgroundColor: "#057b00",
        paddingVertical: 5,

    },
    btnLabel: {
        fontSize: 18
    },
    btn: {
        marginTop: 20,
    },
    btnAddDeleteContent: {
        backgroundColor: "#c40000",
        paddingVertical: 5,

    },
})