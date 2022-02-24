import AsyncStorage from '@react-native-async-storage/async-storage';
import { size, map, filter } from 'lodash';
import { API_URL, CART } from '../Utils/constants';

export async function getProductCartApi() {
    //para borar los datos del carro
    // await AsyncStorage.removeItem(CART);

    try {
        const cart = await AsyncStorage.getItem(CART);
        if (!cart) return [];
        return JSON.parse(cart);
    } catch (error) {
        return null;
    }
}

export async function addProductCartApi(idProduct, quantity) {
    try {
        const cart = await getProductCartApi();
        if (!cart) throw 'Error al obtener el carrito';

        if (size(cart) === 0) {
            cart.push({
                idProduct,
                quantity,
            });
        } else {
            let found = false;

            map(cart, product => {
                if (product.idProduct === idProduct) {
                    product.quantity += quantity;
                    found = true;

                    return product;
                }
            });
            if (!found) {
                cart.push({
                    idProduct,
                    quantity,
                });
            }
        }

        await AsyncStorage.setItem(CART, JSON.stringify(cart));
        return true;
    } catch (error) {
        return false;
    }
}

export async function deleteProductCartApi(idProduct) {
    try {
        const cart = await getProductCartApi();
        const newCart = filter(cart, (product) => {
            return product.idProduct !== idProduct
        })
        await AsyncStorage.setItem(CART, JSON.stringify(newCart));
        return true;
    } catch (error) {
        return null;
    }
}

export async function increaseProductCartApi(idProduct) {
    try {
        const cart = await getProductCartApi();
        map(cart, (product) => {
            if (product.idProduct === idProduct) {
                return (product.quantity += 1);
            }
        })

        await AsyncStorage.setItem(CART, JSON.stringify(cart))
        return true;
    } catch (error) {
        return null;
    }
}

export async function decreaseProductCartApi(idProduct) {
    let idDelete = false;

    try {
        const cart = await getProductCartApi();
        map(cart, (product) => {
            if (product.idProduct === idProduct) {
                if (product.quantity === 1) {
                    idDelete = true;
                    return null;
                } else {
                    return (product.quantity -= 1);
                }
            }
        });
        if (idDelete) {
            await deleteProductCartApi(idProduct);
        } else {
            await AsyncStorage.setItem(CART, JSON.stringify(cart));
        }
        return true;
    } catch (error) {
        return null;
    }
}

export async function paymentCartApi(auth, tokenStripe, products, address) {
    try {
        const addressShipping = address;
        delete addressShipping.user;
        delete addressShipping.createdAt;

        const url = `${API_URL}/orders`;
        const params = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${auth.token}`,
            },
            body: JSON.stringify({
                tokenStripe,
                products,
                idUser: auth.idUser,
                addressShipping,
            }),
        };
        const response = await fetch(url, params);
        const result = await response.json();
        return result;
    } catch (error) {
        console.log(error);
        return null;
    }
}

export async function deleteCartApi() {
    try {
        await AsyncStorage.removeItem(CART);
        return true;
    } catch (error) {
        return null;
    }
}