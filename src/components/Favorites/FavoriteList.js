import { StyleSheet, ScrollView, Text, View } from 'react-native';
import React from 'react';
import { map } from 'lodash';
import Products from './Products';


export default function FavoriteList(props) {
  const { products, setReloadFavorite } = props;
  return (

    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Lista de Favoritos</Text>
      {map(products, (item) => (
        <Products
          key={item._id}
          item={item}
          setReloadFavorite={setReloadFavorite}
          style={styles.productos}
        />
      ))}
    </ScrollView>

  );
}

const styles = StyleSheet.create({

  container: {

    position: "relative",
    paddingVertical: 20,
    paddingVertical: 60,

  },
  title: {
    fontWeight: "bold",
    fontSize: 19,
    marginBottom: 5,

  },


})
