import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Account from '../Screens/Account/Account';
import ChangeName from '../Screens/Account/ChangeName';
import ChangeEmail from '../Screens/Account/ChangeEmail';
import ChangeUsername from '../Screens/Account/ChangeUsername';
import ChangePassword from '../Screens/Account/ChangePassword';
import Addresses from '../Screens/Account/Addresses';
import AddAddress from '../Screens/Account/AddAddress';
import Orders from '../Screens/Account/Orders'
import colors from '../../styles/colors';

const Stack = createStackNavigator();


export default function AccountStack() {
    return (

        <Stack.Navigator
            screenOptions={{
                headerTintColor: colors.fontLight,
                headerStyle: { backgroundColor: colors.bgDark },
                cardStyle: {
                    backgroundColor: colors.bgLight
                }
            }}
        >
            <Stack.Screen
                name="account"
                component={Account}
                options={{ title: "Cuenta", headerShown: false }}
            />
            <Stack.Screen
                name="change-name"
                component={ChangeName}
                options={{
                    title: "Cambiar nombre y apellido",
                }}
            />
            <Stack.Screen
                name="change-email"
                component={ChangeEmail}
                options={{
                    title: "Cambiar Email",
                }}
            />
            <Stack.Screen
                name="change-username"
                component={ChangeUsername}
                options={{
                    title: "Cambiar username",
                }}
            />
            <Stack.Screen
                name="change-password"
                component={ChangePassword}
                options={{
                    title: "Cambiar Contraseña",
                }}
            />
            <Stack.Screen
                name="addresses"
                component={Addresses}
                options={{
                    title: "Mis Direcciones",
                }}
            />
            <Stack.Screen
                name="add-address"
                component={AddAddress}
                options={{
                    title: "Nueva Dirección",
                }}
            />
            <Stack.Screen
                name="orders"
                component={Orders}
                options={{
                    title: "Mis Pedidos",
                }}
            />

        </Stack.Navigator>
    )
}
