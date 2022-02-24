import React from 'react';
import { StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import AwesomeIcon from 'react-native-vector-icons/FontAwesome';
import colors from '../../styles/colors';
import AccountStack from './AccountStack';
import ProductStack from './ProductStack';
import FAVORITES from '../Screens/Favorites';
import Carritos from '../Screens/Cart';

const Tab = createMaterialBottomTabNavigator();

export default function AppNavigation() {

    return (
        <NavigationContainer>
            <Tab.Navigator
                barStyle={styles.navigation}
                screenOptions={({ route }) => ({
                    tabBarIcon: (routeStatus) => {
                        return setIcon(route, routeStatus);
                    }
                })}
            >
                <Tab.Screen
                    name="home"
                    component={ProductStack}
                    options={{
                        title: "Inicio",
                    }}
                />
                <Tab.Screen
                    name="favorites"
                    component={FAVORITES}
                    options={{
                        title: "Favoritos",
                    }}
                />
                <Tab.Screen
                    name="car"
                    component={Carritos}
                    options={{
                        title: "Carritos",
                    }}
                />
                <Tab.Screen
                    name="account"
                    component={AccountStack}
                    options={{
                        title: "Mi Cuenta",
                    }}
                />

            </Tab.Navigator>
        </NavigationContainer >)
}

function setIcon(route, routerStatus) {
    let iconName = "";
    switch (route.name) {
        case "home":
            iconName = "home";
            break;
        case "favorites":
            iconName = "heart";
            break;
        case "car":
            iconName = "shopping-cart";
            break;
        case "account":
            iconName = "bars";
            break;
        default:
            break;
    }
    return <AwesomeIcon name={iconName} style={styles.icon} />

    return null;
}

const styles = StyleSheet.create({
    navigation: {
        backgroundColor: colors.bgDark,
    },
    icon: {
        fontSize: 20,
        color: colors.fontLight,
    }
})