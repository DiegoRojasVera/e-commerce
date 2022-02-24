import React, { useState, useCallback } from 'react';
import { View, StyleSheet } from 'react-native';
import { TextInput, Button } from "react-native-paper";
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Toast from 'react-native-root-toast';
import useAuth from '../../hooks/useAuth';
import { getMeApi, updateUserApi } from '../../api/user';
import { formStyles } from '../../../styles'


export default function ChangeUsername() {
    const { auth } = useAuth();
    const [loading, setLoading] = useState(false);
    const navigation = useNavigation()

    useFocusEffect(
        useCallback(() => {
            (async () => {
                const response = await getMeApi(auth.token);
                await formik.setFieldValue("username", response.username)
            })()
            console.log("Hola")
        },
            [],
        )
    );

    const formik = useFormik({
        initialValues: initialValues(),
        validationSchema: Yup.object(validationSchema()),
        onSubmit: async (formData) => {
            setLoading(true)

            try {
                const response = await updateUserApi(auth, formData);
                if (response.statusCode) throw "El nombre del usuario ya existe";
                navigation.goBack()

            } catch (error) {
                Toast.show(error, {
                    position: Toast.positions.CENTER
                })
                formik.setFieldError("username", true);
            }

            setLoading(false)

        }
    })

    return (
        <View style={styles.content}>
            <TextInput
                label="Nombre de usuario"
                style={formStyles.input}
                onChangeText={(text) => formik.setFieldValue("username", text)}
                value={formik.values.username}
                error={formik.errors.username}
            />
            <Button
                mode="contained"
                style={formStyles.btnSucces}
                onPress={formik.handleSubmit}
                loading={loading}

            >
                Cambiar nombre del usuario
            </Button>
        </View>
    )
}

function initialValues() {
    return {
        username: "",
    };
}

function validationSchema() {
    return {
        username: Yup.string().min(4).required(true)
    }
}

const styles = StyleSheet.create({
    content: {
        padding: 20
    }
})