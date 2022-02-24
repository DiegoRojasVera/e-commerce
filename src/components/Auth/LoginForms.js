import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { loginApi } from '../../api/user';
import Toast from "react-native-root-toast";
import { formStyles } from '../../../styles'
import useAuth from '../../hooks/useAuth';

export default function LoginForms(props) {
    const { changeForm } = props;
    const [loading, setloading] = useState(false);
    const { login } = useAuth();
    


    const formik = useFormik({
        initialValues: initialValues(),
        validationSchema: Yup.object(validationSchema()),
        onSubmit: async (formData) => {
            setloading(true);

            try {
                const response = await loginApi(formData);
                if (response.statusCode) throw "Error en el usuario o contraseña";
                console.log(response);
                login(response);

            } catch {
                Toast.show("Error en el usuario o contraseña", {
                    position: Toast.positions.CENTER,
                    duration: Toast.durations.LONG,
                    shadow: true,
                    hideOnPress: true,
                    delay: 0,
                });

            }
            setloading(false);
        },
    });

    return (
        <View>
            <TextInput
                label="Email o Username"
                style={formStyles.input}
                onChangeText={(text) => formik.setFieldValue("identifier", text)}
                value={formik.values.identifier}
                error={formik.errors.identifier}
            />
            <TextInput
                label="Contraseña"
                style={formStyles.input}
                onChangeText={(text) => formik.setFieldValue("password", text)}
                value={formik.values.password}
                error={formik.errors.password}
                secureTextEntry
            />
            <Button
                mode="contained"
                style={formStyles.btnSucces}
                onPress={formik.handleSubmit}
                loading={loading}

            >
                Enter
            </Button>
            <Button
                mode="text"
                style={formStyles.btnText}
                labelStyle={formStyles.btnTextLabel}
                onPress={changeForm}
            >Registrarse</Button>


        </View>
    )
}

function initialValues() {
    return {
        identifier: "",
        password: ""

    }
}

function validationSchema() {
    return {
        identifier: Yup.string().required(true),
        password: Yup.string().required(true),
    }
}