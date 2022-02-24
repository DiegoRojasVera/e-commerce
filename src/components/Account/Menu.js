import React from 'react';
import { Alert } from 'react-native';
import { List } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import useAuth from '../../hooks/useAuth';

export default function Menu() {
    const navigation = useNavigation();
    const { logout } = useAuth();


    const logoutAccount = () => {
        Alert.alert(
            "Cerrear sesión",
            "¿Estas seguro de quieres salir de tu cuenta?",
            [
                {
                    text: "NO"
                },
                {
                    text: "SI",
                    onPress: logout,
                },
            ],
            { cancelable: false }
        )
    }

    return (
        <>
            <List.Section>
                <List.Subheader>Mi Cuenta</List.Subheader>
                <List.Item
                    title="Cambiar Nombre"
                    description="Cambia el nombre de tu cuenta"
                    left={(props) => <List.Icon {...props} icon="face" />}
                    onPress={() => navigation.navigate("change-name")}
                />
                <List.Item
                    title="Cambiar email"
                    description="Cambiar el email de tu cuenta"
                    left={(props) => <List.Icon {...props} icon="at" />}
                    onPress={() => navigation.navigate("change-email")}
                />
                <List.Item
                    title="Cambiar username"
                    description="Cambiar el username de tu cuenta"
                    left={(props) => <List.Icon {...props} icon="sim" />}
                    onPress={() => navigation.navigate("change-username")}
                />
                <List.Item
                    title="Cambiar contraseña"
                    description="Cambiar la contraseña de tu cuenta"
                    left={(props) => <List.Icon {...props} icon="key" />}
                    onPress={() => navigation.navigate("change-password")}
                />
                <List.Item
                    title="Mis direcciones"
                    description="Administra tus direcciones de envio"
                    left={(props) => <List.Icon {...props} icon="map" />}
                    onPress={() => navigation.navigate("addresses") }
                />
            </List.Section>
            <List.Section>
                <List.Subheader>App</List.Subheader>
                <List.Item
                    title="Pedidos"
                    description="Listados de todos los pedidos"
                    left={(props) => <List.Icon {...props} icon="clipboard-list" />}
                    onPress={() => navigation.navigate("orders")}
                />
                <List.Item
                    title="Lista de Deseos"
                    description="Listados de todos los productos que te quieras comprar"
                    left={(props) => <List.Icon {...props} icon="heart" />}
                    onPress={() => navigation.navigate("favorites")}
                />
                <List.Item
                    title="Cerrar sesión"
                    description="Cierra esta sesión y inicia con otra"
                    left={(props) => <List.Icon {...props} icon="logout" />}
                    onPress={logoutAccount}
                />
            </List.Section>
        </>
    )
}