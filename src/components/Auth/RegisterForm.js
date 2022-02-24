import React, { useState } from 'react'
import { View } from 'react-native'
import { TextInput, Button } from 'react-native-paper';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Toast from 'react-native-root-toast';
import { registerAPI } from '../../api/user';
import { formStyles } from '../../../styles';


export default function RegisterForm(props) {
    const { changeForm } = props;
    const [loading, setLoading] = useState(false);

    const formik = useFormik({
        initialValues: initialValues(),
        validationSchema: Yup.object(validationSchema()),
        onSubmit: async (formData) => {
            setLoading(true);
            try {
                await registerAPI(formData);
                changeForm();
                Toast.show("Usuario Registrado", {
                    position: Toast.positions.CENTER,
                });
                console.log("ok");
            } catch (error) {
                setLoading(false);
                console.log(error);
                Toast.show("Error al registrar el usuario", {
                    position: Toast.positions.CENTER,
                });
            };
        },
    });

    return (
        <View>
            <TextInput
                label="Email"
                style={formStyles.input}
                onChangeText={(text) => formik.setFieldValue("email", text)}
                value={formik.values.email}
                error={formik.errors.email}
            ></TextInput>
            <TextInput
                label="Nombre del Usuario"
                style={formStyles.input}
                onChangeText={(text) => formik.setFieldValue("username", text)}
                value={formik.values.username}
                error={formik.errors.username}
            ></TextInput>
            <TextInput
                label="Contraseña"
                style={formStyles.input}
                secureTextEntry
                onChangeText={(text) => formik.setFieldValue("password", text)}
                value={formik.values.password}
                error={formik.errors.password}
            ></TextInput>
            <TextInput
                label="Repetir Contraseña"
                style={formStyles.input}
                secureTextEntry
                onChangeText={(text) => formik.setFieldValue("repeatPassword", text)}
                value={formik.values.repeatPassword}
                error={formik.errors.repeatPassword}
            ></TextInput>

            <Button mode='contained'
                style={formStyles.btnSucces}
                onPress={formik.handleSubmit}
                loading={loading}
            >Registrarse</Button>

            <Button mode="text" style={formStyles.btnText}
                labelStyle={formStyles.btnTextLabel}
                onPress={changeForm}
            >Iniciar Sesión</Button>

        </View>
    )
}

function initialValues() {
    return {
        email: "",
        username: "",
        password: "",
        repeatPassword: ""
    }
}

function validationSchema() {
    return {
        email: Yup.string().email(true).required(true),
        username: Yup.string().required(true),
        password: Yup.string().required(true),
        repeatPassword: Yup.string().required(true).oneOf([Yup.ref("password"), true]),
    };
}