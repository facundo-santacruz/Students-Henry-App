import React, { useState } from 'react'
import { Formik } from 'formik';
import { View, SafeAreaView, TouchableOpacity, TextInput } from 'react-native';
import { Avatar } from 'react-native-paper';
import { Text } from 'react-native-paper';
import { styles } from '../styles/ProfileEditStyles';
import { EDIT_USER, GET_USER } from '../apollo/user';
import { useMutation } from '@apollo/client';
import Particles from './Particles';
import { getUser } from './Profile';
import MenuDesplegable from './MenuDesplegable'
import { ScrollView } from 'react-native-gesture-handler';

const ProfileEdit = ({ route, navigation }) => {

    const [data, setData] = useState(route.params.data);
    const [editProfile] = useMutation(EDIT_USER);
    console.log(data)
    const handleSubmit = async (values) => {
        console.log(data._id);
        console.log(values)
        try {
            const response = await editProfile({
                variables: {
                    _id: data._id,
                    username: values.username,
                    lastName: values.lastName,
                    firstName: values.firstName,
                    email: values.email,
                    cohorte: parseInt(values.cohorte),
                    nationality: values.nationality,
                    phone: values.phone,
                }, 
                refetchQueries: [{query: GET_USER, variables: {email: values.email}}]
            }) 
            
            console.log(response.data)
            setData(response.data.editUser);
            // console.log(getUser(values.email));
            navigation.navigate('Profile', { email: values.email });
        } catch (error) {
            console.log(error);    
        }
    }

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView>

                <View style={{width: 50, position: 'absolute', zIndex: 5}}>
                    <MenuDesplegable navigation={navigation} />
                </View>
                <View style={styles.userInfoSection}>
                    <Formik
                        initialValues={{
                            nationality: data.nationality || '',
                            firstName: data.firstName,
                            lastName: data.lastName,
                            username: data.username,
                            email: data.email,
                            nationality: data.nationality || '',
                            phone: data.phone || '',
                            cohorte: data.cohorte || '',
                            nroTelefono: data.phone || '',
                            image: data.image
                        }}
                        onSubmit={values => handleSubmit(values)}
                    >
                        {({ handleChange, handleBlur, handleSubmit, values }) => (
                            <View style={styles.form}>
                                <View style={{ display: "flex", justifyContent: "center", marginBottom:20}}>
                                    <Avatar.Image
                                        size={200}
                                        source={{uri: values.image}}
                                    />
                                    <TouchableOpacity style={styles.boton} onPress={() => navigation.navigate('PhotoProfile', {data: data} )}>
                                            <Text style={{ color: 'black', fontWeight: 'bold' }}>Cambiar Imagen</Text>
                                    </TouchableOpacity>
                                </View>
                                <Text style={styles.textLabel}>Pais</Text>
                                <TextInput
                                    style={styles.textInput}
                                    placeholder="Argentina"
                                    onChangeText={handleChange('nationality')}
                                    onBlur={handleBlur('nationality')}
                                    value={values.nationality}
                                />
                                <Text style={styles.textLabel}>Nombre</Text>
                                <TextInput
                                    style={styles.textInput}
                                    placeholder="Nombre"
                                    onChangeText={handleChange('firstName')}
                                    onBlur={handleBlur('firstName')}
                                    value={values.firstName}
                                />
                                <Text style={styles.textLabel}>Apellido</Text>
                                <TextInput
                                    style={styles.textInput}
                                    placeholder="Apellido"
                                    onChangeText={handleChange('lastName')}
                                    onBlur={handleBlur('lastName')}
                                    value={values.lastName}
                                />
                                <Text style={styles.textLabel}>Usuario</Text>
                                <TextInput
                                    style={styles.textInput}
                                    placeholder="Nombre de Usuario"
                                    onChangeText={handleChange('username')}
                                    onBlur={handleBlur('username')}
                                    value={values.username}
                                />
                                <Text style={styles.textLabel}>Email</Text>
                                <TextInput
                                    style={styles.textInput}
                                    placeholder="Email"
                                    onChangeText={handleChange('email')}
                                    onBlur={handleBlur('email')}
                                    value={values.email}
                                />
                                {/* <Text style={styles.textLabel}>Cohorte</Text>
                                <TextInput
                                    style={styles.textInput}
                                    placeholder="Cohorte"
                                    onChangeText={handleChange('cohorte')}
                                    onBlur={handleBlur('cohorte')}
                                    value={values.cohorte}
                                /> */}
                                <Text style={styles.textLabel}>Telefono</Text>
                                <TextInput
                                    style={styles.textInput}
                                    placeholder="Telefono - Opcional"
                                    onChangeText={handleChange('phone')}
                                    onBlur={handleBlur('phone')}
                                    value={values.phone}
                                />
                                <View style={styles.containerBoton}>
                                    <TouchableOpacity style={styles.boton} onPress={handleSubmit}>
                                        <Text style={{ color: 'black', fontWeight: 'bold' }}>Guardar</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        )}
                    </Formik>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default ProfileEdit;