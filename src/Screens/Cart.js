import React, { useState, useCallback, useEffect } from 'react'
import { StyleSheet, ScrollView, View, Text } from 'react-native';
import { useFocusEffect } from '@react-navigation/native'
import { size } from 'lodash';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import StatusBar from "../components/StatusBar";
import Search from '../components/Search'
import NotProducts from '../components/Cart/NotProducts';
import ProductsList from '../components/Cart/ProductsList';
import AddressList from '../components/Cart/AddressList';
import Payment from '../components/Cart/Payment';
import useAuth from '../hooks/useAuth'
import ScreenLoading from "../../src/components/Search/ScreenLoading";
import { getProductCartApi } from '../api/cart';
import { getAddressesApi } from '../api/address'
import colors from "../../styles/colors";;

export default function Carritos() {
  const [cart, setCart] = useState(null);
  const [products, setProducts] = useState(null);
  const [realoadCart, setRealoadCart] = useState(false);
  const [addresses, setAddresses] = useState(null);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const { auth } = useAuth();
  const [totalPayment, setTotalPayment] = useState(null);


  useFocusEffect(
    useCallback(() => {
      setCart(null);
      setAddresses(null);
      setSelectedAddress(null);
      loadCart();
      loadAddresses();
    }, [],
    )
  );

  useEffect(() => {
    realoadCart && loadCart()
    setRealoadCart(false);
  }, [realoadCart]);


  const loadCart = async () => {
    const response = await getProductCartApi();
    setCart(response);
    // console.log(response)
  };

  const loadAddresses = async () => {
    const response = await getAddressesApi(auth);
    setAddresses(response);

  };

  return (
    <>
      <StatusBar backgroundColor={colors.bgDark} barStyle="light-content" />
      {!cart || size(cart) === 0 ? (
        <>
          <Search />
          <View>
            <NotProducts  />
          </View>
        </>
      ) : (
        <KeyboardAwareScrollView extraScrollHeight={25}>
          <ScrollView style={styles.cartContainer}>
            <ProductsList
              cart={cart}
              products={products}
              setProducts={setProducts}
              setRealoadCart={setRealoadCart}
              setTotalPayment={setTotalPayment}
            />
            {!addresses ? (
              <ScreenLoading text="Cargando Lista" />

            ) : size(addresses) === 0 ? (
              <View>
                <Text style={styles.containerTitle}>Dirección de envio:</Text>
                <Text>Aun no tienes una dirección cargada...</Text>
                <Text>Debes ir a "Mi Cuenta" para agregar los datos.</Text>
              </View>
            ) : (
              <AddressList
                addresses={addresses}
                selectedAddress={selectedAddress}
                setSelectedAddress={setSelectedAddress}
              />
            )}

            <Payment
              totalPayment={totalPayment}
              products={products}
              selectedAddress={selectedAddress}
            />
          </ScrollView>
        </KeyboardAwareScrollView>
      )
      }
    </>
  );
}

const styles = StyleSheet.create({
  cartContainer: {
    padding: 10,
  },
  containerTitle: {
    paddingBottom: 10,
    fontSize: 18,
    fontWeight: "bold",
},

})