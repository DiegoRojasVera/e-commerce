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

    useFocusEffect(
        useCallback(() => {
            (async () => {
                const response = await getMeApi(auth.token);
                if (response.name && response.lastname) {
                    await Formik.setFieldValue("name", response.name);
                    await Formik.setFieldValue("lastname", response.lastname)
                    console.log(response.name);
                }
                // saca los datos del usuario para las modificaciones

            })()
        }, [])
    )

    const Formik = useFormik({
        initialValues: initialValues(),
        validationSchema: Yup.object(validationSchema()),
        onSubmit: async (formData) => {
            setLoading(true);
            try {
                await updateUserApi(auth, formData);
                console.log("Ok modificado");
                navigation.goBack();
                Toast.show("Datos Actualizados."), {
                    position: Toast.positions.CENTER,
                }
            } catch (error) {
                Toast.show("Error al actualizar los datos."), {
                    position: Toast.positions.CENTER,
                }
                console.log("Error...")
                setLoading(false);
            }

        }
    });

    return (
        <View style={sytles.container}>
            <TextInput
                label="Nombre"
                style={formStyles.input}
                onChangeText={(text) => Formik.setFieldValue("name", text)}
                value={Formik.values.name}
                error={Formik.errors.name}
            />
            <TextInput
                label="Apellidos"
                style={formStyles.input}
                onChangeText={(text) => Formik.setFieldValue("lastname", text)}
                value={Formik.values.lastname}
                error={Formik.errors.lastname}
            />
            <Button
                mode="contained"
                style={formStyles.btnSucces}
                onPress={Formik.handleSubmit}
                loading={loading}
            >
                Cambiar nombres y apellidos
            </Button>
        </View >
    )
}

function initialValues() {
    return {
        name: "",
        lastname: "",
    }
}

function validationSchema() {
    return {
        name: Yup.string().required(true),
        lastname: Yup.string().required(true)
    }
}

const sytles = StyleSheet.create({
    container: {
        padding: 20
    }
})

