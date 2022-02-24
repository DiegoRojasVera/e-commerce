import React, { useState } from 'react'
import { StyleSheet, View, Text, Image, KeyboardAvoidingView, Platform } from 'react-native'
import RegisterForm from '../components/Auth/RegisterForm';
import LoginForms from '../components/Auth/LoginForms';
import logo from "../../assets/logo.png";
import { layoutStyle } from "../../styles"


export default function Auth() {
    const [showLogin, setShowLogin] = useState(true);

    const changeForm = () => setShowLogin(!showLogin);

    return (
        <View style={layoutStyle.container}>
            <Image style={styles.logo} source={logo} />
            <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "null"}
                style={{ flex: 0 }}
            >
                {showLogin ? <LoginForms changeForm={changeForm} /> : <RegisterForm changeForm={changeForm} />}

            </KeyboardAvoidingView>

        </View>
    )
}

const styles = StyleSheet.create({
    logo: {
        width: "100%",
        height: 50,
        resizeMode: "contain",
        marginBottom: 20,
    },

});