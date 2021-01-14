import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, Button, Image, TouchableOpacity, TouchableNativeFeedback, TouchableWithoutFeedback } from 'react-native';
import { Formik } from 'formik';
import  * as yup from 'yup';
import { styles } from '../styles/styles';
import { FORGOT_PASSWORD_EMAIL } from '../apollo/user';
import { useMutation } from '@apollo/client';
import Particless from './Particles';

export default function ForgotPassword ({navigation}) {
    const [text, setText] = useState("");
    const [forgotPasswordMail] =useMutation(FORGOT_PASSWORD_EMAIL)
    
    const validations= yup.object().shape({
        email: yup.string()
            .email('Email inválido')
            .required('Campo obligatorio'),
    })

    const  handleSubmit = async (values) => {
        try {
            let response = await forgotPasswordMail({
                variables: {
                    email: values.email
                }
            });
            navigation.navigate("CompareCode", {
                email: values.email
            })
        } catch (error) {
            setText(error.message);
            console.log(text);
        }
    }

    return (
        <>
        <View style={styles.header}>
            <View style={{width: '100%', height: '99%', position: 'absolute'}}>
                <Particless />
            </View>
            
            
        </View>
        <View style={styles.body}>
            <Formik
                initialValues={{ email: '' }}
                onSubmit={ values =>  handleSubmit(values) }
                validationSchema={validations}
            >
            {({ handleChange, handleBlur, handleSubmit, values, errors, touched, isValid, setFieldTouched }) => (
                <View style={styles.form}>
                    <Text style={styles.h1}>RECUPERAR CONTRASEÑA</Text>
                    <Text style={styles.h2}>Ingrese su email</Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={handleChange('email')}
                        onBlur={handleBlur('email')}
                        value={values.email}
                    />
                    {touched.email && errors.email &&
                    <Text style={styles.error}>{errors.email}</Text>
                    }  
                    
                    {!text ? null :
                    <Text style={styles.error}>{text}</Text>}                  

                
                    <TouchableOpacity style={styles.boton} onPress={handleSubmit}>
                        <Text style={styles.linkForm} >Confirmar</Text>
                    </TouchableOpacity>
                    
                    <TouchableOpacity style={styles.boton} onPress={() => navigation.navigate('PruebaBoton')}>
                        <Text style={styles.linkForm}>Volver</Text>
                    </TouchableOpacity>    
                </View>
                )}
            </Formik>
        </View>
        </>
    )
}