import React, { useCallback, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { TextInput, Button } from "react-native-paper";
import { useFocusEffect, useNavigation } from "@react-navigation/native"
import { useFormik } from "formik";
import * as Yup from "yup";
import Toast from "react-native-root-toast"
import { getMeApi, updateUserApi } from "../../api/user";
import useAuth from '../../hooks/useAuth';
import { formStyles } from "../../../styles"


export default function ChangeName() {
    const [loading, setLoading] = useState(false)
    const { auth } = useAuth();
    const navigation = useNavigation();


    const Formik = useFormik({
        initialValues: initialValues(),
        validationSchema: Yup.object(validationSchema()),
        onSubmit: async (formData) => {
            setLoading(true);
            try {
                const response = await updateUserApi(auth, formData)
                if (response.statusCode) throw "Error al cambiar la contraseña"
             navigation.goBack();
                
            } catch (error) {
                Toast.show(error, {
                    position: Toast.positions.CENTER
                })

            }

            setLoading(false);
        }
    });

    return (
        <View style={sytles.container}>
            <TextInput
                label="Nuevo Contraseña"
                style={formStyles.input}
                onChangeText={(text) => Formik.setFieldValue("password", text)}
                value={Formik.values.password}
                error={Formik.errors.password}
                secureTextEntry
            />
            <TextInput
                label="Repita Contraseña"
                style={formStyles.input}
                onChangeText={(text) => Formik.setFieldValue("repeatPassword", text)}
                value={Formik.values.repeatPassword}
                error={Formik.errors.repeatPassword}
                secureTextEntry
            />
            <Button
                mode="contained"
                style={formStyles.btnSucces}
                onPress={Formik.handleSubmit}
                loading={loading}
            >
                Cambiar Contraseña
            </Button>
        </View >
    )
}

function initialValues() {
    return {
        password: "",
        repeatPassword: "",
    }
}

function validationSchema() {
    return {
        password: Yup.string().min(4, true).required(true),
        repeatPassword: Yup.string()
            .min(4, true)
            .required(true)
            .oneOf([Yup.ref("password")]),
    }
}

const sytles = StyleSheet.create({
    container: {
        padding: 20
    }
})